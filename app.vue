<template>
  <main class="container">
    <h1>Malleable demo</h1>
    <form @submit.prevent="makeRequest">
      <textarea v-model="prompt"></textarea>
      <button type="submit" class="btn">Make a request</button>
    </form>
    <hr />
    <MalleableComponent />
  </main>
</template>

<script setup lang="ts">
import '@picocss/pico'

const malleables = reactive({
  query: `
    query {
  episodes(page: 1) {
    results {
      id
      name
      air_date
      created
      episode
      characters {
        name
        species
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
}
`,
  template: `
  <ul v-for="item in data.data.episodes?.results || []" :key="item.id">
    <li>{{ item.name }}</li>
  </ul>
  `
})

const prompt = ref('')
async function makeRequest() {
  const result = await $fetch('/api/completion', {
    method: 'POST',
    body: {
      prompt: prompt.value,
      malleables
    }
  })
  Object.assign(malleables, result)
}

const MalleableComponent = defineComponent({
  setup () {
    const query = toRef(malleables, 'query')
    const { data } = useFetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      body: { query }
    })

    return () => h({
      template: malleables.template,
      data: () => ({
        data: data.value
      })
    })
  },
})
</script>
