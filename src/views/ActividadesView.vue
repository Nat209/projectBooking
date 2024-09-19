<template>
    <GeneralLayout :showRegister="false" />
    <section class="activities">
      <h2>Actividades</h2>
      <div class="activities-grid">
        <div v-for="activity in activities" :key="activity.id" class="activity-card">
          <img :src="activity.image" :alt="activity.name" class="activity-image" />
          <div class="activity-info">
            <h3 class="activity-name">{{ activity.name }}</h3>
            <p class="activity-description">{{ activity.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import GeneralLayout from '@/components/layout/ProtectedLayout.vue';
  import { ref } from 'vue';
  
  const activities = ref([
    {
      id: 1,
      name: 'Tour por la Ciudad',
      description: 'Explora los principales lugares de interés de la ciudad con un guía experto.',
      image: '/src/assets/img/hotel2.jpeg'
    },
    {
      id: 2,
      name: 'Excursión a la Montaña',
      description: 'Disfruta de una caminata en la montaña y contempla vistas espectaculares.',
      image: '/src/assets/img/hotel3.jpeg'
    },
    {
      id: 3,
      name: 'Relax en la Playa',
      description: 'Pasa un día en la playa con actividades acuáticas y relajación bajo el sol.',
      image: '/src/assets/img/hotel1.jpg'
    }
  ]);
  </script>
  
  <style scoped>
  .activities {
    padding: 20px;
    background-color: #f9f9f9; /* Fondo ligeramente gris */
    text-align: center;
    margin-top: 40px;
  }
  
  .activities h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .activities-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .activity-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 250px; /* Ajusta el ancho según tu diseño */
    text-align: left;
  }
  
  .activity-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .activity-info {
    padding: 15px;
  }
  
  .activity-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .activity-description {
    font-size: 16px;
    color: #666;
  }
  </style>
  