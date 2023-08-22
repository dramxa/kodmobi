<template>
  <div class="flex flex-col h-full">
    <div class="mb-8 flex justify-between">
      <h1 class="text-4xl font-bold text-gray-800">API Reference</h1>
    </div>
    <section class="flex-auto">
      <div class="bg-white shadow-lg rounded-sm mb-8 h-full">
        <div class="flex flex-col md:flex-row md:-mr-px h-full">
          <div class="grow flex flex-col p-8 max-w-[800px] mx-auto">
            <div class="pb-6 px-4 border-b border-gray-200 text-3xl font-bold">Message</div>
            <CreateCode />
            <SendCode />
            <CheckCode />
            <div class="pb-6 px-4 mt-8 border-b border-gray-200 text-3xl font-bold">Channels</div>
            <CheckChannel />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import {copy} from 'clipboard';
import { useToast } from 'vue-toastification';
import { mapActions } from 'vuex';
import CreateCode from './api/CreateCode'
import SendCode from './api/SendCode'
import CheckCode from './api/CheckCode'
import CheckChannel from './api/CheckChannel'

const toast = useToast()

export default ({
  data: () => ({
    tooltipOpen: false,
    create_project: {
      id: null,
      name: '',
    },
    registerInfoModal: false,
  }),
  components: {
    CreateCode,
    SendCode,
    CheckCode,
    CheckChannel,
    // SettingTable
  },
  computed: {
    ...mapFields('AuthModule', {
      successfully: 'register.successfully'
    }),
    ...mapFields('ProjectsModule', {
      all_projects: 'all_projects.projects',
      active_project: 'active_project.project',
      reissueModal: 'modals.reissueModal.show',
      deleteProjectModal: 'modals.deleteProjectModal.show',
    }),
    apiToken() {
      return this.active_project?.api_key || ''
    },
    projectName() {
      return this.active_project?.name || ''
    }
  },
  methods: {
    ...mapActions('ProjectsModule', ['UPDATE_API_TOKEN', 'UPDATE_NAME_PROJECT', 'DELETE_PROJECT', 'ADD_PROJECT']),
    saveFirstProject() {
      this.$store.commit("AuthModule/commitChangeSuccessfully", false)
      this.ADD_PROJECT(this.create_project.name)
      this.registerInfoModal = true;
    },
    updateApiToken() {
      this.UPDATE_API_TOKEN(this.active_project.id)
    },
    changeNameProject() {
      const data = {
        id: this.active_project.id,
        name: this.$refs.nameProject.value
      }
      this.UPDATE_NAME_PROJECT(data)
    },
    showReissueModal() {
      this.$store.commit('ProjectsModule/commitToggleReissueModal', true)
    },
    closeReissueModal() {
      this.$store.commit('ProjectsModule/commitToggleReissueModal', false)
    },
    showDeleteProjectModal() {
      if(this.all_projects.length !== 1) {
        this.$store.commit('ProjectsModule/commitToggleDeleteProjectModal', true)
      }
      // this.DELETE_PROJECT(this.active_project.id)
    },
    closeDeleteProjectModal() {
      this.$store.commit('ProjectsModule/commitToggleDeleteProjectModal', false)
    },
    deleteProject() {
      this.DELETE_PROJECT(this.active_project.id)
    },
    tooltipOpenShow(boolean) {
      if(this.all_projects.length === 1)
        this.tooltipOpen = boolean
    },
    copyToken() {
      copy(this.active_project.api_key);
      toast.success('Successfully copied')
    },
    
  },
  mounted() {
    // setTimeout(() => {
    //   this.project_name = this.projectName
    // }, 300)
  }
})
</script>

<style scoped>

</style>
