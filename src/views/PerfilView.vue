<template>
  <GeneralLayout :showRegister="false" />
  <div class="profile-container">
    <!-- Imagen del perfil a la izquierda -->
    <div class="profile-image">
      <img src="../assets/img/icono.png" class="login-image">
      <input type="file" @change="handleFileChange" class="file-input" />
    </div>

    <!-- Información del perfil a la derecha -->
    <div class="profile-info card p-4">
      <h2 class="text-center mb-4">Perfil de Usuario</h2>
      <div class="profile-details">
        <div class="detail">
          <h3>Nombre</h3>
          <p>{{ userName }}</p>
        </div>
        <div class="detail">
          <h3>Correo</h3>
          <p>{{ userEmail }}</p>
        </div>
      </div>
      <!--<button class="btn edit-btn w-100">Editar Perfil</button>-->
    </div>
  </div>
</template>

<script setup>
import GeneralLayout from '@/components/layout/ProtectedLayout.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userName = ref('');
const userEmail = ref('');
const userPhoto = ref('');

onMounted(async () => {
  await userStore.read();
  userName.value = userStore.userName;
  userEmail.value = userStore.userEmail;
  userPhoto.value = userStore.userPhoto || '/src/assets/img/default-profile.jpg';
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userPhoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
<style scoped>
.profile-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  padding: 100px;
  gap: 20px;
}

.profile-image {
  position: relative;
  margin-right: 20px;
}

.profile-image img {
  width: 120px; /* Tamaño de la imagen del perfil */
  height: 120px;
  border-radius: 50%; /* Imagen circular */
  border: 4px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.file-input {
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.profile-info {
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: -40px; /* Eleva el formulario */
  margin-left: 20px; /* Pegado a la imagen */
}

.profile-info h2 {
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.detail h3 {
  margin: 0;
  font-size: 18px;
  color: #555;
}

.detail p {
  margin: 5px 0 0;
  font-size: 16px;
  color: #333;
}

.edit-btn {
  background-color: #6fefff;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
}

.edit-btn:hover {
  background-color: #5fd8e3;
}
</style>
