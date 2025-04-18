export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // TODO: Implement your database insert here
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