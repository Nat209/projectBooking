<template>
    <GeneralLayout :showLogin="false" />
    <div class="d-flex justify-content-center align-items-center ">
      <div class="container m-5 w-25 card p-3">
        <form @submit.prevent="SendLogin">
          <div class="mb-3">
            <label for="correo" class="form-label">Correo</label>
            <input type="email" class="form-control" id="correo" v-model="name">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import GeneralLayout from '@/components/layout/GeneralLayout.vue';
  import {useAuthStore} from '@/stores/authStore.js'
  import { ref } from 'vue';

  const authStore = useAuthStore()

  const mail = ref('')
  const password = ref('')


  const SendLogin= async()=>{
    console.log(mail.value, password.value)

    await authStore.login(mail.value,password.value)
  }
  </script>
  