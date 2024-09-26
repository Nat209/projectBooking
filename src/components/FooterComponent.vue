<template>
    <footer class="footer">
      <div class="footer-content">
        <!-- Logotipo -->
        <img src="../assets/img/StayVistaLogo.png" alt="StayVista Logo" class="logo">
  
        <!-- Línea divisoria -->
        <hr class="divider">
  
        <!-- Iconos de redes sociales -->
        <div class="social-icons">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-x-twitter"></i>
          <i class="fa-brands fa-facebook"></i>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  
  <style scoped>
  .footer {
    max-height: 5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff; /* Fondo blanco */
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .logo {
    width: 130px; /* Igual al tamaño del logo en el navbar */
    height: auto;
    margin-right: 20px;
  }
  
  .divider {
    flex-grow: 1;
    height: 1px;
    background-color: #ccc; /* Color de la línea */
    margin: 0 20px;
  }
  
  .social-icons {
    display: flex;
    align-items: center;
  }
  
  .social-icons i {
    font-size: 24px; /* Tamaño de los iconos */
    color: #000;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .social-icons i:hover {
    color: #555; /* Color de hover para los iconos */
  }
  </style>
  