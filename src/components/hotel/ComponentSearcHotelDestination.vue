
    <template>
        <div class="search container mt-4 ">
            <h2 class="text-light mb-4">Busca tu proximo destino</h2>
            <div class="text-center">
                <form @submit.prevent="handelSubmit">
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <div class="input-group position-relative">
                                <span class="input-group-text"><i class="bi bi-geo"></i></span>
                                <input class="form-control" type="text" placeholder="A dónde vas"
                                    @input="handlHotelName()" v-model="place" />
                                <!-- Lista de Sugerencias -->
                                <ul v-if="suggestions.length > 0"
                                    class="list-group position-absolute w-100 suggestions-list">
                                    <li v-for="(suggestion, index) in suggestions" :key="index"
                                        @click="selectSuggestion(suggestion)" class="list-group-item cursor-pointer">
                                        {{ suggestion.name }}
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


      <!-- Lista de Resultados de Búsqueda -->
      <div class="results container my-4">
        <h3 v-if="searchResults.length > 0" class=" mb-4">Resultados de búsqueda</h3>
        <ul class="list-group">
            <li v-for="(result, index) in searchResults" :key="index" class="list-group-item">
                <div class="hotel-info row">
                    <div class="col">
                        <h4>{{ result.city_name }}</h4>
                        <h4>{{ result.label }}</h4>
                        <p>{{ result.country }}</p>
                        <p>{{ result.region }}</p>
                        <p>{{ result.nr_hotels }}</p>
                    </div>
                    <div class="col">
                        <img :src="result.image_url" alt="Imagen del hotel">
                    </div>
                    
                    <!-- Aquí puedes agregar más información según la estructura del resultado -->
                </div>
            </li>
        </ul>

        <!-- Mostrar mensaje cuando no haya resultados -->
        <p v-if="searchResults.length === 0" class="text-light">No se encontraron hoteles en este destino.</p>
    </div>
</template>

    <script setup>

import { ref, computed } from "vue";
import { useSearchStore } from "@/stores/searchStore";


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
  searchResults.value = searchStore.searchDestinationResults.data; // Actualiza searchResults manualment
  console.log(searchResults.value);
};
</script>
<style scoped>
.search {
  background-color: rgb(125, 129, 204);
  padding: 2em;
}

.input-group {
  margin-top: 1em;
}

.suggestions-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  width: 10%;
  max-height: 200px;
  overflow-y: 50;
  z-index: 10;
  list-style: none;
  padding:0;
  margin: 2.5em;
}

.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
