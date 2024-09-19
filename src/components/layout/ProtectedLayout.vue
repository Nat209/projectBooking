<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- Logotipo -->
      <img src="/src/assets/img/StayVistaLogo.png" alt="StayVista Logo" class="logo">

      <!-- Enlaces de navegación -->
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Search Hotels</a></li>
        <li><a href="#">Activities</a></li>
        <li><a href="#">Favorites</a></li>
      </ul>

      <!-- Botones de Iniciar Sesión y Registrarse -->
      <div class="auth-buttons">
        <router-link v-if="showRegister" class="register btn btn-info mx-2" to="/register">Registrarme</router-link>
        <router-link  v-if="showLogin" class="login btn btn-info" to="/login">Iniciar Sesión</router-link>
      </div>
    </div>
  </nav>
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
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff; /* Fondo blanco */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
}

.navbar-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.logo {
  width: 130px; /* Ajusta el tamaño del logo */
  height: auto;
  margin-right: 20px;
}

.nav-links {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin: 0 20px;
}

.nav-links a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  position: relative;
}

.nav-links a::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #000;
  margin-top: 5px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-links a:hover::after {
  transform: scaleX(1);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.login-btn,
.register-btn {
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}

.login-btn {
  background-color: #6fefff; /* Color azul claro */
  color: #000;
}

.register-btn {
  background-color: #ff8c6f; /* Color naranja claro */
  color: #000;
}

.login-btn:hover {
  background-color: #5fd8e3; /* Color hover */
}

.register-btn:hover {
  background-color: #ff7153; /* Color hover */
}
</style>
