<template>
  <button :class="buttonClasses" @click="handleClick">
    <p>{{ label }}</p>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  outline?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emit('click');
};

const buttonClasses = computed(() => [
  'title-small flex items-center justify-center px-6 h-10 cursor-pointer transition-colors rounded-[100px]',
  props.outline
    ? 'bg-[var(--color-neutral-99)] text-[var(--color-primary-40)] border border-[var(--color-primary-40)] hover:bg-[var(--color-primary-95)]'
    : 'bg-[var(--color-primary-40)] text-[var(--color-neutral-99)] hover:bg-[var(--color-primary-60)]',
]);
</script>

<style scoped></style>
