import { createApp } from 'vue'
// import Vue from 'Vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueClipboard from 'vue3-clipboard'
import Paginate from "vuejs-paginate-next";

import Toast from "vue-toastification";
import './plugins/echo'

// import { globalCookiesConfig } from "vue3-cookies";
import VueCookies from 'vue3-cookies'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

// globalCookiesConfig({
//   expireTimes: "30d",
//   // path: "/",
//   // domain: "",
//   // secure: true,
//   // sameSite: "None",
// });


import "vue-toastification/dist/index.css";
import '@/css/style.scss'

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  hideProgressBar: true,
  position: "bottom-right",
  timeout: 3000,
  // closeOnClick: true,
  // pauseOnFocusLoss: true,
  // pauseOnHover: true,
  // draggable: true,
  // draggablePercent: 0.6,
  // showCloseButtonOnHover: false,
  // hideProgressBar: false,
  // closeButton: "button",
  // icon: true,
  // rtl: false
};

axios.defaults.baseURL = process.env.VUE_APP_API || 'https://api.kod.mobi/v1';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

if(cookies.isKey('access_token')) {
  const token = cookies.get('access_token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Toast, options);
app.use(VueAxios, axios)
app.use(VueCookies)
app.use(VueClipboard)
app.use(Paginate)


app.mount('#app')

// .use(store).use(router).mount('#app')
