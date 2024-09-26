import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore';

export const useHotelFavoriteStore = defineStore('hotelFavorite', () => {
   const hotel=ref([])
   const hotelList=ref([])
   const useId = localStorage.getItem('id')


   const SavehotelFavorite = async (hotelId,hotelName, arrival_date, departure_date) => {
    console.log(useId, hotelId, arrival_date, departure_date);
    
    const options = {
        method: 'post',
        url: 'http://localhost:3000/api/favoritos_hoteles',
        headers: {
            'authorization': localStorage.getItem('token')
        },
        data: { 
            ID_Usuario: localStorage.getItem('id'),
            ID_Hotel: hotelId,
            hotel_Nombre:hotelName,
            dia_chequeo: arrival_date,
            dia_idaHotel: departure_date
        }
    };

    try {
        const response = await axios.request(options);
        hotel.value = response.data; // Guarda la respuesta
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
const ShowhotelFavorite = async () => {
    
    const options = {
        method: 'get',
        url: `http://localhost:3000/api/favoritos_hoteles/${useId}`,
        headers: {
            'authorization': localStorage.getItem('token')
        }
    };

    try {
        const response = await axios.request(options);
        hotelList.value = response.data; // Guarda la respuesta
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

    return {
        SavehotelFavorite, hotel,ShowhotelFavorite,hotelList
    }
});
