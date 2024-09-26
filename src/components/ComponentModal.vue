<template>
    <div>
      <!-- Alerta de éxito, inicialmente oculta -->
      <div v-if="showAlert" class="alert alert-success alert-dismissible fade show" role="alert">
        ¡Reserva realizada con éxito!
        <button type="button" class="btn-close" @click="hideAlert"></button>
      </div>
  
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Reserva</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h3 class="bold">{{ props.hotel_name }}</h3>
              <p>Fecha de check-in: {{ props.arrival_date }}</p>
              <p>Fecha de check-out: {{ props.departure_date }}</p>
              <p>Ciudad: {{ props.city }}</p>
              <p>Dirección Hotel: {{ props.address }}</p>
              <p>Fecha actual: {{ currentDate }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" @click="sendReservation()" class="btn btn-info">Sí, reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import { useReservaStore } from '@/stores/reservaStore';
  
  const reservaStore = useReservaStore();
  const showAlert = ref(false); // Control de la alerta
  const currentDate = ref(formatDate(new Date()))
  
  const props = defineProps({
    IdHotel: Number,
    address: String,
    arrival_date: String,
    departure_date: String,
    hotel_name: String,
    city: String
  });
  
  // Función para enviar la reserva
  const sendReservation = async () => {
    try {
      // Llamada para guardar la reserva incluyendo la fecha actual
      await reservaStore.SaveReserva(
        
        currentDate.value ,
        props.IdHotel,
        props.hotel_name,
        props.arrival_date,
        props.departure_date,
        props.city,
        props.address
      );
  
      // Mostrar alerta si la reserva se realiza con éxito
      showAlert.value = true;
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  };
  // Función para formatear la fecha en "aaaa-mm-dd"
function formatDate(date) {
  return date.toISOString().split('T')[0]; // "aaaa-mm-dd"
}
  // Función para ocultar la alerta
  const hideAlert = () => {
    showAlert.value = false;
  };
  </script>
  