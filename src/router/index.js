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
            auth: true
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
        // Prevent navigation to authentication again
        if (to.meta.redirect) {
            next({
                path: '/dashboard'
            })
        }

        // Set common token
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        // Continue
        next()
    }
})

export default router