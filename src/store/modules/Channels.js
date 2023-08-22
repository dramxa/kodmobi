import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast()

const state = {
  channels: [],
  channelsProviders: [],
};

const getters = {
  getField,
};

const actions = {
  async GET_CHANNELS({commit, state}, active_project_id) {
    commit('LoadingModule/commitChangeLoading', true, { root: true });
    let response;
    await axios.get(`project/${active_project_id}/channel`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNELS')
        commit('commitGetChannelsData', res.data.data);
        response = res.data.data;
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNELS')
        // router.push('/auth/signin')
        response = e.response.data;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async GET_CHANNEL({commit, state}, data) {
    const {projectId, channelId} = data
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/project/${projectId}/channel/${channelId}`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL');
        response = res.data.data;
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL')
        response = e.response.data;
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
      return response;
  },
  async TOGGLE_CHANNEL({commit, dispatch}, data) {
    const {channel, active_project_id} = data
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.put(`/project/${active_project_id}/channel/${channel.id}`)
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_CHANNEL')
        commit('commitAttachChannel', { channel: channel, attach: res.data.data.is_active });
        // dispatch('GET_CHANNELS')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch TOGGLE_CHANNEL')
        // router.push('/auth/signin')
        response = e.response.data;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async SET_PRIORITY_CHANNEL({commit, dispatch}, data) {
    const {channel, active_project_id} = data
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.put(`/project/${active_project_id}/channel/${channel.id}/priority`)
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_CHANNEL')
        // commit('commitAttachChannel', { channel: channel, attach: res.data.data.attach });
        // dispatch('GET_CHANNELS')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch TOGGLE_CHANNEL')
        // router.push('/auth/signin')
        response = e.response.data;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async SET_PRIORITY_PROVIDER({commit, dispatch}, data) {
    const {projectId, channelId, providerId} = data
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.put(`/project/${projectId}/channel/${channelId}/provider/${providerId}/priority`)
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_CHANNEL')
        // commit('commitAttachChannel', { channel: channel, attach: res.data.data.attach });
        // dispatch('GET_CHANNELS')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch TOGGLE_CHANNEL')
        // router.push('/auth/signin')
        response = e.response.data;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async TOGGLE_PROVIDER({commit, dispatch}, data) {
    const {provider_id, channel_id, active_project_id} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.put(`/project/${active_project_id}/channel/${channel_id}/provider/${provider_id}/toggle`)
      .then((res) => {
        // console.log(res.data, 'res.data.data TOGGLE_PROVIDER')
        response = res.data;
        commit('commitAttachChannel', { channel: channel, attach: res.data.data.is_active });
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
  async SORT_CHANNEL({commit, dispatch}, data) {
    const {active_project_id, channels} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.put(`/project/${active_project_id}/channel/sorting`, {channels})
      .then((res) => {
        // console.log(res.data, 'res.data.data SORT_CHANNEL')
        response = res.data;
        // commit('commitAttachChannel', { channel: channel, attach: res.data.data.attach });
        // dispatch('GET_CHANNELS')
      }).catch((e) => {
        // console.log(e.response, 'catch SORT_CHANNEL')
        // router.push('/auth/signin')
        if(e.response) {
          response = e.response.data
        }
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async GET_CUSTOM_AVAILABLE_PROVIDERS({commit, state}, data) {
    const {projectId, channelId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/project/${projectId}/channel/${channelId}/custom-available-providers`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL_PROVIDERS')
        response = res.data;
        // commit('commitGetChannelsProvidersData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL_PROVIDERS')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async GET_CHANNEL_PROVIDERS({commit, state}, data) {
    const {projectId, channelId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    return await axios.get(`/project/${projectId}/channel/${channelId}/provider`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL_PROVIDERS')
        return res.data.data;
        // commit('commitGetChannelsProvidersData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL_PROVIDERS')
        return e.response;
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async GET_CHANNEL_PROVIDER({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    return await axios.get(`/project/${projectId}/channel/${channelId}/provider/${providerId}`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL_PROVIDER')
        return res.data.data;
        // commit('commitGetChannelsData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL_PROVIDER')
        return e.response;
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async UPDATE_CHANNEL_PROVIDER({commit, state}, data) {
    const {provider_id, channel_id, active_project_id, providerData} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${active_project_id}/channel/${channel_id}/provider/${provider_id}`, providerData)
      .then((res) => {
        // console.log(res.data, 'res.data.data UPDATE_CHANNEL_PROVIDER')
        response = res.data;
        // commit('commitGetChannelsData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch UPDATE_CHANNEL_PROVIDER')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async NEW_CHANNEL_PROVIDER({commit, state}, data) {
    const {channel_id, active_project_id, providerData} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${active_project_id}/channel/${channel_id}/provider/new-provider`, providerData)
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
  async ADD_NEW_PROVIDER({commit, dispatch}, data) {
    const {provider_id, channel_id, project_id, providerData} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${project_id}/channel/${channel_id}/provider/${provider_id}/add`, providerData)
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
  async GET_QR({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/project/${projectId}/channel/${channelId}/provider/${providerId}/qr`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL_PROVIDERS')
        response = res.data;
        // commit('commitGetChannelsProvidersData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL_PROVIDERS')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async GET_PROVIDER_STATUS({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/project/${projectId}/channel/${channelId}/provider/${providerId}/status`)
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_CHANNEL_PROVIDERS')
        response = res.data;
        // commit('commitGetChannelsProvidersData', res.data.data)
      }).catch((e) => {
        // console.log(e.response, 'catch GET_CHANNEL_PROVIDERS')
        if(e.response) {
          response = e.response.data
        }
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async SAVE_PROVIDER_SETTINGS({commit, state}, data) {
    const {projectId, channelId, providerId, providerData} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.patch(`/project/${projectId}/channel/${channelId}/provider/${providerId}/setting`, providerData)
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
  async DELETE_PROVIDER_SETTINGS({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.delete(`/project/${projectId}/channel/${channelId}/provider/${providerId}/delete`)
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
  async PROVIDER_LOGOUT({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${projectId}/channel/${channelId}/provider/${providerId}/logout`)
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
  async PROVIDER_RESTART({commit, state}, data) {
    const {projectId, channelId, providerId} = data;
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${projectId}/channel/${channelId}/provider/${providerId}/restart`)
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
};

const mutations = {
  updateField,
  commitGetChannelsData(state, data) {
    // const idx = null
    // data.forEach((el, index) => {
    //   if(el.name === 'Telegram') {
    //     idx = index
    //   }
    // })
    state.channels = data
  },
  commitGetChannelsProvidersData(state, data) {
    state.channelsProviders = data
  },
  commitChangeStatus(state, val) {
    state.channels.find((item) => {
      if(item.id === val) {
        item.status = !item.status
      }
    })
  },
  addAttachChannel(state, data){
    const {channel , result } = data
    state.channels.forEach(el => {
      if(el.id === channel.id) {
        el.attach = result
      }
      // el.attach = el.id === channel.id ? true : false
    })
  },
  commitAttachChannel(state, data) {
    const { channel, attach } = data
    console.log(data, attach)
    // state.channels.forEach(el => {
    //   if(el.id === channel.id) {
    //     el.is_active = is_active
    //   }
    // })
    const text = attach ? 'activated' : 'deactivated'
    toast.success(`${channel.name} ${text}`)
  },
  commitAddAttach(state, project) {
    state.channels.forEach(el => {
      el.attach = false
    })
    if(project.channels.length !== 0) {
      project.channels.forEach(item => {
        const channel = state.channels.find(el => {
          return el.id === item.id
        })
        channel.attach = true
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
