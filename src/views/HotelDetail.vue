<template>
  <component :is="isAuthenticated ? ProtectedLayout : GeneralLayout"></component>

  <div class="hotel-detail container mt-4" v-if="hotel">
    <ComponentModal v-if="isAuthenticated" :IdHotel="hotel.data.hotel_id" :address="hotel.data.address" :arrival_date="hotel.data.arrival_date"
      :departure_date="hotel.data.departure_date" :hotel_name="hotel.data.hotel_name" :city="hotel.data.city" />
    <section class="hotel-details">
      <div class="hotel-card">
        <div class="hotel-header">
          <div class="row">
            <div class="col-10">
              <h2 class="hotel-name"><font-awesome-icon :icon="['fas', 'hotel']" size="xl" style="color: #0DCAF0;" />{{  hotel.data.hotel_name }}</h2>
            </div>
            <div class="col-2 text-end" v-if="isAuthenticated">
              <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Reservar</button>

            </div>
          </div>
          <p class="hotel-location">{{ hotel.data.city_name_en }}, {{ hotel.data.country_trans }}</p>
          <a :href="hotel.data.url" target="_blank" class="booking-link">Ver en Booking.com</a>
        </div>
        <div class="hotel-info">
          <p class="text-muted" v-if="hotelInfo.data[0]">{{ hotelInfo.data[0].description }}</p>
          <p class="text-muted" v-if="hotelInfo.data[1]">{{ hotelInfo.data[1].description }}</p>

          <div class="info-item"><strong>Dirección:</strong> {{ hotel.data.address }}</div>
          <div class="info-item"><strong>Tipo de alojamiento:</strong> {{ hotel.data.accommodation_type_name }}</div>
          <div class="info-item"><strong>Habitaciones disponibles:</strong> {{ hotel.data.available_rooms }}</div>
          <div class="info-item"><strong>Puntuación de wifi:</strong> {{ hotel.data.wifi_review_score.rating }}</div>
          <div class="info-item"><strong>Puntuación de desayuno:</strong> {{ hotel.data.breakfast_review_score.rating }}
          </div>
          <div class="info-item"><strong>Descripción:</strong> {{ hotel.data.hotel_text &&
            Object.keys(hotel.data.hotel_text).length > 0 ? hotel.data.hotel_text : 'No hay descripción disponible.' }}
          </div>
          <div class="info-item"><strong>Fecha de llegada:</strong> {{ hotel.data.arrival_date }}</div>
          <div class="info-item"><strong>Fecha de salida:</strong> {{ hotel.data.departure_date }}</div>
          <div class="info-item"><strong>Precio promedio por noche:</strong> {{
            hotel.data.product_price_breakdown.gross_amount_per_night.amount_rounded }}</div>
          <div class="info-item"><strong>Opiniones:</strong> {{ hotel.data.review_nr }} reseñas</div>
        </div>
      </div>

      <div class="property-highlights mt-4">
        <h3>Características destacadas:</h3>
        <div class="highlights-container">
          <span v-for="(item, index) in hotel.data.property_highlight_strip" :key="index" class="highlight-tag">
            <i v-if="getBootstrapIcon(item.name)" :class="getBootstrapIcon(item.name)" class="highlight-icon"></i>
            {{ item.name }}
          </span>
        </div>
      </div>
    </section>
  </div>

  <div v-else>
    <p>Cargando detalles del hotel...</p>
  </div>

</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';

import ProtectedLayout from '@/components/layout/ProtectedLayout.vue'
import GeneralLayout from '@/components/layout/GeneralLayout.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useHotelStore } from '@/stores/hotelStore.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import ComponentModal from '@/components/ComponentModal.vue';
library.add(faHotel);

const route = useRoute();
const hotelStore = useHotelStore();
const hotel = ref(null);
const hotelInfo = ref(null);
const token = ref(localStorage.getItem('token'));

// Condicional para layout
const isAuthenticated = ref(!!token.value); // Si el token existe, `isAuthenticated` será true

const fetchHotelDetails = async () => {
  const hotelId = route.params.id; // ID del hotel
  const checkinDate = route.params.checkin; // Fecha de check-in
  const checkoutDate = route.params.checkout; // Fecha de check-out

  await hotelStore.hotelDetail(hotelId, checkinDate, checkoutDate);
  hotel.value = await hotelStore.hotel; // Espera a que los datos se carguen
  await hotelStore.hotelInfo(hotelId);
  hotelInfo.value = await hotelStore.hotelInformacion; // Espera a que los datos se carguen
};

const getBootstrapIcon = (name) => {
  // Mapea nombres de características a clases de íconos de Bootstrap
  const iconMap = {
    Parking: 'bi bi-car-front',
    'Pet friendly': 'bi bi-paw',
    'Air conditioning': 'bi bi-snowflake',
    'Fitness center': 'bi bi-activity',
    'Non-smoking rooms': 'bi bi-no-smoking',
    'Facilities for disabled guests': 'bi bi-person-badge',
    '24-hour front desk': 'bi bi-clock',
    'Baggage storage': 'bi bi-bag',
    Heating: 'bi bi-thermometer',
    Elevator: 'bi bi-elevator',
  };
  return iconMap[name] || null; // Retorna la clase del ícono o null si no hay coincidencia
};

onMounted(() => {
  fetchHotelDetails();
  const token = localStorage.getItem('token');
  if (token) {
    isAuthenticated.value = true; // Si hay token, mostramos el componente
  } else {
    isAuthenticated.value = false; // Si no hay token, no mostramos el componente
  }
});



</script>

<style scoped>
.hotel-detail {
  padding: 2em;
}

.hotel-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hotel-header {
  margin-bottom: 1.5em;
}

.hotel-name {
  font-size: 24px;
  font-weight: bold;
}

.hotel-location {
  color: #777;
}

.booking-link {
  display: inline-block;
  margin-top: 0.5em;
  color: #007BFF;
  text-decoration: none;
}

.booking-link:hover {
  text-decoration: underline;
}

.hotel-info {
  line-height: 1.6;
}

.info-item {
  margin-bottom: 10px;
}

.property-highlights {
  margin-top: 20px;
}

.highlight-tag:hover {
  background-color: #0DCAF0;
  cursor: pointer;
}

.highlights-container {
  display: flex;
  flex-wrap: wrap;
}

.highlight-tag {
  background-color: #f0f0f0;
  /* Color de fondo de las etiquetas */
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  display: flex;
  align-items: center;
}

.highlight-icon {
  margin-right: 5px;
  /* Espaciado entre el icono y el texto */
  font-size: 16px;
  /* Ajusta el tamaño del icono */
}
</style>
