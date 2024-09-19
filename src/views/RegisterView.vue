<template>
  <GeneralLayout :showRegister="false" />
  <div class="register-container d-flex align-items-center">
    <!-- Imagen a la izquierda -->
    <div class="register-image">
      <img src="../assets/img/StayVistaLogo.png" alt="Hotel Image" class="img-fluid">
    </div>

    <!-- Formulario a la derecha -->
    <div class="register-form container card p-4">
      <h2 class="text-center mb-4">Registro</h2>
      <form @submit.prevent="SendUser">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">
          <label for="mail" class="form-label">Correo</label>
          <input type="email" class="form-control" id="mail" v-model="mail">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>

        <button type="submit" class="btn register-btn w-100">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import GeneralLayout from '@/components/layout/GeneralLayout.vue';
import { useUserStore } from '@/stores/userStore.js';
import { ref } from 'vue';

const userStore = useUserStore();

const name = ref('');
const mail = ref('');
const password = ref('');

const SendUser = async () => {
  console.log(name.value, mail.value, password.value);
  await userStore.create(name.value, mail.value, password.value);
};
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Centrado horizontal */
  min-height: 100vh; /* Asegurar que ocupe todo el alto de la página */
  padding: 20px;
}

.register-image {
  margin-right: 0; /* Elimina el margen para que la imagen quede pegada al formulario */
}

.register-image img {
  width: 100%; /* Ajusta el tamaño de la imagen para que ocupe todo el ancho del contenedor */
  max-width: 500px; /* Tamaño máximo de la imagen */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para la imagen */
}

.register-form {
  width: 100%;
  max-width: 400px; /* Ajustar el tamaño máximo del formulario */
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.register-form h2 {
  color: #333;
  font-weight: bold;
}

.register-btn {
  background-color: #6fefff; /* Color del botón de registrar */
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
}

.register-btn:hover {
  background-color: #5fd8e3;
}
</style>
