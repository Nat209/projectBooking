<template>
    <GeneralLayout :showRegister="false" />
    <section class="favorites">
      <h2>Favorites</h2>
      <div class="favorites-grid">
        <div v-for="hotel in hotels" :key="hotel.id" class="hotel-card">
          <img :src="hotel.image" :alt="hotel.name" class="hotel-image">
          <div class="hotel-info">
            <h3 class="hotel-name">{{ hotel.name }}</h3>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import GeneralLayout from '@/components/layout/ProtectedLayout.vue';
  import { ref } from 'vue';
  
  // Datos de ejemplo para hoteles favoritos
  const hotels = ref([
    { id: 1, name: 'Hotel Sunset', image: '/src/assets/img/hotel1.jpg' },
    { id: 2, name: 'Mountain Retreat', image: '/src/assets/img/hotel2.jpeg' },
    { id: 3, name: 'Beachside Resort', image: '/src/assets/img/hotel4.jpeg' }
  ]);
  </script>
  
  <style scoped>
  .favorites {
    padding: 20px;
    background-color: #f9f9f9; /* Fondo ligeramente gris */
    text-align: center; /* Centra el título */
    margin-top: 40px; /* Espacio superior para desplazar la sección hacia abajo */
  }
  
  .favorites h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .favorites-grid {
    display: flex;
    justify-content: center; /* Centra las tarjetas horizontalmente */
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px; /* Ajusta según tu diseño */
    margin: 0 auto; /* Centra el contenedor */
  }
  
  .hotel-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 250px; /* Ajusta el ancho según tu diseño */
  }
  
  .hotel-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .hotel-info {
    padding: 10px;
  }
  
  .hotel-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  </style>
  