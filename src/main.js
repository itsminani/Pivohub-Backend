import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@/assets/variable.sass";
import store from "./store";
import "animate.css";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Vue.config.productionTip = false;
Vue.use(Buefy);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
