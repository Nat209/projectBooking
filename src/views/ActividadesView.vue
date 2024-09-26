<template>
  <GeneralLayout :showRegister="false" />
  <section class="favorites">
    <h2>Mis Reservas</h2>
    <table class="table table-striped">
      <thead class="table-info">
        <tr>
          <th># Reserva</th>
          <th>Fecha de la reserva</th>
          <th>Nombre del Hotel</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Ciudad</th>
          <th>Dirección</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in data" :key="reserva.ID_Reserva">
          <td>{{ reserva.ID_Reserva }}</td>
          <td>{{ reserva.fecha }}</td>
          <td>{{ reserva.hotel_Nombre }}</td>
          <td>{{ reserva.dia_chequeo }}</td>
          <td>{{ reserva.dia_idaHotel }}</td>
          <td>{{ reserva.ciudad }}</td>
          <td>{{ reserva.direccion }}</td>
          
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import GeneralLayout from '@/components/layout/ProtectedLayout.vue';
import { ref, onMounted } from 'vue';
import { useReservaStore } from '@/stores/reservaStore';

const reservaStore = useReservaStore();
const data = ref([]);

onMounted(async () => {
  await reservaStore.ShowReservas();
  data.value = reservaStore.reservaList; // Asegúrate de que hotelList contiene los datos correctos
});
</script>

<style scoped>
.favorites {
  padding: 20px;
  background-color: #f9f9f9; /* Fondo ligeramente gris */
  text-align: center; /* Centra el título */
  margin-top: 40px; /* Espacio superior para desplazar la sección hacia abajo */
}

.favorites h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.favorites-list {
  list-style-type: none; /* Elimina los puntos de la lista */
  padding: 0;
  margin: 0;
}

.hotel-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* Espacio entre los elementos de la lista */
  padding: 15px;
  text-align: left;
}

.hotel-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hotel-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.btn-info {
  color: #fff;
}
</style>
