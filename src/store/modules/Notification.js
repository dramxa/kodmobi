import { getField, updateField } from 'vuex-map-fields';

const defaultNotification = {
  showNotification: false,
  typeNotification: '',
  textNotification: ''
}

const state = {
  showNotification: false,
  typeNotification: '',
  textNotification: ''
};

const getters = {
  getField,
};

const actions = {
  SHOW_NOTIFICATION({commit}, {type, text}) {
    const data = {
      showNotification: true,
      typeNotification: type,
      textNotification: text
    }
    commit('commitShowNotification', data)
    setTimeout(() => {
      const data = defaultNotification
      commit('commitHideNotification', data)
    }, 5000)
  }
};

const mutations = {
  updateField,
  commitShowNotification(state, data) {
    // state = {...data};
    state.showNotification = data.showNotification
    state.typeNotification = data.typeNotification
    state.textNotification = data.textNotification
  },
  commitHideNotification(state, data) {
    state.showNotification = data.showNotification
    // setTimeout(() => {
      state.typeNotification = data.typeNotification
      state.textNotification = data.textNotification
    // }, 500)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
