export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    // TODO: Implement your database delete here
    return {
      status: 204,
      data: { id }
    }
  } catch {
    return {
      status: 500,
      error: 'Internal Server Error'
    }
  }
}) 