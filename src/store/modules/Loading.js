import { getField, updateField } from 'vuex-map-fields';

const state = {
  backgroundLoading: false,
  messageLoading: true,
};

const getters = {
  getField,
};

const actions = {
};

const mutations = {
  updateField,
  commitChangeLoading(state, val) {
    state.backgroundLoading = val
  },
  commitChangeMessageLoading(state, val) {
    state.messageLoading = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
