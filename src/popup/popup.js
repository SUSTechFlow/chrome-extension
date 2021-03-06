import Vue from 'vue';
import App from './App';
import store from '../store';
import router from '../router';
import vuetify from '../plugins/vuetify';
import '../styles/main.sass';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  vuetify,
  router,
  render: h => h(App),
});
