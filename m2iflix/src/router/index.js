// fichier de mapping (route, composant)

import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/ConnexionView.vue"
import NotFound from "../views/NotFound.vue";
import InscriptionView from "../views/InscriptionView.vue";
import FilmsView from "../views/FilmsView.vue";
import ListeView from "../views/ListeView.vue";


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
        component: FilmsView,
        meta: { requiresAuth: true }
    },
    {
        path: '/liste',
        name: 'Liste',
        component: ListeView,
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
    const token = localStorage.getItem('token');
    if (!token) return false;
    // Vérifiez si le token est valide (par exemple, s'il a expiré)
    return true;
};

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "M2Iflix"
    if (to.meta.requiresAuth) {
        if (isAuthenticated()) {
            console.log("index.js isAuthenticated", isAuthenticated());
            return next();
        } else {
            console.log("index.js isAuthenticated", isAuthenticated());
            return next('/connexion');
        }
    } else {
        console.log("index.js meta", to.meta.requiresAuth)
        return next();
    }
});


export default router