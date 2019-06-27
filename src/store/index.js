import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import transactionsModule from "./modules/transactions.module";

// Import our config for YNAB
import config from "../config.json";

export default new Vuex.Store({
  strict: true,
  state: {
    ynab: {
      clientId: config.clientId,
      redirectUri: config.redirectUri,
      token: null,
      api: null
    },
    budgetId: null
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setBudgetId(state, budgetId) {
      state.budgetId = budgetId
    },
    setYnabToken(state, token) {
      state.ynab.token = token;
    },
    setApi(state, api) {
      state.ynab.api = api;
    }
  },
  actions: {
    findYNABToken({ commit, state }) {
      let token = null;
      if (state.ynabToken != null) {
        return state.ynab.token;
      }
      const search = window.location.hash.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
      if (search && search !== '') {
        // Try to get access_token from the hash returned by OAuth
        const params = JSON.parse('{"' + search + '"}', function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        });
        token = params.access_token;
        sessionStorage.setItem('ynab_access_token', token);
        window.location.hash = '';
      } else {
        // Otherwise try sessionStorage
        token = sessionStorage.getItem('ynab_access_token');
      }
      commit('setYnabToken', token)
      return token;
    },
    getBudgets({ commit, state }) {
      return state.ynab.api.budgets
        .getBudgets()
    }

  },
  getters: {
    budgetId: (state) => {
      return state.budgetId
    }
  },
  modules: {
    transactionsModule
  }
})