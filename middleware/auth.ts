export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  console.log('authStore', authStore)
  
  // If not authenticated and trying to access a protected route
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
  
  // If authenticated and trying to access login page
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})
