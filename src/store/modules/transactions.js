// Hooray! Here comes YNAB!
import * as ynab from 'ynab';

// Import our config for YNAB
import config from './config.json';

const state = {
      transactions:[]
  }

  const getters = {
    transactions:(state,getters,rootState) =>{
      return state.transactions
    }
  }

  const actions = {
    getTransactions({commit,state},budgetId){
      this.api.transactions.getTransactions(budgetId).then((res) => {
        var transactions = res.data.transactions.sort((a,b)=>{
          return new Date(b.date) - new Date(a.date)
        });
        commit('addTransactions',transactions)
      }).catch((err) => {
        this.error = err.error.detail;
      }).finally(() => {
        this.loading = false;
      });
    }
    }

    const mutations = {
      addTransactions(state,{transactions})
    }

    export default {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
    }
  