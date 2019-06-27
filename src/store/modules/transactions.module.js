// Hooray! Here comes YNAB!
import * as ynab from 'ynab';

// Import our config for YNAB


const state = {
  transactions: [],
}

const getters = {
  transactions: (state, getters, rootState) => {
    return state.transactions
  }
}


const mutations = {
  addTransactions(state, transactions) {
    state.transactions = transactions;
  }
}

const actions = {
  getTransactions({ commit, state, rootState }) {
    return rootState.ynab.api.transactions.getTransactions("default").then((res) => {
      var transactions = res.data.transactions.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      });
      commit('addTransactions', transactions);
      return transactions;
    }).catch((err) => {
      this.error = err.error.detail;
    }).finally(() => {
      this.loading = false;
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
