import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Axios from 'axios'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            name: 'Accueil',
            auth: false
        }
    },
    {
        path: '/authentication',
        name: 'Authentication',
        component: () =>
            import ('@/views/Authentication/Login.vue'),
        meta: {
            name: 'Connexion',
            redirect: true
        }
    },
    {
        path: '/authentication/register',
        name: 'Register',
        component: () =>
            import ('@/views/Authentication/Register.vue'),
        meta: {
            name: 'Inscription',
            redirect: true
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () =>
            import ('@/views/Settings/Settings.vue'),
        meta: {
            name: 'Paramètres',
            auth: true
        }
    },
    {
        path: '/customers',
        name: 'Customers',
        component: () =>
            import ('@/views/Customers/List.vue'),
        meta: {
            name: 'Clients',
            auth: true
        }
    },
    {
        path: '/customers/:id',
        name: 'Customer Detail',
        component: () =>
            import ('@/views/Customers/Detail/Detail.vue'),
        meta: {
            name: 'Fiche client',
            auth: true
        }
    },
    {
        path: '/invoices',
        name: 'Invoices',
        component: () => import('@/views/Invoices/List.vue'),
        meta: {
            name: 'Factures',
            auth: true
        }
    },
    {
        path: '/invoices/:id',
        name: 'Invoice Detail',
        component: () => import('@/views/Invoices/Detail/Detail.vue'),
        meta: {
            name: 'Facture',
            auth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // Set page title
    document.title = `${to.meta.name} - InvoiceKit`

    // Authentication redirection
    if (to.meta.auth && localStorage.getItem('token') === null) {
        // Redirect to authentication page
        next({
            path: '/authentication'
        })
    } else {
        // Set common token
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        // Prevent navigation to authentication again
        if (to.meta.redirect) {
            next({
                path: '/dashboard'
            })
        }

        // Continue
        next()
    }
})

export default router