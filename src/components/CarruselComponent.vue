<template>
    <div class="carousel">
      <div class="carousel-images">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Hotel Image">
      </div>
      <button class="carousel-control prev" @click="prevSlide">‹</button>
      <button class="carousel-control next" @click="nextSlide">›</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const currentIndex = ref(0);
  const intervalTime = 3000; // Tiempo en milisegundos para el cambio automático
  
  const images = [
    '/src/assets/img/hotel1.jpg',
    '/src/assets/img/StayVistaLogo.png',
    '/src/assets/img/hotel1.jpg',
    '/src/assets/img/StayVistaLogo.png',
  ];
  
  const showSlide = (index) => {
    const slides = document.querySelectorAll('.carousel-images img');
    if (index >= slides.length) currentIndex.value = 0;
    if (index < 0) currentIndex.value = slides.length - 1;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${-100 * currentIndex.value}%)`;
    });
  };
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
    showSlide(currentIndex.value);
  };
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
    showSlide(currentIndex.value);
  };
  
  // Set up automatic slide change
  let intervalId;
  
  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      nextSlide();
    }, intervalTime);
  };
  
  const stopAutoSlide = () => {
    clearInterval(intervalId);
  };
  
  // Initialize and clean up
  onMounted(() => {
    showSlide(currentIndex.value);
    startAutoSlide();
  });
  
  onUnmounted(() => {
    stopAutoSlide();
  });
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 800px; /* Ajusta el tamaño máximo del carrusel */
    margin: 40px auto 60px; /* Añade margen superior e inferior para el espacio desde arriba y abajo */
  }
  
  .carousel-images {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-images img {
    flex: 0 0 100%; /* Asegura que cada imagen ocupe el 100% del ancho del contenedor */
    height: 400px; /* Ajusta la altura fija para mantener la proporción de las imágenes */
    object-fit: cover; /* Asegura que la imagen cubra el área del contenedor sin deformarse */
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para las imágenes */
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    width: 40px; /* Tamaño de las flechas */
    height: 40px; /* Tamaño de las flechas */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .carousel-control.prev {
    left: 10px;
  }
  
  .carousel-control.next {
    right: 10px;
  }
  </style>
  