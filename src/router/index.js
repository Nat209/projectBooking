import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/authStore' // Importa el authStore
import FavoritesView from '@/views/favoritesView.vue'
import ActividadesView from '@/views/ActividadesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
      meta: {
        auth: true
      }
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritesView,
      meta: {
        auth: true
      }
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ActividadesView,
      meta: {
        auth: true
      }
    },
    {
      path: '/hotelDetail/:id/:checkin/:checkout',
      name: 'hotelDetail',
      component: () => import('../views/HotelDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/list',
      name: 'listHotel',
      component: () => import('../views/ListHotel.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Usa el store para verificar si hay un token
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario tiene token

  // Si el usuario intenta ir a 'login' o 'register' pero ya está autenticado, redirige a perfil o página principal
  if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next('/perfil'); // Redirige a la página protegida
  }
  // Si el usuario intenta ir a una ruta protegida sin autenticarse, redirige a login
  else if (to.name === 'perfil' && !isAuthenticated) {
    next('/login'); // Redirige a la página de login si no está autenticado
  } 
  else {
    next(); // Permite la navegación si las condiciones no son de restricción
  }
});


export default router;
