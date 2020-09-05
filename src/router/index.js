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
            auth: true
        }
    },
    {
        path: '/authentication',
        name: 'Authentication',
        component: () =>
            import ('@/views/Authentication/Login.vue')
    },
    {
        path: '/authentication/register',
        name: 'Register',
        component: () =>
            import ('@/views/Authentication/Register.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth) && localStorage.getItem('token') === null) {
        // Redirect to authentication page
        next({
            path: '/authentication'
        })
    } else {
        // Prevent navigation to authentication again
        if (to.path == 'authentication') {
            next({
                path: '/'
            })
        }

        // Set common token
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        // Continue
        next()
    }
})

export default router