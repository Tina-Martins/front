<template>
  <div
    class="bg-[var(--color-primary-95)] h-8 rounded-lg label-medium text-[var(--color-primary-30)] flex items-center justify-center px-3"
  >
    <p>{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>

<style scoped></style>
