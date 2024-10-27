/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import api from '@/axiosconfig'

const customRoutes = [

  {
    path: '/componentes',
    name: 'Componentes.listar',
    component: () => import('@/pages/92751473Componentes.vue'),
    meta: { requiresAuth: true, requiresValidBuyer: true},
  },
  {
    path: '/piezas',
    name: 'Piezas.listar',
    component: () => import('@/pages/16806827Piezas.vue'),
    meta: { requiresAuth: true, requiresValidBuyer: true},
  },
  {
    path: '/componentes/crearcomponente',
    name: 'Componentes.crear',
    component: () => import('@/pages/88520335CrearComponente.vue'),
    meta: { requiresAuth: true, requiresValidBuyer: true},
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomeClient.vue'),
    meta: { requiresAuth: true},
  },
  {
    path: '/homeprovider',
    name: 'homeprovider',
    component: () => import('@/pages/HomeProvider.vue'),
    meta: { requiresAuth: true},
  },
  {
    path: '/keygen',
    name: 'keygen',
    component: () => import('@/pages/74018291Keygen.vue'),
    meta: { requiresAuth: true},
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...customRoutes
  ]
})

// Router Guardian
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('authToken');
  const requiresValidBuyer = to.matched.some(record => record.meta.requiresValidBuyer);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (requiresValidBuyer) {
    api.post('/isValidBuyer')
      .then(response => {
        if (response.data === 1) { // Comprueba si el usuario es comprador
          next();
        } else {
          next('/plans'); // Redirige a la página de checkin
        }
      })
      .catch(error => {
        console.error(error);
        next('/login'); // Si falla la llamada API, redirige a login
      });
  } else if (to.path === '/homeprovider') {
    // Agrega la lógica para redirigir a '/home' si el usuario es proveedor
    api.post('/isProvider')
      .then(response => {
        if (response.data.isProvider) {
          next(); // Permite acceso a '/home' si el usuario es proveedor
        } else {
          next('/home'); // Redirige a '/homeClient' si el usuario no es proveedor
        }
      })
      .catch(error => {
        console.error(error);
        next('/login'); // Si falla la llamada API, redirige a login
      });
  } else {
    next();
  }
});


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
