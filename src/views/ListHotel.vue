<script setup>
import GeneralLayout from '@/components/layout/GeneralLayout.vue'
import ProtectedLayout from '@/components/layout/ProtectedLayout.vue'
import ComponentHotelDestination from '@/components/hotel/ComponentSearcHotelDestination.vue'
import FooterComponent from '@/components/FooterComponent.vue';
import { ref } from 'vue';
// Verifica si el token existe en el localStorage
const token = ref(localStorage.getItem('token'));

// Condicional para layout
const isAuthenticated = ref(!!token.value); // Si el token existe, `isAuthenticated` será true
</script>

<template>
  <component :is="isAuthenticated ? ProtectedLayout : GeneralLayout">  </component>
  <ComponentHotelDestination />
  
  <FooterComponent/>
</template>
