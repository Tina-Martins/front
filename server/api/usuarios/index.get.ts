export default defineEventHandler(async () => {
  try {
    const response: object = await $fetch(`${process.env.NUXT_API_URL}/usuarios`)
    return {
      status: 200,
      ...response
    }
  } catch(_error) {
    return {
      status: 500,
      error: _error || 'Internal Server Error'
    }
  }
}) 
