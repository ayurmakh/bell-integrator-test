import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';
import History from '@/views/History.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/history/:mode',
      name: 'historyWithMode',
      component: History,
    },
  ],
});
