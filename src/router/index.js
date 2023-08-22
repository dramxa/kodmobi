import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/auth'
import MainLayout from '@/layouts/main'
import { useCookies } from "vue3-cookies";
// import ProfileLayout from '@/layouts/profile'

const { cookies } = useCookies();

const routes = [
  {
    path: '/',
    redirect: '/messages',
    // component: () => import('@/views/Dashboard'),
  },
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth/signin',
    children: [
      {
        path: '/auth/signin',
        meta: {
          auth: false,
          title: 'Sign In',
        },
        component: () => import('@/views/auth/signin'),
      },
      {
        path: '/auth/signup',
        meta: {
          auth: false,
          title: 'Sign Up',
        },
        component: () => import('@/views/auth/signup'),
      },
      {
        path: '/auth/send-reset-link',
        meta: {
          auth: false,
          title: 'Send reset link',
        },
        component: () => import('@/views/auth/reset-link'),
      },
      {
        path: '/auth/reset-password/:hash',
        meta: {
          auth: false,
          title: 'Reset Password',
        },
        component: () => import('@/views/auth/reset-password'),
      },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/channels',
    children: [
      // {
      //   path: '/all-projects',
      //   meta: {
      //     auth: true,
      //     redirect: '/auth/signin',
      //     title: 'All Projects',
      //   },
      //   component: () => import('@/views/all-projects/all-projects.vue'),
      // },
      {
        path: '/balance',
        component: () => import('@/views/balance/index.vue'),
        redirect: '/auth/signin',
        // component: MainLayout,
        // meta: {
        //   auth: true,
        //   redirect: '/auth/signin',
        //   title: 'Balance',
        // },
        // component: () => import('@/views/balance/balance.vue'),
        children: [
          {
            path: '',
            meta: {
              auth: true,
              redirect: '/auth/signin',
              title: 'Balance',
            },
            component: () => import('@/views/balance/balance/balance.vue'),
          },
          {
            path: 'transactions',
            meta: {
              auth: true,
              redirect: '/auth/signin',
              title: 'Transactions',
            },
            component: () => import('@/views/balance/transactions/transactions.vue'),
          },
        ]
      },
      {
        path: '/settings',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'Settings',
        },
        component: () => import('@/views/settings/settings.vue'),
      },
      {
        path: '/channels',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'Channels',
        },
        component: () => import('@/views/settings/channels.vue'),
      },
      {
        path: '/settings/:channelId/providers',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'Providers',
        },
        component: () => import('@/views/settings/providers.vue'),
      },
      {
        path: '/settings/:projectId/channel/:channelId/provider/:providerId',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'Gateways',
        },
        component: () => import('@/views/settings/provider.vue'),
      },
      // {
      //   path: '/channels',
      //   meta: {
      //     auth: true,
      //     redirect: '/auth/signin',
      //     title: 'Channels',
      //   },
      //   component: () => import('@/views/channels/channels.vue'),
      // },
      {
        path: '/messages',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'Messages',
        },
        component: () => import('@/views/messages/messages.vue'),
      },
      {
        path: '/api',
        meta: {
          auth: true,
          redirect: '/auth/signin',
          title: 'API Reference',
        },
        component: () => import('@/views/settings/apiReference.vue'),
      },
      {
          path: '/profile',
          component: MainLayout,
          redirect: '/profile/setting',
          component: () => import('@/views/profile/profile.vue'),
          children: [
            {
              path: '/profile/setting',
              meta: {
                auth: true,
                redirect: '/auth/signin',
                title: 'Personal settings',
              },
              component: () => import('@/views/profile/setting.vue'),
            },
            {
              path: '/profile/billing',
              meta: {
                auth: true,
                redirect: '/auth/signin',
                title: 'Billing information',
              },
              component: () => import('@/views/profile/billing.vue'),
            },
          ],
        },
    ],
  },
  {
    // {
    path: '/:catchAll(.*)',
      // redirect: '/auth/send-reset-link',
    // },
    component: () => import('@/views/notFound/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const DEFAULT_TITLE = 'Kod.Mobi';

router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
})

router.beforeEach((to, from, next) => {
  const isAuth = to.meta.auth
  const redirect = to.meta.redirect
  const token = cookies.get('access_token');

  if (isAuth && !token) {
    next(redirect)
  } else if (!isAuth && token) {
    next(redirect)
  } else {
    next()
  }
})

export default router
