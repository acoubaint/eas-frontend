import axios from 'axios';

const state = {
  isAuthenticated: false,
  auth: {},
  user: {},
};
const getters = {

};
const actions = {
  async registration({dispatch}, data) {
    return await axios.post(`/api/registration`, data);
  },
  async logIn({dispatch, commit}, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post('/api/login', data);
        commit('setAuth', res.data);
        dispatch('getUser', res.data);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getUser({commit, state}) {
    return new Promise(async (resolve, reject) => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.auth.access_token}`;
        const res = await axios.get('/api/profile');
        commit('setUser', res.data);
        resolve(res.data);
      } catch (error) {
        if (typeof error.response == 'undefined') {
          
        }else{
          console.log(error.response);
        }
        reject(error);
      }
    });
  },
  async logOut({commit}, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete('/api/logout');
        commit('destroyAuth');
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }
};
const mutations = {
  setAuth(state, data) {
    state.auth = data;
    state.isAuthenticated = true;
  },
  setUser(state, data){
    state.user = data;
  },
  destroyAuth(state) {
    state.auth = state.user = {};
    state.isAuthenticated = false;
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
}