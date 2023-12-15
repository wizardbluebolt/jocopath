// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    return { accessToken, idToken }
  } catch (err) {
    console.log(err);
    return {}
  }
}

async function currentAuthenticatedUser() {
  try {
    await getCurrentUser();
    const tokens = await currentSession();
    return tokens;
  } catch (err) {
    console.log(err);
    return {}
  }
}

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/News.vue'),
      },
      {
        path: '/about',
        name: 'About PATH',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/contact',
        name: 'Contact Us',
        component: () => import('@/views/Contact.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/auth',
        name: 'Authenticate',
        component: () => import('@/components/Auth.vue')
      },
      {
        path: '/homeless',
        name: 'Homeless',
        component: () => import('@/views/Homeless.vue')
      },
      {
        path: '/news',
        name: 'News', 
        component: () => import('@/views/News.vue')
      },
      {
        path: '/services',
        name: 'Services',
        component: () => import('@/views/Services.vue')
      },
      {
        path: '/success', 
        name: 'Success',
        component: () => import('@/views/Success.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const tokens = await currentAuthenticatedUser();
    if (tokens?.accessToken) {
      return true
    } else {
      if (to.name !== 'Authenticate') {
        return { name: 'Authenticate'}
      } else {
        return false
      }
    }
  } else {
    return true
  }
})

export default router
