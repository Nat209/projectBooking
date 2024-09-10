<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar w/ text</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <!-- Condicional para mostrar/ocultar el botón de 'Registrarme' -->
          <router-link v-if="showRegister" class="register btn btn-info mx-2" to="/register">Registrarme</router-link> 
          <router-link  v-if="showLogin" class="login btn btn-info" to="/login">Iniciar Sesión</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define la propiedad 'showRegister'
const props = defineProps({
  showRegister: {
    type: Boolean,
    default: true // Mostrar el botón por defecto
  },
  showLogin: {
    type: Boolean,
    default: true // Mostrar el botón por defecto
  }
});
</script>
