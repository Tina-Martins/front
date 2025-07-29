<template>
  <div class="bg-[var(--color-neutral-99)] min-h-screen">
    <LayoutNavbar />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

if (!authStore.isAuthenticated) {
  navigateTo('/login');
}

definePageMeta({
  middleware: 'auth',
});
</script>
