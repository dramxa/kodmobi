import Echo from 'laravel-echo'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
window.Pusher = require('pusher-js')


const token = cookies.get('access_token');
// console.log(token)

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "e5146ffff7f8c31546ef",
  cluster: "eu",
  forceTLS: true,
  encrypted: false,
  authEndpoint: 'https://api.kod.mobi/v1/broadcasting/auth',
  auth: {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
})