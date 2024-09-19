<template>
  <div class="search">
    <h2 class="text-light">Hotel que se adapte a tus preferencias</h2>
    <div class="text-center">
      <form action="">
        <div class="row g-3">
          <div class="col-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input class="form-control" type="text" placeholder="Nombre de Hotel" v-model="nameHotel">
            </div>
          </div>
          <div class="col-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-geo"></i></span>
              <input class="form-control" type="text" placeholder="Dónde quieres ir" @click="handleLocation()" v-model="place">
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
import { ref, watch } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore();

const nameHotel = ref('');
const place = ref('');
const dateStart = ref(null);
const dateEnd = ref(null);
const adults = ref(null);
const children = ref(null);
const room = ref(null);

// Watcher para nameHotel
watch(nameHotel, async (newValue) => {
  console.log(newValue); // Mostrar el valor de nameHotel cuando cambie
  if (nameHotel.value != '') {
    await searchStore.HotelNameFunction(newValue);
    console.log(await searchStore.hotelName);
  }
});
</script>

<style scoped>
.search {
  background-color: rgb(159, 125, 204);
  padding: 2em;
}

.input-group {
  margin-top: 1em;
}
</style>
