<template>
  <GeneralLayout :showLogin="false" />
  <div class="login-container d-flex align-items-center">
    <!-- Imagen a la izquierda -->
    <img src="../assets/img/StayVistaLogo.png" alt="Hotel Image" class="login-image">

    <!-- Formulario a la derecha -->
    <div class="login-form container card p-4">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="SendLogin">
        <div class="mb-3">
          <label for="correo" class="form-label">Correo</label>
          <input type="email" class="form-control" id="correo" v-model="mail">
          <div id="emailHelp" class="form-text">Nunca compartiremos tu correo con nadie más.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>

        <button type="submit" class="btn login-btn w-100">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import GeneralLayout from '@/components/layout/GeneralLayout.vue';
import { useAuthStore } from '@/stores/authStore.js';
import { ref } from 'vue';

const authStore = useAuthStore();

const mail = ref('');
const password = ref('');

const SendLogin = async () => {
  console.log(mail.value, password.value);
  await authStore.login(mail.value, password.value);
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Centrado horizontal */
  min-height: 100vh; /* Asegurar que ocupe todo el alto de la página */
  padding: 20px;
  gap: 0; /* Elimina el espacio entre la imagen y el formulario */
}

.login-image {
  width: 100%; /* Ajusta el tamaño de la imagen para que ocupe todo el ancho del contenedor */
  max-width: 500px; /* Tamaño máximo de la imagen */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para la imagen */
}

.login-form {
  width: 100%;
  max-width: 400px; /* Ajustar el tamaño máximo del formulario */
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.login-form h2 {
  color: #333;
  font-weight: bold;
}

.login-btn {
  background-color: #6fefff; /* Color del botón de iniciar sesión */
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

.login-btn:hover {
  background-color: #5fd8e3;
}
</style>
