import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const useReservaStore = defineStore('reserva', () => {
    const reserva = ref([])
    const reservaList = ref([])
   const useId = localStorage.getItem('id')

    const SaveReserva =async(fecha, ID_Hotel,hotel_Nombre,dia_chequeo, dia_idaHotel, ciudad, direccion)=>{
        
    const options = {
        method: 'post',
        url: 'http://localhost:3000/api/reserva',
        headers: {
            'authorization': localStorage.getItem('token')
        },
        data: { 
            fecha:fecha,
            ID_Usuario: localStorage.getItem('id'),
            ID_Hotel: ID_Hotel,
            hotel_Nombre:hotel_Nombre,
            dia_chequeo: dia_chequeo,
            dia_idaHotel: dia_idaHotel,
            ciudad: ciudad, 
            direccion:direccion
        }
    };

    try {
        const response = await axios.request(options);
        reserva.value = response.data; // Guarda la respuesta
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    }
    const ShowReservas= async () => {
    
        const options = {
            method: 'get',
            url: `http://localhost:3000/api/reserva/${useId}`,
            headers: {
                'authorization': localStorage.getItem('token')
            }
        };
    
        try {
            const response = await axios.request(options);
            reservaList.value = response.data; // Guarda la respuesta
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
  

  return {SaveReserva,reserva,ShowReservas,reservaList}
})
