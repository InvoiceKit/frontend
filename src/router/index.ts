import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Axios from "axios";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            name: "Accueil",
            auth: false,
        },
    },
    {
        path: "/authentication",
        name: "Authentication",
        component: () => import("@/views/Authentication/Login.vue"),
        meta: {
            name: "Connexion",
            redirect: true,
        },
    },
    {
        path: "/authentication/register",
        name: "Register",
        component: () => import("@/views/Authentication/Register.vue"),
        meta: {
            name: "Inscription",
            redirect: true,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        meta: {
            name: "Tableau de bord",
            auth: true,
        },
    },
    {
        path: "/messages",
        name: "Messages",
        component: () => import("@/views/Messages/List.vue"),
        meta: {
            name: "Messages",
            auth: true,
        },
    },
    {
        path: "/contracts",
        name: "Contrats",
        component: () => import("@/views/Contracts/List.vue"),
        meta: {
            name: "Contrats",
            auth: true,
        },
    },
    {
        path: "/contracts/:id",
        name: "ContratsDetail",
        component: () => import("@/views/Contracts/Detail/View.vue"),
        meta: {
            name: "Contrat",
            auth: true,
        },
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/Settings/Settings.vue"),
        meta: {
            name: "Paramètres",
            auth: true,
        },
    },
    {
        path: "/customers",
        name: "Customers",
        component: () => import("@/views/Customers/List.vue"),
        meta: {
            name: "Clients",
            auth: true,
        },
    },
    {
        path: "/customers/:id",
        name: "Customer Detail",
        component: () => import("@/views/Customers/Detail/Detail.vue"),
        meta: {
            name: "Fiche client",
            auth: true,
        },
    },
    {
        path: "/invoices",
        name: "Invoices",
        component: () => import("@/views/Invoices/List.vue"),
        meta: {
            name: "Factures",
            auth: true,
        },
    },
    {
        path: "/invoices/:id",
        name: "Invoice Detail",
        component: () => import("@/views/Invoices/Detail/Detail.vue"),
        meta: {
            name: "Facture",
            auth: true,
        },
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    // Set page title
    document.title = `${to.meta.name} - InvoiceKit`;

    // Authentication redirection
    if (to.matched.some((record) => record.meta.auth)) {
        if (localStorage.getItem("token") === null) {
            next({
                path: "/authentication",
            });
        } else {
            // Set common token
            Axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("token")}`;

            next();
        }
    } else {
        if (
            localStorage.getItem("token") !== null &&
            to.matched.some((record) => record.meta.redirect)
        ) {
            next({
                path: "/dashboard",
            });
        }

        next();
    }
});

export default router;
