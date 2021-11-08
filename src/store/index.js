import Vue from "vue";
import Vuex from "vuex";
import user from "./Users";
import product from "./Products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    product,
  },
});
