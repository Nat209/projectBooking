import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
    const HotelNameSuggestion = ref([]);


    const HotelNameFunction = async (hotelSearch) => {
            const options = {
            method: 'GET',
            url: `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination`,
            params: {query: hotelSearch},
            headers: {
                'x-rapidapi-key': '9c7be886bcmsh39490f62171de4fp1c9197jsn2e944440c5a4',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data.data);
                HotelNameSuggestion = response.data.data
                
            } catch (error) {
                console.error(error);
        }
    }

    return {
        HotelNameFunction,
        HotelNameSuggestion
    }
});
