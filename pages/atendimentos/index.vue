<template>
  <div class="pl-24 pr-18">
    <LayoutHeader :buttons="headerButtons" @button-click="handleButtonClick" />
    <div class="p-4">
      <p>Página de Atendimentos</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Configuração dos botões do header para esta página
const headerButtons = [
  { id: 'edit', label: 'Editar cadastro', outline: true },
  { id: 'create', label: 'Criar cadastro', outline: false },
];

// Manipular os clicks dos botões
const handleButtonClick = (buttonId: string | number) => {
  console.log('Botão clicado:', buttonId);

  switch (buttonId) {
    case 'edit':
      // Lógica para editar cadastro
      console.log('Editando cadastro...');
      break;
    case 'create':
      // Lógica para criar cadastro
      console.log('Criando cadastro...');
      break;
    default:
      console.log('Ação não definida para:', buttonId);
  }
};
</script>

<style></style>
