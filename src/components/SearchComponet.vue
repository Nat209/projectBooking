<template>
  <div class="search">
    <h2 class="text-light">Hotel que se adapte a tus preferencias</h2>
    <div class="text-center">
      <form @submit.prevent="performSearch">
        <div class="row g-3">
          <div class="col-3">
            <div class="input-group position-relative">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input 
                class="form-control" 
                type="text" 
                placeholder="Dónde quieres ir" 
                @click="handleNearby" 
                v-model="place" 
              />
              <!-- Lista de sugerencias -->
              <ul v-if="suggestions.length" class="suggestions list-group position-absolute">
                <li 
                  v-for="(suggestion, index) in suggestions" 
                  :key="index" 
                  @click="selectSuggestion(suggestion)"
                  class="list-group-item"
                >
                  {{ suggestion.name }} <!-- Ajusta esto según los datos de la API -->
                </li>
              </ul>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group position-relative">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input 
                class="form-control" 
                type="number" 
                placeholder="Dónde quieres ir" 
                v-model="dateStart" 
              />
            
            </div>
          </div>
          <!-- Otros inputs y botones -->
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSearchStore } from '@/stores/searchStore.js';

const searchStore = useSearchStore();

const place = ref('');
const dateStart = ref(null);
const dateEnd = ref(null);
const adults = ref(null);
const children = ref(null);
const room = ref(null);

const suggestions = ref([]);

const handleNearby = async () => {
  if (place.value === '') {
    const data = await searchStore.placesNearby();
    suggestions.value = data; // Ajusta según los datos devueltos
  }
};

const selectSuggestion = (suggestion) => {
  place.value = suggestion.name; // Ajusta según la estructura de datos
  suggestions.value = []; // Limpia las sugerencias después de seleccionar una
};

const performSearch = () => {
  // Lógica para realizar la búsqueda
};
</script>

<style scoped>
.search {
  background-color: rgb(159, 125, 204);
  padding: 5em;
}

.input-group {
  margin-top: 1em;
}

.suggestions {
  top: 100%; /* Para colocar la lista justo debajo del input */
  left: 0;
  width: 100%;
  z-index: 1000; /* Para asegurarse de que esté por encima de otros elementos */
  max-height: 200px; /* Limita la altura de la lista */
  overflow-y: auto; /* Agrega un scroll si la lista es muy larga */
}
</style>
