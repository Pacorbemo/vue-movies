// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Asegúrate de que esta ruta sea correcta

// Definir las rutas con tipos
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/:id',
    name: 'Movie',
    component: () => import('../views/MovieView.vue'),
  },
];

// Crear el router con tipos
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
