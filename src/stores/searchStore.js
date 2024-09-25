import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
    const HotelNameSuggestion = ref([]);
    const searchResults =ref([])
    const searchDestinationResults =ref([])


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
                HotelNameSuggestion.value= response.data.data
                
            } catch (error) {
                console.error(error);
        }
    }

    const filter = async(dest_id,dest_type,arrival_date, departure_date, adults,children_age,room_qty)=>{
        
            const options = {
            method: 'GET',
            url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
            params: {
                dest_id: dest_id,
                search_type: dest_type,
                arrival_date: arrival_date,
                departure_date: departure_date,
                adults: adults,
                children_age: children_age,
                room_qty: room_qty,
                languagecode: 'ES'
            },
            headers: {
                'x-rapidapi-key': '9c7be886bcmsh39490f62171de4fp1c9197jsn2e944440c5a4',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
            };

            try {
                const response = await axios.request(options);
              
                searchResults.value =response.data
            } catch (error) {
                console.error(error);
            }
    }
    const filterDestination = async(query)=>{
        
        const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
        params: {
            query: query,
            
            languagecode: 'es'
        },
        headers: {
            'x-rapidapi-key': '9c7be886bcmsh39490f62171de4fp1c9197jsn2e944440c5a4',
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
          
            searchDestinationResults.value =response.data
        } catch (error) {
            console.error(error);
        }
}

    return {
        HotelNameFunction,
        filter,
        filterDestination,
        searchDestinationResults,
        searchResults,
        HotelNameSuggestion
        
        
    }
});
