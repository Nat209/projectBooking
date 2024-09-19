<template>
  <GeneralLayout :showRegister="false" />
  <div class="profile-container d-flex justify-content-center align-items-center">
    <!-- Imagen del perfil a la izquierda -->
    <div class="profile-image">
      <img :src="userPhoto" alt="User Photo" class="img-fluid">
    </div>

    <!-- Información del perfil a la derecha -->
    <div class="profile-info container card p-4">
      <h2 class="text-center mb-4">Perfil de Usuario</h2>
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <p class="form-control" id="name">{{ userName }}</p>
      </div>
      <div class="mb-3">
        <label for="mail" class="form-label">Correo</label>
        <p class="form-control" id="mail">{{ userEmail }}</p>
      </div>
      <button class="btn edit-btn w-100">Editar Perfil</button>
    </div>
  </div>
</template>

<script setup>
import GeneralLayout from '@/components/layout/ProtectedLayout.vue';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userName = ref('');
const userEmail = ref('');

onMounted(async() => {
  await userStore.read()
  
});
</script>


<style scoped>
.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  gap: 20px; /* Espacio reducido entre la imagen y la información */
}

.profile-image img {
  width: 200px; /* Tamaño de la imagen del perfil */
  height: auto;
  border-radius: 50%; /* Hace que la imagen sea circular */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para la imagen */
}

.profile-info {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.profile-info h2 {
  color: #333;
  font-weight: bold;
}

.form-control {
  background-color: #f8f9fa; /* Color del campo */
  border: none;
  padding: 10px;
  font-size: 1rem;
}

.edit-btn {
  background-color: #6fefff; /* Color del botón de editar */
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

.edit-btn:hover {
  background-color: #5fd8e3;
}
</style>
