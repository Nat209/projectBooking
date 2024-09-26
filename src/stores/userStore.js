import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router/index'



export const useUserStore = defineStore('user', () => {

  const use_id = localStorage.getItem('id')

  const user=ref('')
  

  const read = async () => {
    console.log(use_id)
    try {
      // Usar axios.post de la forma correcta
      const response = await axios.get(`http://localhost:3000/api/usuario/${use_id}`, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      })
      user.value= response.data
      console.log(response.data)
      
    } catch (error) {
      console.error(error)
    }
  }
  const create = async (nombre,correo, contrasena) => {
    console.log(nombre, correo, contrasena)
    try {
      // Usar axios.post de la forma correcta
      const response = await axios.post(`http://localhost:3000/api/auth/usuario`, {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
      })
      console.log(response)
     
      router.push('/login')

      
    } catch (error) {
      console.error(error)
    }
  }



  return {
    create,
    read,
    user
  }
})
