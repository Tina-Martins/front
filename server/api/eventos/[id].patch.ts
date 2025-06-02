export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    // TODO: Implement your database update here
    return {
      status: 200,
      data: { id, ...body }
    }
  } catch {
    return {
      status: 500,
      error: 'Internal Server Error'
    }
  }
}) 