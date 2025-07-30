<template>
  <div class="pl-24 pr-18">
    <LayoutHeader :buttons="headerButtons" @button-click="handleButtonClick" />
    <div class="p-4">
      <p>Página de Calendário</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Configuração dos botões do header para esta página
const headerButtons = [
  { id: 'export', label: 'Exportar agenda', outline: true },
  { id: 'new-event', label: 'Novo evento', outline: false },
];

// Manipular os clicks dos botões
const handleButtonClick = (buttonId: string | number) => {
  console.log('Botão clicado:', buttonId);

  switch (buttonId) {
    case 'export':
      // Lógica para exportar agenda
      console.log('Exportando agenda...');
      break;
    case 'new-event':
      // Lógica para criar novo evento
      console.log('Criando novo evento...');
      break;
    default:
      console.log('Ação não definida para:', buttonId);
  }
};
</script>
