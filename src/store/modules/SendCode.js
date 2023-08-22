import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import { useToast } from 'vue-toastification'
import { useCookies } from "vue3-cookies";

const toast = useToast()
const { cookies } = useCookies();

const state = {
  session_id: null
};

const getters = {
  getField,
};

const actions = {
  async SEND_TEST_MESSAGE({commit, state}, data) {
    const payload = {
      type: data.type,
      phone: data.phone
    }
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    if(data.session_id) {
      payload.session_id = data.session_id
      await axios.get('/message/send', {headers: { 'x-api-key': data.api_token }, params: payload})
        .then((res) => {
          // cookies.remove('message_token')
          // cookies.set('message_token', res.data.data.session_id, 180)
          // console.log(res.data, 'res.data.data SEND_TEST_MESSAGE')
          if(data.type === 'telegram') {
            const telegram = res.data.data.client_channels.find(el => el.type === data.type)
            if(telegram.status !== 'inactive') {
              // toast.success('The message was sent successfully')
            }
          } else {
            // toast.success('The message was sent successfully')
          }
          response = res.data;
        }).catch((e) => {
          toast.error('The message didn’t send, please try again')
          // console.log(e.response, 'catch SEND_TEST_MESSAGE')
          response = e.response;
        }).finally(() => {
          commit('LoadingModule/commitChangeLoading', false, { root: true })
        });
      return response;
    } else {
      await axios.get('/message/create', {headers: { 'x-api-key': data.api_token }, params: payload})
        .then((res) => {
          cookies.set('message_token', res.data.data.session_id, 180)
          commit('commitAddSessionId', res.data.data.session_id)
          // console.log(res.data, 'res.data.data SEND_TEST_MESSAGE')
          if(data.type === 'telegram') {
            const telegram = res.data.data.client_channels.find(el => el.type === data.type)
            if(telegram.status !== 'inactive') {
              // toast.success('The message was sent successfully')
            }
          } else {
            // toast.success('The message was sent successfully')
          }
          response = res.data;
        }).catch((e) => {
          toast.error('The message didn’t send, please try again')
          // console.log(e.response, 'catch SEND_TEST_MESSAGE')
          response = e.response;
        }).finally(() => {
          commit('LoadingModule/commitChangeLoading', false, { root: true })
        })
      return response;
    }
  },
  async CREATE_CODE({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    const url = data.type ? `/message/create?phone=${data.phone}&type=${data.type}&send=${data.send}&is_test=true` : `/message/create?phone=${data.phone}&send=${data.send}&is_test=true`
    await axios.get(url, { headers: { 'x-api-key': data.api_token }})
      .then((res) => {
        // console.log(res.data, 'res.data.data CREATE_CODE')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch CREATE_CODE')
        response = e.response.data;
        toast.error(e.response.data.error)
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async SEND_CODE({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/message/send?session_id=${data.session_id}&type=${data.type}&is_test=true`, { headers: { 'x-api-key': data.api_token }})
      .then((res) => {
        // console.log(res.data, 'res.data.data SEND_CODE')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch SEND_CODE')
        response = e.response.data;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async CHECK_CODE({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/message/check?session_id=${data.session_id}&code=${data.code}`, {headers: { 'x-api-key': data.api_token }})
      .then((res) => {
        // console.log(res.data, 'res.data.data CHECK_CODE')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch CHECK_CODE')
        response = e.response;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
  async CHECK_CHANNEL({commit, state}, data) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.get(`/message/check-channel?session_id=${data.session_id}&type=${data.type}`, {headers: { 'x-api-key': data.api_token }})
      .then((res) => {
        // console.log(res.data, 'res.data.data CHECK_CHANNEL')
        response = res.data;
      }).catch((e) => {
        // console.log(e.response, 'catch CHECK_CHANNEL')
        response = e.response;
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      });
    return response;
  },
};

const mutations = {
  updateField,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
