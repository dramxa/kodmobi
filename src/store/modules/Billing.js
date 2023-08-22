import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import { useToast } from 'vue-toastification'
import { useCookies } from "vue3-cookies";

const toast = useToast()
const { cookies } = useCookies();

const state = {
  billing_data: [],
  billing_meta: null,
  session_id: null
};

const getters = {
  getField,
};

const actions = {
  async GET_BILLING({commit, state, rootState}, data) {
    let payload = {}

    if(data?.page === undefined) {
      payload = { "page": 1, ...data }
    } else {
      payload = data
    }
    payload.per_page = 10;

    commit('LoadingModule/commitChangeMessageLoading', true, { root: true })
    await axios.get(`/project/${data.project_id}/messages`, { params: { ...payload } })
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_BILLING')
        commit('commitGetBillingData', res.data.data)
        commit('commitGetBillingMeta', res.data.meta)
        console.log(res.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_BILLING')
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeMessageLoading', false, { root: true })
      })
  },
};

const mutations = {
  updateField,
  commitGetBillingData(state, data) {
    state.billing_data = data
  },
  commitGetBillingMeta(state, data) {
    state.billing_meta = data
  },
  commitAddSessionId(state, data) {
    state.session_id = data
  },
  commitNewMessage(state, data) {
    state.billing_data.unshift(data);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
