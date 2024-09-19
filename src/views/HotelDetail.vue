<template>
  <div class="hotel-detail container mt-4" v-if="hotel">
    <h2 class="text-light mb-4">{{ hotel.data.hotel_name }}</h2>
    
    <div class="card">
      <div id="hotelCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-if="hotel.data.property_highlight_strip.length > 0">
           
          </div>
          <div v-else class="carousel-item active">
            <img src="https://via.placeholder.com/800x400" class="d-block w-100" alt="Imagen por defecto">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#hotelCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#hotelCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="card-body">
        <p class="card-text">{{ hotel.data.accessibilityLabel }}</p>
        <p class="card-text"><strong>Ubicación:</strong> {{ hotel.data.address }}, {{ hotel.data.city }}, {{ hotel.data.zip }}</p>
        <p class="card-text"><strong>Descripción:</strong> {{ hotel.data.hotel_text || 'No hay descripción disponible.' }}</p>
        <p class="card-text"><strong>Precio promedio por noche:</strong> ${{ hotel.data.composite_price_breakdown.gross_amount_per_night.amount_rounded }}</p>
        <a :href="hotel.data.url" class="btn btn-primary" target="_blank">Reservar ahora</a>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Cargando detalles del hotel...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHotelStore } from '@/stores/hotelStore.js';

const route = useRoute();
const hotelStore = useHotelStore();
const hotel = ref(null);

const fetchHotelDetails = async () => {
  const hotelId = route.params.id; // ID del hotel
  const checkinDate = route.params.checkin; // Fecha de check-in
  const checkoutDate = route.params.checkout; // Fecha de check-out
  
  await hotelStore.hotelDetail(hotelId, checkinDate, checkoutDate);
  hotel.value = await hotelStore.hotel; // Espera a que los datos se carguen
};

onMounted(() => {
  fetchHotelDetails();
});
</script>

<style scoped>
.hotel-detail {
  background-color: rgb(159, 125, 204);
  padding: 2em;
}
</style>
