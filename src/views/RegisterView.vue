<template>
    <GeneralLayout :showRegister="false" />
    <div class="d-flex justify-content-center align-items-center ">
      <div class="container m-5 w-25 card p-3">
        <form @submit.prevent="SendUser">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="name">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="mail" class="form-label">Correo</label>
            <input type="email" class="form-control" id="name" v-model="mail">
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
  import {useUserStore} from '@/stores/userStore.js'
  import { ref } from 'vue';

  const userStore = useUserStore()

  const name = ref('')
  const mail = ref('')
  const password = ref('')


  const SendUser= async()=>{
    console.log(name.value,mail.value, password.value)

    await userStore.create(name.value,mail.value, password.value)
  }
  </script>