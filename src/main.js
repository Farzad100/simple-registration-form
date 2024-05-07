import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      userData: null,
    };
  },
  mutations: {
    addUserData(state, payload) {
      state.userData = payload;
    },
  },
});

const app = createApp(App);

app.use(store);

app.use(router);

app.mount('#app');
