import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const state = {
  profile: null,
  id: null,
  name: '',
  surname: '',
  email: '',
  phone: '',
  new_password: {
    password: '',
    confirm_password: '',
  },
  balance: 0,
  settings: null,
  tariffPlanModalOpen: false,
};

const getters = {
  getField,
};

const actions = {
  async GET_PROFILE({commit, state}) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.get('/user/profile')
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_PROFILE')
        commit('commitGetProfileData', res.data.data)
        // toast.success('Successfully logged in')
      }).catch((e) => {
        // console.log(e.response, 'catch GET_PROFILE')
        // toast.error(e.response.data.error.message || 'Incorrect email or password')
        router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async GET_TARIFF_PLANS({commit, state}) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.get('/tariff-plan')
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_PROFILE')
        return res.data.data
        // toast.success('Successfully logged in')
      }).catch((e) => {
        // console.log(e.response, 'catch GET_PROFILE')
        // toast.error(e.response.data.error.message || 'Incorrect email or password')
        router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async UPGRADE_TARIF_PLAN({commit, dispatch}, id) {
    const data = {
      plan_id: id,
    }
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/tariff-plan/upgrade`, data)
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_PROVIDER')
        response = res.data;
        // commit('commitAttachChannel', { channel: channel, attach: res.data.data.attach });
        // dispatch('GET_CHANNELS')
      }).catch((e) => {
        // console.log(e.response, 'catch TOGGLE_PROVIDER')
        // router.push('/auth/signin')
        if(e.response) {
          response = e.response.data
        }
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async EXTENSION_TARIF_PLAN({commit, dispatch}) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post('/tariff-plan/extension')
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_PROVIDER')
        response = res.data;
        // commit('commitAttachChannel', { channel: channel, attach: res.data.data.attach });
        // dispatch('GET_CHANNELS')
      }).catch((e) => {
        // console.log(e.response, 'catch TOGGLE_PROVIDER')
        // router.push('/auth/signin')
        if(e.response) {
          response = e.response.data
        }
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async UPDATE_PROFILE({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.patch(`/user/update-profile/`, data)
      .then((res) => {
        response = res.data;
        // console.log(res.data, 'res.data.data UPDATE_PROFILE')
        commit('commitGetProfileData', res.data.data)
        toast.success('Profile data updated')
      }).catch((e) => {
        // console.log(e.response, 'catch UPDATE_PROFILE')
        if(e.response) {
          response = e.response.data
        }
        toast.error(e.response.data.error)
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async UPDATE_PASSWORD({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.post(`/user/${state.id}`, data)
      .then((res) => {
        // console.log(res.data, 'res.data.data UPDATE_PASSWORD')
        // commit('commitGetProfileData', res.data.data)
        toast.success('Password updated successfully')
      }).catch((e) => {
        // console.log(e.response, 'catch UPDATE_PASSWORD')
        toast.error(e.response.data.error)
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
};

const mutations = {
  updateField,
  commitGetProfileData(state, data) {
    state.profile = data;
    state.id = data.id;
    state.name = data.name;
    state.surname = data.surname;
    state.email = data.email;
    state.phone = data.phone;
    state.balance = data.balance;
    state.settings = data.settings;
  },
  commitClearProfileData(state) {
    state.id = null;
    state.name = '';
    state.surname = '';
    state.email = '';
    state.balance = 0;
    state.settings = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
