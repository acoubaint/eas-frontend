import Vuex from 'vuex';
import Vue from 'vue';
import createPresistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import event from './modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, event,
  },
  plugins: [createPresistedState()],
});