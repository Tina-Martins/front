<template>
  <header class="bg-[var(--color-neutral-99)] h-[140px] w-full">
    <div class="flex flex-col justify-end h-full">
      <UBreadcrumb :items="breadcrumbItems" class="custom-breadcrumb h-9" />
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <h1 class="headline-large text-[var(--color-neutral-10)]">{{ pageTitle }}</h1>

          <div v-if="pageBadges.length > 0" class="flex gap-2">
            <UiBadge v-for="badge in pageBadges" :key="badge" :label="badge" />
          </div>
        </div>
        <div v-if="props.buttons.length > 0" class="flex gap-2">
          <UiButton
            v-for="(button, index) in props.buttons"
            :key="index"
            :label="button.label"
            :outline="button.outline"
            @click="$emit('buttonClick', button.id || index)"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

interface HeaderButton {
  label: string;
  outline?: boolean;
  id?: string;
}

interface Props {
  buttons?: HeaderButton[];
}

const props = withDefaults(defineProps<Props>(), {
  buttons: () => [],
});

defineEmits<{
  buttonClick: [buttonId: string | number];
}>();

const route = useRoute();

// Mapeamento de rotas para labels, ícones, títulos e badges de página
const routeConfig: Record<
  string,
  { label: string; icon?: string; title?: string; badges?: string[] }
> = {
  '/': { label: 'Início', icon: 'i-lucide-house', title: 'Dashboard' },
  '/atendimentos': {
    label: 'Atendimentos',
    icon: 'i-lucide-users',
    title: 'Gestão de Atendimentos',
  },
  '/calendario': { label: 'Calendário', icon: 'i-lucide-calendar', title: 'Agenda e Eventos' },
};

// Função para gerar os itens do breadcrumb baseado na rota atual
const generateBreadcrumbItems = (currentPath: string): BreadcrumbItem[] => {
  const pathSegments = currentPath.split('/').filter(segment => segment !== '');
  const items: BreadcrumbItem[] = [];

  items.push({
    label: routeConfig['/']?.label || 'Início',
    icon: routeConfig['/']?.icon || 'i-lucide-house',
    to: '/',
  });

  if (pathSegments.length > 0) {
    let currentRoute = '';

    pathSegments.forEach((segment, index) => {
      currentRoute += `/${segment}`;
      const config = routeConfig[currentRoute];
      const isLast = index === pathSegments.length - 1;

      items.push({
        label: config?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
        icon: config?.icon,
        to: isLast ? undefined : currentRoute, // Remove o link do último item (página atual)
      });
    });
  }

  return items;
};

// Computed para os itens do breadcrumb que reage às mudanças de rota
const breadcrumbItems = computed(() => {
  return generateBreadcrumbItems(route.path);
});

// Computed para o título da página
const pageTitle = computed(() => {
  if (route.meta.title) {
    return route.meta.title as string;
  }

  const config = routeConfig[route.path];
  if (config?.title) {
    return config.title;
  }

  // Fallback: capitaliza o último segmento da rota
  const segments = route.path.split('/').filter(segment => segment !== '');
  const lastSegment = segments[segments.length - 1];
  const fallbackTitle = lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : 'Página';
  return fallbackTitle;
});

// Computed para os badges da página
const pageBadges = computed(() => {
  // Prioriza badges definidos em definePageMeta da página
  if (route.meta.badges && Array.isArray(route.meta.badges)) {
    return route.meta.badges as string[];
  }

  // Senão, usa os badges configurados para a rota
  const config = routeConfig[route.path];
  if (config?.badges && config.badges.length > 0) {
    return config.badges;
  }

  // Retorna array vazio se não há badges
  return [];
});
</script>

<style scoped>
.custom-breadcrumb :deep(ol),
.custom-breadcrumb :deep(li),
.custom-breadcrumb :deep(a),
.custom-breadcrumb :deep(span) {
  font-family: var(--font-inter);
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  font-weight: 500;
  color: var(--color-primary-40);
}

.custom-breadcrumb :deep(.i-lucide-arrow-right) {
  color: var(--color-primary-40);
}
</style>
