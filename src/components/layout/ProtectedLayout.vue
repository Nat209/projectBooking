<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- Logotipo -->
      <img src="/src/assets/img/StayVistaLogo.png" alt="StayVista Logo" class="logo">

      <!-- Enlaces de navegación -->
      <ul class="nav-links">
        <router-link to="/" class="nav-link">Buscar Reservas</router-link>
        <router-link to="/list" class="nav-link">Buscar Destinos</router-link>
        <router-link to="/favoritos" class="nav-link">Favoritos</router-link>
        <router-link to="/reservas" class="nav-link">Mis reservas</router-link>
        <router-link to="/perfil" class="nav-link">Perfil</router-link>
      </ul>

      <!-- Botones de Iniciar Sesión y Registrarse -->
      <div class="auth-buttons">
        <button v-if="showLogin" @click="logout()"  class="login btn btn-danger" to="/">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
import { useAuthStore } from '@/stores/authStore'; 

const authStore = useAuthStore()

const logout =()=>{
  authStore.logout()
}




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

.nav-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  position: relative;
  margin: 0 30px; /* Aumenta el margen entre los enlaces */
}

.nav-link::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #000;
  margin-top: 5px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
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
