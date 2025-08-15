import { createStore } from 'vuex'
import userModule from './user';
import pkModule from './pk';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:userModule,
    pk:pkModule,
  }
})
