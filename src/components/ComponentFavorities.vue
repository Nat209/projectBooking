<template>
    <div class="favorite-container" @click="toggleFavorite">
      <!-- Icono de corazón que cambia de color -->
      <font-awesome-icon 
        :icon="['fas', 'heart']" 
        :class="{ 'favorite-active': isFavorite }" 
        class="heart-icon"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faHeart } from '@fortawesome/free-solid-svg-icons';
  import { useHotelFavoriteStore } from '@/stores/favoritesHotelStore';
  
  const favoritesHotelStore = useHotelFavoriteStore()
  // Registrar el ícono globalmente
  import { library } from '@fortawesome/fontawesome-svg-core';
  library.add(faHeart);

  const props= defineProps({
    idHotel:Number,
    hotelName:String,
    date_check:String,
    date_checkout:String,

  })
  
  const isFavorite = ref(false);
  
  
  const toggleFavorite = async () => {
    await favoritesHotelStore.SavehotelFavorite(props.idHotel,props.hotelName, props.date_check, props.date_checkout)
    isFavorite.value = !isFavorite.value;
  };
  </script>
  
  <style scoped>
  .heart-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: color 0.3s ease;
    color: #ccc; /* Color por defecto (gris) */
  }
  
  .heart-icon.favorite-active {
    color: #ff007f; /* Color rosado cuando está en favoritos */
  }
  
  .favorite-container:hover .heart-icon {
    color: #ff007f;
  }
  </style>
  