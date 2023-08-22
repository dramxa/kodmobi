import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast()

const state = {
  payment_history: [],
  payment_meta: null,
};

const getters = {
  getField,
};

const actions = {
  async GET_BALANCE({commit, state}, page) {
    if(page === undefined) page = 1;

    const data = {
      params: {
        per_page: 10,
        page
      }
    }
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.get('/balance/operations', data)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_BALANCE')
        commit('commitGetBalanceData', res.data.data)
        commit('commitGetBalanceMeta', res.data.meta)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_BALANCE')
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async INCOME_BALANCE({commit, state, dispatch}, data) {
    // const data = {
    //   amount: amount
    // }
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.post('/balance/income', data)
      .then((res) => {
        // console.log(res.data, 'res.data.data INCOME_BALANCE')
        location.href = res.data.data.link
        dispatch('GET_BALANCE')
        dispatch('ProfileModule/GET_PROFILE', null, { root: true })
        // toast.success('Your payment was successful.')
      }).catch((e) => {
        // console.log(e.response, 'catch INCOME_BALANCE')
        toast.error('An error occurred, your payment failed.')
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
};

const mutations = {
  updateField,
  commitGetBalanceData(state, data) {
    data.forEach(el => {
      if(el.status === 'success')
        el.status = 'Completed'

      if(el.status === 'error')
        el.status = 'Failed'
      
      if(el.status === 'pending')
        el.status = 'Pending'

      if(el.status === 'refund')
        el.status = 'Refund'
    });
    state.payment_history = data
  },
  commitGetBalanceMeta(state, data) {
    state.payment_meta = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
