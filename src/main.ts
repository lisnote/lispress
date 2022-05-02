import { createApp } from 'vue';
import App from './App.vue';
import lispress from 'lispress';
import router from './router';

lispress.config(window.lisconfig);

let app = createApp(App);
app.use(router);
app.mount('#app');
