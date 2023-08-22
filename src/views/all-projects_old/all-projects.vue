<template>
  <div class="">
    <div class="mb-10 flex justify-between">
      <h1 class="text-4xl font-bold text-gray-800">All projects</h1>
      <button v-if="projects.length" class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click.stop="openModal('New project')">
        <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span class="ml-2">Add new project</span>
      </button>
    </div>
    <div v-if="!projects.length" class="text-center px-4 mt-24">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-gray-200 to-gray-100 mb-4">
        <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
          <path class="text-gray-500" d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z" />
          <path class="text-gray-300" d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z" />
          <path class="text-gray-400" d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z" />
        </svg>
      </div>
      <h2 class="text-2xl text-gray-800 font-bold mb-2">Create your project with one click</h2>
      <div class="mb-6">You need to create a project for further work</div>
      <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" @click.stop="openModal('New project')">
        <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span class="ml-2">Add new project</span>
      </button>
    </div>
    <div v-else class="flex flex-wrap">
      <div
        v-for="project in projects"
        :key="project.id"
        class="p-5 shadow-custom-project bg-white rounded-sm border border-gray-200 w-72 h-32 flex flex-col m-2.5"
      >
        <router-link to="/channels" @click="showProject(project)" class="text-lg font-semibold grow">{{project.name}}</router-link>
        <div class="flex justify-between items-center">
          <DropdownEditMenu class="relative inline-flex" @click="editName($event, project.id)">
            <li>
              <span
                @click.stop="openModal('Edit project name')"
                class="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
              >
                Edit
              </span>
            </li>
            <li>
              <span
                @click.stop="danger_modal.dangerModalOpen = true"
                class="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
              >
              Delete
            </span>
            </li>
          </DropdownEditMenu>
          <span @click="ChangeAttached(project)">
            <svg v-if="project.attached" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5002 3.75L9.16683 7.08333L5.8335 8.33333L4.5835 9.58333L10.4168 15.4167L11.6668 14.1667L12.9168 10.8333L16.2502 7.5" fill="#F59E0B"/>
              <path d="M12.5002 3.75L9.16683 7.08333L5.8335 8.33333L4.5835 9.58333L10.4168 15.4167L11.6668 14.1667L12.9168 10.8333L16.2502 7.5" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 12.5L3.75 16.25" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.0835 3.3335L16.6668 7.91683" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5002 3.75L9.16683 7.08333L5.8335 8.33333L4.5835 9.58333L10.4168 15.4167L11.6668 14.1667L12.9168 10.8333L16.2502 7.5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 12.5L3.75 16.25" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.0835 3.3335L16.6668 7.91683" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
      <!-- :modalOpen="successfully" -->
    <ModalBasic
      id="basic-modal-welcome"
      :modalOpen="true"
      @close-modal="closeWelcomeModal"
      title="Welcome!"
      width="max-w-md"
      :close="false"
      underline="border-0"
      header="text-3xl"
    >
      <!-- Modal content -->
      <div class="">
        <div>
          <p class="text-gray-600 mb-4">To start working with our platform you will need to create your first project.</p>
          <p class="text-gray-600 mb-4">Don’t worry - you can edit the name later</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Project name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="create_project.name"
              id="name"
              class="form-input w-full"
              type="text"
              placeholder="Project name"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <PlusIcon @click="create_project.name = ''" class="h-5 w-5 text-gray-400 rotate-45 hover:text-gray-600"/>
            </div>
          </div>
          <!-- <span class="text-gray-600 text-xs mt-2.5">You can use up to 11 characters</span> -->
        </div>
      </div>
      <!-- Modal footer -->
      <div class="py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <!-- <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="modal.basicModalOpen = false">Cancel</button> -->
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white w-[69px]" @click="saveNewProject">Create</button>
        </div>
      </div>
    </ModalBasic>
    <ModalBasic
      id="basic-modal"
      :modalOpen="modal.basicModalOpen"
      @close-modal="modal.basicModalOpen = false"
      :title="modal.modalTitle"
    >
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="create_project.name"
              id="name"
              class="form-input w-full"
              type="text"
              placeholder="Project name"
              maxlength="11"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <PlusIcon @click="create_project.name = ''" class="h-5 w-5 text-gray-400 rotate-45 hover:text-gray-600"/>
            </div>
          </div>
          <span class="text-gray-600 text-xs mt-2.5">You can use up to 11 characters</span>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="modal.basicModalOpen = false">Cancel</button>
          <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="saveNewProject">Save</button>
        </div>
      </div>
    </ModalBasic>
    <ModalBlank id="danger-modal" :modalOpen="danger_modal.dangerModalOpen" @close-modal="danger_modal.dangerModalOpen = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
          <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
        </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Delete project?</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>Are you sure you want to delete the project?</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="danger_modal.dangerModalOpen = false">Cancel</button>
            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Yes, Delete it</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script>

import ModalBasic from '@/components/Modals/ModalBasic.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import DropdownEditMenu from '@/components/Dropdown/DropdownEditMenu.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

export default ({
  data: () => ({
    danger_modal: {
      dangerModalOpen: false
    },
    modal: {
      basicModalOpen: false,
      modalTitle: 'New project',
    },
    create_project: {
      id: null,
      name: '',
      attached: false
    }
  }),
  components: {
    ModalBasic,
    ModalBlank,
    PlusIcon,
    DropdownEditMenu,
  },
  computed: {
    ...mapFields('AuthModule', {
      successfully: 'register.successfully'
    }),
    ...mapFields('ProjectsModule', {
      name: 'new_projects.name',
      projects: 'all_projects.projects',
      attached: 'new_project.attached'
    }),
  },
  methods: {
    ...mapActions('ProjectsModule', ['ADD_PROJECT']),
    closeWelcomeModal() {
      this.$store.commit("AuthModule/commitChangeSuccessfully", false)
    },
    showProject(project) {
      this.$store.commit("ProjectsModule/commitShowActiveProject", { project })
    },
    openModal(text) {
      this.modal.basicModalOpen = true
      this.modal.modalTitle = text
      if(text === 'New project') {
        this.create_project.name = ''
      }
    },
    editName(e, id) {
      this.create_project.name = this.projects.find((item) => {
        return item.id === id
      }).name
    },
    saveNewProject() {
      this.modal.basicModalOpen = false
      this.ADD_PROJECT(this.create_project.name)
    },
    ChangeAttached(project) {
      this.$store.commit("ProjectsModule/commitChangeAttached", {id: project.id, attached: project.attached} )
    }
  },
})
</script>

<style scoped>

</style>
