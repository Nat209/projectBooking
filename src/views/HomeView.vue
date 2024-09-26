<script setup>
import { ref } from 'vue';
import GeneralLayout from '@/components/layout/GeneralLayout.vue';
import ProtectedLayout from '@/components/layout/ProtectedLayout.vue';
import SearchComponnent from '@/components/SearchComponet.vue';
import CarruselComponent from '@/components/CarruselComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// Verifica si el token existe en el localStorage
const token = ref(localStorage.getItem('token'));

// Condicional para layout
const isAuthenticated = ref(!!token.value); // Si el token existe, `isAuthenticated` será true
</script>

<template>
  <!-- Verifica si el usuario está autenticado o no -->
  <component :is="isAuthenticated ? ProtectedLayout : GeneralLayout">  </component>
    <!-- Componentes comunes que se muestran en ambos layouts -->
    <SearchComponnent/>
    <CarruselComponent/>
    <FooterComponent/>

</template>
