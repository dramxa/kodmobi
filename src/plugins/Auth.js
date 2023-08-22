import Vue from 'vue'
import axios from 'axios';
import router from '@/router'
import store from '@/store'
// import {notification, message} from 'ant-design-vue';

function Auth() {

  // Авторизация
  this.login = ({ email, password, redirect = '/all-projects' }) => {

    store.commit('AuthModule/commitToggleLoading', true)
    store.commit('AuthModule/commitSetErrors')

    const data = {
      email, password
    }
    axios.post('/auth/email/sign-in', data)
      .then((res) => {
        const {access_token, expires_in} = res.data.data

          // message.success('Успешно авторизовались!')

          Vue.$cookies.set('access_token', access_token, expires_in)
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
          store.commit('AuthModule/commitToggleLoading', false)

          router.push(redirect)


      }).catch((err) => {
        if (err.response.data.errors !== undefined) {
          store.commit('AuthModule/commitSetErrors', err.response.data.errors)
        }

        if (err.response.data.error !== undefined) {
          // notification.error({
          //   message: 'Ошибка сервера',
          //   description: err.response.data.error.message,
          // })
        }

        Vue.$cookies.remove('access_token')
        store.commit('AuthModule/commitToggleLoading', false)

      })


    store.commit('AuthModule/commitToggleLoading', false)

  };

  // Получение профиля
  // this.profile = () => {

  //   if (!this.check()) {
  //     return
  //   }

  //   axios.get('/admin/profile')
  //     .then((res) => {
  //       store.commit('AuthModule/commitSetprofile', res?.data?.data)
  //     }).catch((err) => {

  //       if (err?.response?.data?.error !== undefined) {
  //         // notification.error({
  //         //   message: 'Ошибка сервера',
  //         //   description: err.response.data.error.message,
  //         // })
  //       }

  //     })
  // };

  // Регистрация
  this.register = ({ email, password, password_confirmation, redirect = '/applications', afterRegister = true }) => {
    store.commit('AuthModule/commitToggleLoading', true)
    store.commit('AuthModule/commitSetErrors')

    const data = {
      email, password, password_confirmation
    }

    axios.post('/auth/sign-up', data)
      .then((res) => {
        const {access_token, expires_in} = res.data.data

          if (afterRegister) {

            message.success('Успешно авторизовались!')

            Vue.$cookies.set('access_token', access_token, expires_in)
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
            store.commit('AuthModule/commitToggleLoading', false)

            router.push(redirect)
          } else {

            // notification.success({
            //   message: 'Успешно зарегистрировались, теперь авторизуйтесь!',
            // })

            router.push('/auth/login')
          }

          store.commit('AuthModule/commitToggleLoading', false)

      }).catch((err) => {

        if (err.response.data.errors !== undefined) {
          store.commit('AuthModule/commitSetErrors', err.response.data.errors)
        }

        if (err.response.data.error !== undefined) {
          // notification.error({
          //   message: 'Ошибка сервера',
          //   description: err.response.data.error.message,
          // })
        }

        Vue.$cookies.remove('access_token')
        store.commit('AuthModule/commitToggleLoading', false)
      })


    store.commit('AuthModule/commitToggleLoading', false)

  };

  // Получить апи токен пользователя
  this.token = () => {
    return Vue.$cookies.get('access_token') || null;
  };

  // Проверить наличие токена
  this.check = () => {
    return !!Vue.$cookies.get('access_token');
  };

  // Выход
  this.logout = () => {
    Vue.$cookies.remove('access_token');
    axios.defaults.headers.common.Authorization = null
    router.push('/auth/login')
  };

}

const auth = new Auth();

export default {
  install(VueInstance) {
    VueInstance.prototype.$auth = auth;
  },
};
