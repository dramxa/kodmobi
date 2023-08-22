import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import router from '@/router'
import { useCookies } from "vue3-cookies";
import { useToast } from 'vue-toastification'

const toast = useToast()
const { cookies } = useCookies();

const state = {
  login: {
    email: '',
    password: '',
    error: ''
  },
  register: {
    email: '',
    password: '',
    password_confirmation: '',
    successfully: false,
  },
  reset: {
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
    successModalOpen: false,
  },
};

const getters = {
  getField,
};

const actions = {
  async SIGN_IN_PHONE({commit, state}, phone) {
    const data = {
      phone,
      send: true,
    };
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('auth/phone/sign-in', data)
      .then((res) => {
        // console.log(res.data, 'res.data.data NEW_CHANNEL_PROVIDER')
        response = res.data;
        // commit('commitGetChannelsData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch NEW_CHANNEL_PROVIDER')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async SEND_CODE({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('/auth/phone/send-code', data)
      .then((res) => {
        // console.log(res.data, 'res.data.data NEW_CHANNEL_PROVIDER')
        response = res.data;
        // commit('commitGetChannelsData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch NEW_CHANNEL_PROVIDER')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async CHECK_CODE({commit, dispatch, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('/auth/phone/check-code', data)
      .then((res) => {
        const {access_token, expires_in} = res.data.data

        // toast.success('Successfully logged in')

        cookies.set('access_token', access_token, expires_in)
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        dispatch('ProfileModule/GET_PROFILE', null, { root: true })
        dispatch('ProjectsModule/GET_PROJECTS', null, { root: true })
        dispatch('ProjectsModule/GET_PROJECT', 'first', { root: true })

        router.push('/messages')

        response = res.data;
      }).catch((e) => {
        cookies.remove('access_token')
        if(e.response) {
          response = e.response.data
        }
        toast.error(e.response.data.error)
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async CHECK_CHANNEL({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('/auth/phone/check-channel', data)
      .then((res) => {
        response = res.data;
      }).catch((e) => {
        if(e.response) {
          response = e.response.data
        }
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async SIGN_IN({state, commit, dispatch}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    commit('commitSetErrors')
    commit('commitErrorMessage', '')

    await axios.post('/auth/email/sign-in', data)
      .then((res) => {
        const {access_token, expires_in} = res.data.data

          // toast.success('Successfully logged in')

          cookies.set('access_token', access_token, expires_in)
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

          dispatch('ProfileModule/GET_PROFILE', null, { root: true })
          dispatch('ProjectsModule/GET_PROJECTS', null, { root: true })
          dispatch('ProjectsModule/GET_PROJECT', 'first', { root: true })

          router.push('/messages')



      }).catch((e) => {
        commit('commitErrorMessage', 'Incorrect Email or password')
        toast.error(e.response.data.error.message || 'Incorrect email or password')
        cookies.remove('access_token')

      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })

  },
  async SIGN_UP({commit, dispatch}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    commit('commitSetErrors')

    await axios.post('/auth/email/sign-up', data)
      .then((res) => {
        const {access_token, expires_in} = res.data.data

          // if (data.afterRegister) {
            // toast.success('Successfully registered')
            // toast.success('Successfully registered, now log in!')
            cookies.set('access_token', access_token, expires_in)
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`

            commit('commitChangeSuccessfully', true)

            dispatch('ProfileModule/GET_PROFILE', null, { root: true })
            // })
            // localStorage.removeItem("activeproject")

            commit('ProjectsModule/commitClearProjects', null, { root: true })
            commit('ProjectsModule/commitClearActiveProject', null, { root: true })
            router.push('/messages')
          // } else {

          //   // notification.success({
          //   //   message: 'Успешно зарегистрировались, теперь авторизуйтесь!',
          //   // })

          //   router.push('/auth/login')
          // }

      }).catch((e) => {
        console.log(e.response)
        toast.error(e.response.data.error)
        toast.error(e.response.data.errors.email[0] || e.response.data.errors.name[0] || 'Registration error')
        cookies.remove('access_token')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async SIGN_UP_PHONE({commit, state}, phone) {
    const data = {
      phone,
      send: true,
    };
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('auth/phone/sign-up', data)
      .then((res) => {
        // console.log(res.data, 'res.data.data NEW_CHANNEL_PROVIDER')
        response = res.data;
        // commit('commitGetChannelsData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch NEW_CHANNEL_PROVIDER')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  LOGOUT({commit}) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    cookies.remove('access_token')
    // localStorage.removeItem("activeproject")
    axios.defaults.headers.common.Authorization = null
    // toast.success('Successfully')
    commit('LoadingModule/commitChangeLoading', false, { root: true })
    commit('ProfileModule/commitClearProfileData', null, { root: true })
    commit('BillingModule/commitGetBillingData', [], { root: true })
    commit('BillingModule/commitGetBillingMeta', null, { root: true })
    router.push('/auth/signin')
  },
  async RESET_LINK({state, commit}, email) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    commit('commitCloseResetModal')
    await axios.post('/auth/email/forgot', email)
    .then((res) => {
      // commit('commitOpenResetModal')

      toast.success(`${res.data.data.message}`)
    }).catch((e) => {
      toast.error(e.response.data.errors.email[0] || 'Пользователь с таким Email не найден')
    }).finally(() => {
      commit('LoadingModule/commitChangeLoading', false, { root: true })
    });
  },
  async CHECK_HASH({state, commit}, hash) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response
    await axios.post('/auth/email/check-reset-password-hash', hash)
    .then((res) => {
      response = res.data;
    }).catch((e) => {
      if(e.response) {
        response = e.response.data
      }
    }).finally(() => {
      commit('LoadingModule/commitChangeLoading', false, { root: true })
    });
    return response;
  },
  async RESET_PASSWORD({state, commit}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('/auth/email/reset-password-by-hash', data)
    .then((res) => {
      // commit('commitOpenResetModal')
      response = res.data;
      // toast.success(`${res.data.data}`)
    }).catch((e) => {
      response = e.response.data
    }).finally(() => {
      commit('LoadingModule/commitChangeLoading', false, { root: true })
    });
    return response;
  }
};

const mutations = {
  updateField,
  commitErrorMessage(state, val) {
    state.login.error = val
  },
  commitSetErrors(state, data = {}) {
    state.errors = data
  },
  // commitSetprofile(state, data) {
  //   state.profile = data
  // },
  commitSetReset(state, data) {
    state.reset = {
      email: data.email || state.reset.email,
      token: data.token || state.reset.token,
      password: data.password || state.reset.password,
      password_confirmation: data.password_confirmation || state.reset.password_confirmation,
    }
  },
  commitClearReset(state) {
    state.reset = {
      email: '',
      token: '',
      password: '',
      password_confirmation: '',
      // disable_btn: false,
      successModalOpen: false,
    }
  },
  commitOpenResetModal(state) {
    state.reset.successModalOpen = true
  },
  commitCloseResetModal(state) {
    state.reset.successModalOpen = false
  },
  commitChangeSuccessfully(state, val) {
    state.register.successfully = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
