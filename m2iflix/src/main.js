import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {configure} from "vee-validate";
import {createPinia} from "pinia";

const app = createApp(App)

// configuer la validation
configure({
    validateOnInput: true,
    validateOnBlur: true,
    validateOnChange: true
})

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const pinia = createPinia()
app.config.globalProperties.BASE_URL = 'http://localhost:8000';
app.config.globalProperties.isAuthenticated = isAuthenticated;
app
    .use(router)
    .use(pinia)
    .mount('#app')
