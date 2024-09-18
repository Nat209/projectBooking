import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  
    const placesNearby = async () => {
        const options = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getNearbyCities',
            params: {
              latitude: '65.9667',
              longitude: '-18.5333',
              languagecode: 'en-us'
            },
            headers: {
              'x-rapidapi-key': '9c7be886bcmsh39490f62171de4fp1c9197jsn2e944440c5a4',
              'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
          
        try {
            const response = await axios.request(options);
            return response.data; // Asegúrate de que esto sea una lista de objetos con los datos que necesitas
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    return {
        placesNearby
    };
});
