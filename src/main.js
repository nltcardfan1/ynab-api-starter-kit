import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import store from './store';

Vue.use(Vuex)
// Create our Vue App and replace the <div id="app"></div> with it
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
