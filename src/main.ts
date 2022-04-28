import { createApp } from 'vue';
import App from './App.vue';
import lispress from 'lispress';
import router from './router';

lispress.config({
  username: 'lisnote',
  clientID: 'de3105a8fb15edf7ca19',
  clientSecret: '715c4a9cfe522069f914ff3f839119e6c4ae73a8',
});

createApp(App).use(router).mount('#app');
