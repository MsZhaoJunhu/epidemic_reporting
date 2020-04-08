import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "@/api.js";
import vuescroll from "vuescroll"
import VueJsonp from 'vue-jsonp'
//import VConsole from 'vconsole';
//var vconsole = new VConsole();

import '@nutui/nutui/dist/nutui.css';
import NutUI from '@nutui/nutui';
NutUI.install(Vue);
// import {
//   Toast,
//   Popup,
//   Dialog,
//   ImagePicker,
//   Icon,
//   DatePicker,
//   Radio,
//   Picker,
//   Checkbox,
//   ActionSheet,
//   Button,
//   TextInput,
//   InfiniteLoading,
//   Steps
// } from "@nutui/nutui";

// Toast.install(Vue);
// Dialog.install(Vue);
// ImagePicker.install(Vue);
// Popup.install(Vue);
// Icon.install(Vue);
// DatePicker.install(Vue);
// Radio.install(Vue);
// Picker.install(Vue);
// Radio.install(Vue);
// Checkbox.install(Vue);
// ActionSheet.install(Vue);
// Button.install(Vue);
// TextInput.install(Vue);
// InfiniteLoading.install(Vue);
// Steps.install(Vue);
Vue.prototype.$api = api;
// Vue.prototype.$jsonp = VueJsonp;
Vue.use(VueJsonp)
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
