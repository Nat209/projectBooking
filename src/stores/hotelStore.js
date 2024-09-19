import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useHotelStore = defineStore('hotel', () => {
   const hotel=ref([])


    const hotelDetail = async (hotelId, arrival_date, derture_date) => {
            
            const options = {
                method: 'GET',
                url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
                params: {
                hotel_id: hotelId,
                arrival_date: arrival_date,
                departure_date: derture_date,
                languagecode: 'en-us',
                currency_code: 'COP'
                },
                headers: {
                'x-rapidapi-key': '9c7be886bcmsh39490f62171de4fp1c9197jsn2e944440c5a4',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
                }
            };
            
            try {
                const response = await axios.request(options);
                hotel.value= response.data
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
    }

    return {
        hotelDetail, hotel
    }
});
