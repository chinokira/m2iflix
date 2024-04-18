// fichier de mapping (route, composant)

import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/Connexion.vue"
import NotFound from "../views/NotFound.vue";
import InscriptionView from "../views/InscriptionView.vue";
import FilmsComponent from "../views/FilmsComponent.vue";


const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'home',
        alias: ['/connexion', '/home', '/accueil'],
        meta: { title: "Page d'accueil" }
    },
    {
        path: '/inscriptions',
        component: InscriptionView,
        name: 'inscriptions',
        alias: ['/enregistrement', '/inscription'],
        meta: { title: "inscriptions" }
    },
    {
        path: '/films',
        name: 'Films',
        component: FilmsComponent,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'lien-actif'
})

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
};

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (isAuthenticated()) {
            console.log("is", isAuthenticated());
            next();
        } else {
            console.log("is not", isAuthenticated());
            return next('/connexion');
        }
    } else {
        console.log("meta", to.meta.requiresAuth)
        next();
    }

    document.title = to.meta.title || "M2Iflix"
    next()
});


export default router