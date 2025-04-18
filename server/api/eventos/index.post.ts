export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const novoUsuario = { nome: 'João', email: 'joao@email.com' }

    await $fetch(`${config.public.NUXT_API_URL}/usuarios`, {
      method: 'POST',
      body: novoUsuario
    })
    return {
      status: 201,
      data: body
    }
  } catch {
    return {
      status: 500,
      error: 'Internal Server Error'
    }
  }
}) 