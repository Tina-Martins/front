<template>
  <nav class="bg-[var(--color-neutral-99)] mb-4 h-[72px] shadow-md pl-8 pr-10">
    <div class="flex items-center justify-between h-full">
      <!-- Logo + Navegação -->
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span class="font-semibold text-gray-600" style="font-size: 8px">LOGO</span>
          </div>
          <h1 class="text-3xl font-bold pl-2 text-[var(--color-primary-40)]">SIT</h1>
        </div>

        <nav class="flex items-center gap-1 ml-10">
          <NuxtLink to="/atendimentos" :class="getNavLinkClasses(isAtendimentosActive) + ' pr-2'">
            Base de dados
          </NuxtLink>
          <span class="border-l border-[var(--color-primary-80)] h-5" />
          <NuxtLink to="/calendario" :class="getNavLinkClasses(isCalendarioActive) + ' pl-2'">
            Calendário
          </NuxtLink>
        </nav>
      </div>

      <!-- Configurações -->
      <Icon name="mdi:cog-outline" size="24" class="text-[var(--color-primary-40)]" />
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();

const isAtendimentosActive = computed(() => route.path === '/atendimentos');
const isCalendarioActive = computed(() => route.path === '/calendario');

const getNavLinkClasses = (isActive: boolean) => {
  const baseClasses = 'hover:underline transition-colors duration-200';
  const weightClass = isActive ? 'font-semibold' : 'font-medium';
  const colorClass = isActive ? 'text-[var(--color-primary-40)]' : 'text-[var(--color-primary-70)]';
  return `${baseClasses} ${weightClass} ${colorClass}`;
};
</script>
