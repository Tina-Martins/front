<template>
  <div>
    <p>This usage default.layout</p>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">

import { definePageMeta } from '#imports';
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

if (!authStore.isAuthenticated) {
  navigateTo('/login')
}

definePageMeta({
  middleware: 'auth'
})

</script> 