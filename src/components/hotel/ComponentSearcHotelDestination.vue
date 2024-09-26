<template>
  <div class="search container mt-4">
    <h2 class="text-dark mb-4"><font-awesome-icon :icon="['fas', 'map-location']" size="l" style="color: #0DCAF0;" /> Busca tu próximo destino</h2>
    <div class="text-center">
      <form @submit.prevent="handelSubmit">
        <div class="row g-3">
          <div class="col-12">
            <div class="input-group position-relative">
              <span class="input-group-text">
                <i class="bi bi-geo"></i>
              </span>
              <input
                class="form-control"
                type="text"
                placeholder="A dónde vas"
                @input="handlHotelName()"
                v-model="place"
                aria-label="Buscar destino"
              />
              <!-- Lista de Sugerencias -->
              <ul v-if="suggestions.length > 0" class="list-group position-absolute w-100 suggestions-list">
                <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)" class="list-group-item cursor-pointer">
                  {{ suggestion.name }}
                </li>
              </ul>
            </div>
          </div>

          <div class="col-12">
            <button class="btn btn-info w-100">Buscar</button>
          </div>
        </div>
      </form>
    </div>

    <!-- Carrusel de Imágenes -->
    
  </div>
  
    <!-- Lista de Resultados de Búsqueda -->
    <div class="results container my-4">
      <h3 v-if="searchResults.length > 0" class="text-dark mb-4">Resultados de búsqueda</h3>
      <ul class="list-group">
        <li v-for="(result, index) in searchResults" :key="index" class="list-group-item">
          <div class="hotel-info row align-items-center">
            <div class="col-md-8">
              <h4 class="mb-1">{{ result.city_name }}</h4>
              <h5 class="text-muted">{{ result.label }}</h5>
              <p class="mb-1">{{ result.country }}</p>
              <p class="text-muted">{{ result.region }}</p>
              <p class="fw-bold">{{ result.nr_hotels }} hoteles disponibles</p>
            </div>
            <div class="col-md-4 text-end">
              <img :src="result.image_url" alt="Imagen del hotel" class="img-fluid rounded" />
            </div>
          </div>
        </li>
      </ul>

      <!-- Mostrar mensaje cuando no haya resultados -->
      <p v-if="searchResults.length === 0" class="text-dark">No se encontraron hoteles en este destino.</p>
    </div>

  <div id="travelCarousel" class="carousel container my-4" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://www.xylem.com/es-co/making-waves/water-utilities-news/how-one-utility-uses-a-digital-twin-to-manage-real-time-drinking-water-distribution/contentassets/800x400-nashville-digital-twin-water-network.jpg" class="d-block w-100" alt="Viajar por el mundo">
          <div class="carousel-caption d-none d-md-block">
            <h5>Descubre nuevas culturas</h5>
            <p>Viajar te permite sumergirte en diferentes tradiciones y modos de vida.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://cordoba.gob.ar/wp-content/uploads/2024/03/vlcsnap-2022-01-11-11h11m58s902-1-scaled-800x400@2x.jpg" class="d-block w-100" alt="Explora la naturaleza">
          <div class="carousel-caption d-none d-md-block">
            <h5>Explora la belleza de la naturaleza</h5>
            <p>Desde montañas majestuosas hasta playas paradisíacas, el mundo está lleno de maravillas naturales.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://media.staticontent.com/media/pictures/efefd580-9868-4d48-9810-ffb31d39d833" class="d-block w-100" alt="Crea recuerdos inolvidables">
          <div class="carousel-caption d-none d-md-block">
            <h5>Crea recuerdos inolvidables</h5>
            <p>Viajar te brinda la oportunidad de vivir experiencias que recordarás para siempre.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#travelCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#travelCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faMapLocation);

const searchStore = useSearchStore();
const place = ref("");

const suggestions = computed(() => searchStore.HotelNameSuggestion);
const searchResults = ref([]); // Usa computed para acceder a los resultados del store

const handlHotelName = async () => {
  if (place.value !== "") {
    await searchStore.HotelNameFunction(place.value);
  }
};

const selectSuggestion = (suggestion) => {
  place.value = suggestion.name; // Mostrar el nombre en el input 'place'
  searchStore.HotelNameSuggestion = []; // Limpiar sugerencias después de seleccionar
};

const handelSubmit = async () => {
  await searchStore.filterDestination(place.value);
  searchResults.value = searchStore.searchDestinationResults.data; // Actualiza searchResults manualmente
};
</script>

<style scoped>

.search {
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ddeef6
}

.input-group {
  margin-top: 1em;
}

.suggestions-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin-top: 0.5em;
  border-radius: 5px; /* Bordes redondeados */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s; /* Transición suave */
}

.suggestions-list li:hover {
  background-color: #e8e8e8; /* Color de fondo al pasar el mouse */
}

.results .list-group-item {
  padding: 1.5em; /* Mayor espaciado */
}

.hotel-info {
  display: flex;
  align-items: center; /* Alinea el contenido verticalmente */
}

.img-fluid {
  max-width: 100%; /* Asegura que la imagen no sobrepase el contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 5px; /* Bordes redondeados para la imagen */
}

.carousel-inner img {
  border-radius: 10px; /* Bordes redondeados para las imágenes del carrusel */
}

</style>
