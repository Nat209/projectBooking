import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router/index'


export const useUserStore = defineStore('user', () => {
  

  const create = async (nombre,correo, contrasena) => {
    console.log(nombre, correo, contrasena)
    try {
      // Usar axios.post de la forma correcta
      const response = await axios.post('http://localhost:3000/api/usuario', {
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
    create
  }
})
