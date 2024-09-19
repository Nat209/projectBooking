import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
    const HotelName = ref([]);
    const token = ref('');

    // Función para obtener el token de acceso
    const getAccessToken = async () => {
        try {
            const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: 'ze6HXoAw5VhxLzGZtLyJLmKVb41Xmsy9', 
                client_secret: 'Dl3HtfHoRNqNM6bs' 
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            token.value = response.data.access_token;
        } catch (error) {
            console.error('Error al obtener el token de acceso', error);
        }
    };

    const HotelNameFunction = async (hotelSearch) => {
        console.log(hotelSearch)
        try {
         
                await getAccessToken();
            

            const options = {
                method: 'GET',
                url: `https://test.api.amadeus.com/v1/reference-data/locations/hotel`,
                params: {
                    keyword: hotelSearch,
                    subType: 'HOTEL_GDS',
                    lang: 'ES',
                    max: 20
                },
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            };

            const response = await axios.request(options);
            response.data;
            
        } catch (error) {
            console.error('Error al obtener los datos de hoteles', error);
            if (error.response && error.response.status === 401) {
                // Si el token es inválido o ha expirado, intentar obtener un nuevo token
                await getAccessToken();
                // Reintentar la solicitud después de obtener el nuevo token
                await HotelNameFunction(hotelSearch);
            
            }
        }
    }

    return {
        HotelNameFunction,
        HotelName
    }
});
