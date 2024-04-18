// fichier de mapping (route, composant)

import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import ReactiveValue from "../views/ReactiveValue.vue"
import PrimeurView from "../views/PrimeurView.vue"
import PaysView from "../views/PaysView.vue"
import AdresseView from "../views/AdresseView.vue"
import PersonneView from "../views/PersonneView.vue"
import CalculView from "../views/CalculView.vue"
import TableauView from "../views/TableauView.vue"
import PersonneDetails from "../views/PersonneDetails.vue"
import NotFound from "../views/NotFound.vue"
import CompteurView from "../views/CompteurView.vue";
import PanierView from "../views/PanierView.vue";


const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'home',
        alias: ['/accueil', '/home'],
        meta: { title: "Page d'accueil" }
    },
    {
        path: '/about',
        component: AboutView,
        name: 'about',
        meta: { title: "À propos" }
    },
    {
        path: '/reactive',
        component: ReactiveValue,
        name: 'reactive'
    },
    {
        path: '/primeur',
        component: PrimeurView,
        name: 'primeur'
    },
    {
        path: '/pays',
        component: PaysView,
        name: 'pays'
    },
    {
        path: '/adresse',
        component: AdresseView,
        name: 'adresse'
    },    {
        path: '/panier',
        component: PanierView,
        name: 'panier'
    },
    {
        path: '/compteur',
        component: CompteurView,
        name: 'compteur'
    },
    {
        path: '/personne',
        component: PersonneView,
        name: 'personne'
    },
    {
        path: '/person',
        redirect: '/personne'
    },
    {
        path: '/personne/:id',
        component: PersonneDetails,
        name: 'personne-details',
        props: true
    },
    {
        path: '/calcul/:op',
        component: CalculView,
        name: 'calcul',
        props: true
    },
    {
        path: '/tableau',
        redirect: { name: 'tableau', params: { id: 0 } }
    },
    {
        path: '/tableau/:id',
        component: TableauView,
        name: 'tableau',
        props: true
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


router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "Vite + Vue"
    next()
})


export default router