import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast()

const state = {
  all_projects: {
    projects: [],
  },
  new_project: {
    id: null,
    name: '',
    attached: false,
  },
  active_project: {
    project: null,
  },
  modals: {
    addProjectModal: {
      show: false
    },
    reissueModal: {
      show: false
    },
    deleteProjectModal: {
      show: false,
    },
  }
};

const getters = {
  getField,
};

const actions = {
  async GET_PROJECTS({commit, dispatch, state}) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.get('/project')
      .then((res) => {
        // console.log(res.data, 'res.data.data GET_PROJECTS')
        commit('commitGetProjectsData', res.data.data)
        // if(res.data.data.length === 1) {
          // commit('commitShowActiveProject', res.data.data[0])
        // if(localStorage.getItem('activeproject')) {
        //   dispatch('GET_PROJECT', localStorage.getItem('activeproject'))
        // } else {
          dispatch('GET_PROJECT', 'first')
        // }
        // }
      }).catch((e) => {
        // console.log(e.response, 'catch GET_PROJECTS')
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async GET_PROJECT({commit, state}, id) {
    if(state.all_projects.projects.length) {
      if(id === 'first') {
        id = state.all_projects.projects[0].id
      }
      commit('LoadingModule/commitChangeLoading', true, { root: true })
      await axios.get(`/project/${id}`)
        .then((res) => {
          // console.log(res.data, 'res.data.data GET_PROJECT')
          // commit('commitGetProjectsData', res.data.data)
          // if(res.data.data.length === 1) {
          commit('commitChangeActiveProject', res.data.data)
          commit('commitShowActiveProject', res.data.data)
          // setTimeout(() => {
          commit('ChannelsModule/commitAddAttach', res.data.data, { root: true })
          // }, 0)
          // }
        }).catch((e) => {
          // console.log(e.response, 'catch GET_PROJECT')
          // router.push('/auth/signin')
        }).finally(() => {
          commit('LoadingModule/commitChangeLoading', false, { root: true })
        })
    }
  },
  async ADD_PROJECT({commit, state}, name) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.post(`/project`, {name})
      .then((res) => {
        // console.log(res.data, 'res.data.data ADD_PROJECT')
        commit('commitAddNewProject', res.data.data)
        commit('commitChangeActiveProject', res.data.data)
        commit('commitToggleAddProjectModal', false)
        toast.success('Project added successfully')
      }).catch((e) => {
        // console.log(e.response, 'catch ADD_PROJECT')
        toast.error(e.response.data.errors.name[0])
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async DELETE_PROJECT({commit, state}, id) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.delete(`/project/${id}`)
      .then((res) => {
        // console.log(res.data, 'res.data.data DELETE_PROJECT')
        commit('commitDeleteProject', res.data.data)
        commit('commitChangeActiveProject', state.all_projects.projects[0])
        commit('commitToggleDeleteProjectModal', false)
        toast.success('Project deleted successfully')
      }).catch((e) => {
        // console.log(e.response, 'catch DELETE_PROJECT')
        toast.error(e.response.data.errors.name[0])
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async UPDATE_API_TOKEN({commit, state}, id) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.post(`/project/${id}/token/api-key`)
      .then((res) => {
        // console.log(res.data, 'res.data.data UPDATE_API_TOKEN')
        commit('commitUpdateApiToken', res.data.data)
        commit('commitToggleReissueModal', false)
        // toast.success('API key updated successfully')
      }).catch((e) => {
        // console.log(e.response, 'catch UPDATE_API_TOKEN')
        toast.error(e.response.data.error)
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  async UPDATE_SECRET_TOKEN({commit, state}, id) {
    commit('LoadingModule/commitChangeLoading', true, { root: true })
    let response;
    await axios.post(`/project/${id}/token/secret`)
      .then((res) => {
        response = res.data;
        commit('commitUpdateSecretToken', res.data.data)
        // commit('commitToggleReissueModal', false)
        // toast.success('API key updated successfully')
      }).catch((e) => {
        if(e.response) {
          response = e.response.data
        }
        toast.error(e.response.data.error)
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
    return response;
  },
  async UPDATE_NAME_PROJECT({commit, state}, data) {
    const {id, name} = data

    commit('LoadingModule/commitChangeLoading', true, { root: true })
    await axios.put(`/project/${id}/update`, {name})
      .then((res) => {
        // console.log(res.data, 'res.data.data UPDATE_NAME_PROJECT')
        commit('commitUpdateProjectName', res.data.data.name)
        // toast.success('Project name updated successfully')
      }).catch((e) => {
        // console.log(e.response, 'catch UPDATE_NAME_PROJECT')
        toast.error(e.response.data.errors.name[0])
        // router.push('/auth/signin')
      }).finally(() => {
        commit('LoadingModule/commitChangeLoading', false, { root: true })
      })
  },
  // ADD_PROJECT({state, commit}, name) {
  //   const id = state.all_projects.projects.length + 5
  //   const data = {
  //     id: id,
  //     name,
  //     attached: false
  //   }
  //   commit('commitCreateProject', data)
  // }
};

const mutations = {
  updateField,
  commitGetProjectsData(state, data) {
    state.all_projects.projects = data
  },
  commitAddNewProject(state, project) {
    state.all_projects.projects.unshift(project)
  },
  commitDeleteProject(state, project) {
    const idx = state.all_projects.projects.findIndex(item => item.id === project.id)
    state.all_projects.projects.splice(idx, 1)
  },
  commitChangeActiveProject(state, project) {
    // localStorage.setItem("activeproject", project.id)
    state.active_project.project = project
  },
  commitUpdateApiToken(state, data) {
    state.active_project.project.api_key = data.api_key
  },
  commitUpdateSecretToken(state, data) {
    state.active_project.project.has_tokens = true
  },
  commitToggleAddProjectModal(state, bool) {
    state.modals.addProjectModal.show = bool
  },
  commitToggleReissueModal(state, bool) {
    state.modals.reissueModal.show = bool
  },
  commitToggleDeleteProjectModal(state, bool) {
    state.modals.deleteProjectModal.show = bool
  },
  commitUpdateProjectName(state, name) {
    state.active_project.project.name = name
  },
  
  //
  commitClearProjects(state) {
    state.all_projects.projects = [];
  },
  commitClearActiveProject(state) {
    state.active_project = {
      project: null,
    };
  },
  commitCreateProject(state, data) {
    state.all_projects.projects.push(data)
    toast.success('Add project')
  },
  commitChangeAttached(state, {id, attached}) {
    state.all_projects.projects.forEach(element => {
      if(element.id === id) {
        element.attached = !attached
        toast.success(`Change attached ${element.name}`)
      }
    })
  },
  commitShowActiveProject(state, project) {
    state.active_project.project = project
    // state.active_project.project = state.all_projects.projects.findIndex(el => el.id === project.id)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
