<template>
    <div class="hotel-search">
      
      <form @submit.prevent="searchHotels">
        <div class="form-group">
          <label for="name">Nombre del Hotel:</label>
          <input v-model="searchQuery.name" type="text" id="name" placeholder="Nombre del hotel" />
        </div>
  
        <div class="form-group">
          <label for="city">Ciudad:</label>
          <input v-model="searchQuery.city" type="text" id="city" placeholder="Ciudad" />
        </div>
  
        <div class="form-group">
          <label for="rating">Calificación Mínima:</label>
          <input v-model="searchQuery.rating" type="number" id="rating" min="1" max="5" placeholder="Calificación mínima" />
        </div>
  
        <div class="form-group">
          <label for="numGuests">Número de Personas:</label>
          <input v-model="searchQuery.numGuests" type="number" id="numGuests" min="1" placeholder="Número de personas" />
        </div>
  
        <button type="submit" class="btn btn-primary">Buscar</button>
      </form>
  
      <div v-if="hotels.length" class="results">
        <h3>Resultados de Búsqueda</h3>
        <ul>
          <li v-for="hotel in hotels" :key="hotel.id">
            <h4>{{ hotel.name }} - {{ hotel.city }}</h4>
            <p>Calificación: {{ hotel.rating }} estrellas</p>
            <p>{{ hotel.numGuests }} personas</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: {
          name: '',
          city: '',
          rating: null,
          numGuests: null
        },
        hotels: []
      };
    },
    methods: {
      searchHotels() {
        // Simular una llamada de búsqueda de hoteles con datos de ejemplo
        const allHotels = [
          { id: 1, name: 'Hotel Paradise', city: 'New York', rating: 4, numGuests: 2 },
          { id: 2, name: 'Ocean View', city: 'Miami', rating: 5, numGuests: 4 },
          { id: 3, name: 'Mountain Escape', city: 'Denver', rating: 3, numGuests: 3 }
        ];
  
        // Filtrar los hoteles según los criterios de búsqueda
        this.hotels = allHotels.filter(hotel => {
          return (
            (!this.searchQuery.name || hotel.name.toLowerCase().includes(this.searchQuery.name.toLowerCase())) &&
            (!this.searchQuery.city || hotel.city.toLowerCase().includes(this.searchQuery.city.toLowerCase())) &&
            (!this.searchQuery.rating || hotel.rating >= this.searchQuery.rating) &&
            (!this.searchQuery.numGuests || hotel.numGuests >= this.searchQuery.numGuests)
          );
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .hotel-search {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .results {
    margin-top: 20px;
  }
  
  .results h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .results ul {
    list-style: none;
    padding: 0;
  }
  
  .results li {
    background-color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  