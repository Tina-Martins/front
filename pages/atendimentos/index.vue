<template>
  <div>
    <div class="headline-large bg-[var(--color-neutral-99)]">Atendimentos</div>
    <ul v-if="data">
      <li v-for="item in atendimentos ?? []" :key="item.id" :data-id="item.id">
        {{ item.titulo }}
        {{ item.atualizadoEm }}
        {{ item.local }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';
import type { ApiResponse } from '~/interfaces/api-response';

const { data } = await useFetch<ApiResponse>('/api/eventos')

const atendimentos = computed(() => data.value?.data ?? []);

definePageMeta({
  layout: 'default'
})
</script>

<style>

</style>

data.data