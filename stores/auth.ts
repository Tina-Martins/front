import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),

  getters: {
    isAuthenticated: (state: { token: string | null }) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    clearToken() {
      this.token = null
    },
  },

  persist: true,
})
