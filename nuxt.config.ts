export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    openai: {
      token: ''
    }
  },
  vue: {
    runtimeCompiler: true
  }
})
