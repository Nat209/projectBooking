import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/authStore' // Importa el authStore
import FavoritesView from '@/views/favoritesView.vue'

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
      component: PerfilView
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritesView
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

// Aquí es donde agregas el tercer paso (verificación de sesión)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Usa el store para verificar si hay un token

  if (to.name === 'perfil' && !authStore.token) {
    next('/login'); // Si intenta acceder al perfil y no está autenticado, redirige a login
  } else {
    next(); // Si está autenticado o la ruta no es protegida, permite la navegación
  }
});

export default router;
