import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import axios from "axios";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('../components/Home.vue').default,
    },
    {
      path: '/signup',
      name: 'signup',
      component: require('../components/Signup.vue').default,
      meta: {guest: true},
    },
    {
      path: '/signin',
      name: 'signin',
      component: require('../components/Signin.vue').default,
      meta: {guest: true},
    },
    {
      path: '/events',
      name: 'events',
      component: require('../components/Events.vue').default,
      meta: {auth: true},
    },
  ],
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.auth.isAuthenticated;
    const token = store.state.auth.auth.access_token;
    if(loggedIn && token) {
      console.log(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if (to.matched.some((record) => record.meta.auth)) {
      if (loggedIn) {
        next();
        return;
      }
      next("/signin");
    } else {
      next();
    }

    if (to.matched.some((record) => record.meta.guest)) {
      if (loggedIn) {
        next("/");
        return;
      }
    } else {
      next();
    }

    next();
});

export default router;