import Vue from 'vue';
import BootsrapVue from 'bootstrap-vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootsrapVue);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
