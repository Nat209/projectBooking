import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const use_id = ref('')
  const use_mail = ref('')

  const login = async (correo, contrasena) => {
    console.log(correo, contraseña)
    try {
      // Usar axios.post de la forma correcta
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        correo: correo,
        contrasena: contrasena
      })
      //console.log(response)

      token.value = response.data.token
      use_id.value = response.data.user.ID_Usuario
      use_mail.value = response.data.user.correo
      console.log(token.value, use_id.value,use_mail.value)

      
    } catch (error) {
      console.error(error)
    }
  }

  return {
    token,
    use_id,
    use_mail,
    login
  }
})
