<template>
  <div class="search">
    <h2 class="text-light">Hotel que se adapte a tus preferencias</h2>
    <div class="text-center">
      <form action="">
        <div class="row g-3">
          <div class="col-2">
            <div class="input-group position-relative">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input class="form-control" type="text" placeholder="Nombre de Hotel" @input="handlHotelName" v-model="place">
              <!-- Lista de Sugerencias -->
              <ul v-if="suggestions.length > 0" class="suggestions-list">
                <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
                  {{ suggestion.name }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="col-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-building"></i></span>
              <input class="form-control" type="date" placeholder="Fecha de inicio" v-model="dateStart">
            </div>
          </div>
          <div class="col-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-building"></i></span>
              <input class="form-control" type="date" placeholder="Fecha de fin" v-model="dateEnd">
            </div>
          </div>
          <div class="col-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <button class="input-group-text dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
               Adultos-Niños-ha..
              </button>
              <ul class="dropdown-menu">
                <li class="py-2">
                  <div class="row align-items-center px-3">
                    <div class="col">
                      <label class="dropdown-item">Adultos</label>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" v-model="adults"/>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="row align-items-center px-3">
                    <div class="col">
                      <label class="dropdown-item">Niños</label>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" v-model="children"/>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="row align-items-center px-3">
                    <div class="col">
                      <label class="dropdown-item">Habitaciones</label>
                    </div>
                    <div class="col">
                      <input type="number" class="form-control" v-model="room"/>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-2">
            <button class="btn btn-primary input-group">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore()

const place = ref('')
const suggestions = computed(() => searchStore.HotelNameSuggestion)

const handlHotelName = async () => {
  if (place.value !== '') {
    await searchStore.HotelNameFunction(place.value);
  }
}

const selectSuggestion = (suggestion) => {
  nameHotel.value = suggestion.name;
  searchStore.HotelNameSuggestion = []; // Limpiar sugerencias después de seleccionar
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