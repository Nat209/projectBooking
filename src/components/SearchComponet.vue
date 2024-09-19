<template>
  <div class="search container mt-4">
    <h2 class="text-light mb-4">Hotel que se adapte a tus preferencias</h2>
    <div class="text-center">
      <form @submit.prevent=" handelSubmit">
        <div class="row g-3">
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="input-group position-relative">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input class="form-control" type="text" placeholder="A dónde vas" @input="handlHotelName()" v-model="place">
              <!-- Lista de Sugerencias -->
              <ul v-if="suggestions.length > 0" class="list-group position-absolute w-100 suggestions-list">
                <li 
                  v-for="(suggestion, index) in suggestions" 
                  :key="index"
                  @click="selectSuggestion(suggestion)"  
                  class="list-group-item cursor-pointer"
                >
                  {{ suggestion.name }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar"></i></span>
              <input class="form-control" type="date" placeholder="Fecha de inicio" v-model="dateStart">
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar"></i></span>
              <input class="form-control" type="date" placeholder="Fecha de fin" v-model="dateEnd">
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <button class="form-control  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Adultos-Niños-Habitaciones
              </button>
              <ul class="dropdown-menu ">
                <li class="px-3 py-2">
                  <div class="d-flex justify-content-between">
                    <label>Adultos</label>
                    <input type="number" class="form-control" v-model="adults"/>
                  </div>
                </li>
                <li class="px-3 py-2">
                  <div class="d-flex justify-content-between">
                    <label>Niños</label>
                    <input type="number" class="form-control" v-model="children"/>
                  </div>
                </li>
                <li class="px-3 py-2">
                  <div class="d-flex justify-content-between">
                    <label>Habitaciones</label>
                    <input type="number" class="form-control" v-model="room"/>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-12">
            <button class="btn btn-primary w-100">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="container mt-4">
    <!-- Verifica si hay resultados y muestra las tarjetas -->
    <div v-if="searchResults && searchResults.data && searchResults.data.hotels && searchResults.data.hotels.length > 0" class="row">
      <div v-for="(result, index) in searchResults.data.hotels" :key="result.hotel_id" class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <!-- Carrusel de imágenes -->
          <div id="carouselExampleControls{{ index }}" class="carousel slide">
            <div class="carousel-inner">
              <!-- Verifica si hay imágenes disponibles -->
              <div v-if="result.property.photoUrls.length > 0">
                <div v-for="(image, imgIndex) in result.property.photoUrls" :key="imgIndex" :class="['carousel-item', { active: imgIndex === 0 }]">
                  <img :src="image" class="d-block w-100" :alt="result.property.name">
                </div>
              </div>
              <!-- Mensaje en caso de no haber imágenes -->
              <div v-else class="carousel-item active">
                <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Imagen por defecto">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExampleControls' + index" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExampleControls' + index" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <!-- Contenido de la tarjeta -->
          <div class="card-body">
            <h5 class="card-title">{{ result.property.name }}</h5>
            <p class="card-text">{{ result.accessibilityLabel }}</p>
            <a :href="'/hotel/' + result.hotel_id" class="btn btn-primary">Ver detalles</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron resultados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore();

const place = ref(''); 
const placeId = ref(''); 
const dest_type = ref(''); 
const dateStart = ref('');
const dateEnd = ref('');
const adults = ref('');
const children = ref('');
const room = ref('');
const suggestions = computed(() => searchStore.HotelNameSuggestion);
const searchResults =ref([]) // Usa computed para acceder a los resultados del store

const handlHotelName = async () => {
  if (place.value !== '') {
    await searchStore.HotelNameFunction(place.value);
  }
}

const selectSuggestion = (suggestion) => {
  place.value = suggestion.name; // Mostrar el nombre en el input 'place'
  placeId.value = suggestion.dest_id; // Almacenar el ID en 'placeId'
  dest_type.value = suggestion.dest_type; // Almacenar el tipo en 'dest_type'
  searchStore.HotelNameSuggestion = []; // Limpiar sugerencias después de seleccionar
}

const handelSubmit = async () => {
  await searchStore.filter(placeId.value, dest_type.value, dateStart.value, dateEnd.value, adults.value, children.value, room.value);
  searchResults.value = searchStore.searchResults; // Actualiza searchResults manualment
  console.log(searchResults.value)
}
</script>

<style scoped>
.search {
  background-color: rgb(159, 125, 204);
  padding: 2em;
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
  margin: 0;
}

.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
