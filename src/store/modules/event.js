import axios from 'axios';

const state = {
  datas: [],
};
const getters = {

};
const actions = {
  async getEvents({commit}) {
    try {
      const res = await axios.get('api/events');
      commit('setData', res.data.data);
    } catch (error) {
      if (typeof error.response == 'undefined') {
        
      }else{
      }
    }
  },
  async attendEvent({dispatch}, event_id) {
    try {
      const res = await axios.post(`api/events/${event_id}/attend`);
      dispatch('getEvents');
    } catch (error) {
      if (typeof error.response == 'undefined') {
        
      }else{
      }
    }
  },
};
const mutations = {
  setData(state, data) {
    state.datas = data;
  },
  resetData(state) {
    state.datas = [];
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
}