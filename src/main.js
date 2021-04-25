import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//countdown component
import VueCountdown from '@chenfengyuan/vue-countdown';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

//simple global css
import '../src/assets/style.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

//make coundown available
Vue.component('vue-countdown', VueCountdown);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
