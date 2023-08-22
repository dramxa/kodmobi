<template>
  <div class="flex flex-col h-full">
    <div class="mb-8 flex justify-between">
      <h1 class="text-4xl font-bold text-gray-800">Settings</h1>
    </div>
    <section class="flex-auto">
      <div class="bg-white shadow-lg rounded-sm mb-8 ">
        <div class="flex flex-col md:flex-row md:-mr-px ">
          <!-- <SettingSidebar /> -->
          <div class="grow flex flex-col">
            <div class="p-6 flex-auto">
              <h2 class="text-xl font-semibold text-gray-800 mb-3">Project</h2>
              <div class="text-sm text-gray-600 font-medium mb-1">Name</div>
              <div class="flex items-center">
                <div class="h-[38px] w-[350px] mr-2.5 border border-gray-200 rounded flex items-center cursor-pointer px-3" @click="editProjectNameModal = true, newProjectName = projectName">
                  <span class="text-sm text-gray-800">{{ projectName }}</span>
                </div>
                <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white" @click="editProjectNameModal = true, newProjectName = projectName">Change</button>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 mt-6">API Key</h2>
              <div class="my-3 text-sm text-gray-700">
                You can use the API key to implement the SMS sending functionality in your project. If you have any questions, please review the <a class="text-indigo-500 font-medium" href="https://kod.mobi/api/" target="__blank">instruction.</a>
              </div>
              <div class="text-sm text-gray-600 font-medium mb-1">API Key</div>
              <div class="flex items-center">
                <div class="h-[38px] w-[350px] mr-2.5 border border-gray-200 rounded flex items-center cursor-pointer px-3" @click="copyToken()">
                  <svg class="mr-2.5" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.9375 14.4844H9.84375C10.0758 14.4844 10.2656 14.2945 10.2656 14.0625V12.375H11.5312V14.0625C11.5312 14.9933 10.7745 15.75 9.84375 15.75H3.9375C3.00542 15.75 2.25 14.9933 2.25 14.0625V8.15625C2.25 7.22549 3.00542 6.46875 3.9375 6.46875H5.625V7.73438H3.9375C3.70441 7.73438 3.51562 7.92422 3.51562 8.15625V14.0625C3.51562 14.2945 3.70441 14.4844 3.9375 14.4844ZM6.46875 3.9375C6.46875 3.00542 7.22549 2.25 8.15625 2.25H14.0625C14.9933 2.25 15.75 3.00542 15.75 3.9375V9.84375C15.75 10.7745 14.9933 11.5312 14.0625 11.5312H8.15625C7.22549 11.5312 6.46875 10.7745 6.46875 9.84375V3.9375ZM8.15625 10.2656H14.0625C14.2945 10.2656 14.4844 10.0758 14.4844 9.84375V3.9375C14.4844 3.70441 14.2945 3.51562 14.0625 3.51562H8.15625C7.92422 3.51562 7.73438 3.70441 7.73438 3.9375V9.84375C7.73438 10.0758 7.92422 10.2656 8.15625 10.2656Z" fill="#ADB3BC"/>
                  </svg>
                  <span class="text-sm text-gray-800">{{ apiToken }}</span>
                </div>
                <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white" @click="changeApiTokenModal = true">Change</button>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 mt-6">Secret Key</h2>
              <div class="mt-1 mb-5 text-sm text-gray-700">
                On the server-side: Must be secret and stored securely in your web or mobile app’s server-side code (such as in an environment variable or credential management system) to call Kod.Mobi APIs. Don’t expose this key on a website or embed it in a mobile application.
              </div>
              <div v-if="active_project">
                <button v-if="!has_tokens" class="btn text-indigo-500 border-gray-200" @click="changeSecretKeyModal = true">Create API Secret Key</button>
                <div v-if="has_tokens" class="flex items-center">
                  <div class="h-[38px] w-[350px] mr-2.5 border border-gray-200 rounded flex items-center px-3">
                    <span class="text-sm text-gray-800" :style="!showPrivateToken ? 'filter: blur(12px); user-select: none;' : ''">{{ privateToken }}</span>
                  </div>
                  <div v-if="showPrivateToken">
                    <button v-if="privateTokenCopied" class="btn border-green-500 p-2">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.8521 4.87039C20.2698 5.25734 20.2698 5.88305 19.8521 6.23295L9.04253 17.1005C8.69449 17.5203 8.07212 17.5203 7.68723 17.1005L2.11984 11.502C1.7361 11.1521 1.7361 10.5264 2.11984 10.1395C2.50354 9.75665 3.12591 9.75665 3.50957 10.1395L8.38331 15.0422L18.4968 4.87039C18.8817 4.48591 19.5041 4.48591 19.8521 4.87039Z" fill="#44C157"/>
                      </svg>
                    </button>
                    <button v-else class="btn border-gray-200 hover:border-gray-300 p-2" @click="copyPrivateToken()">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.8125 17.7031H12.0312C12.3148 17.7031 12.5469 17.4711 12.5469 17.1875V15.125H14.0938V17.1875C14.0938 18.3251 13.1688 19.25 12.0312 19.25H4.8125C3.67329 19.25 2.75 18.3251 2.75 17.1875V9.96875C2.75 8.83115 3.67329 7.90625 4.8125 7.90625H6.875V9.45312H4.8125C4.52762 9.45312 4.29688 9.68516 4.29688 9.96875V17.1875C4.29688 17.4711 4.52762 17.7031 4.8125 17.7031ZM7.90625 4.8125C7.90625 3.67329 8.83115 2.75 9.96875 2.75H17.1875C18.3251 2.75 19.25 3.67329 19.25 4.8125V12.0312C19.25 13.1688 18.3251 14.0938 17.1875 14.0938H9.96875C8.83115 14.0938 7.90625 13.1688 7.90625 12.0312V4.8125ZM9.96875 12.5469H17.1875C17.4711 12.5469 17.7031 12.3148 17.7031 12.0312V4.8125C17.7031 4.52762 17.4711 4.29688 17.1875 4.29688H9.96875C9.68516 4.29688 9.45312 4.52762 9.45312 4.8125V12.0312C9.45312 12.3148 9.68516 12.5469 9.96875 12.5469Z" fill="#ADB3BC"/>
                      </svg>
                    </button>
                  </div>
                  <button v-else class="btn min-w-[80px] text-gray-600 border-gray-200 hover:border-gray-300" @click="changeSecretKeyModal = true">Change</button>
                </div>
                <div v-if="showPrivateToken" class="mt-5 text-gray-700 text-sm">We strongly recommend that you keep this secret key in a safe and accessible place. If you lose this secret key, you will need to generate a new one.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalBasic id="basic-modal" :modalOpen="editProjectNameModal" @close-modal="editProjectNameModal = false" :maxWidth="'460px'" :close="true" :customPadding="true" title="Edit project name">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="newProjectName"
              id="name"
              class="form-input w-full"
              type="text"
              placeholder="Project name"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon @click="newProjectName = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600 font-medium" @click.stop="editProjectNameModal = false">Cancel</button>
          <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white" @click="changeNameProject">Save</button>
        </div>
      </div>
    </ModalBasic>
    <ModalBasic
      id="basic-modal"
      :modalOpen="successfully"
      @close-modal="closeWelcomeModal"
      width="max-w-[384px]"
      :close="false"
      underline="border-0"
      customPadding="px-5 py-6"
    >
      <!-- Modal content -->
      <div class="">
        <div class="text-gray-800 font-bold text-3xl mb-4">
          Welcome!
        </div>
        <div class="text-gray-600">
          <p class="mb-4">To start working with our platform you will need to create your first project.</p>
          <p class="mb-6">Don’t worry - you can edit the name later</p>
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
              <PlusIcon v-if="create_project.name != ''" @click="create_project.name = ''" class="h-5 w-5 text-gray-400 rotate-45 hover:text-gray-600"/>
            </div>
          </div>
          <!-- <span class="text-gray-600 text-xs mt-2.5">You can use up to 11 characters</span> -->
        </div>
      </div>
      <!-- Modal footer -->
      <div class="mt-5">
        <div class="flex flex-wrap justify-end space-x-2">
          <!-- <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="modal.basicModalOpen = false">Cancel</button> -->
          <button :class="create_project.name == '' ? 'bg-gray-100 border-gray-200 text-gray-400 pointer-events-none' : 'bg-indigo-500 hover:bg-indigo-600 text-white'" class="btn w-[69px]" @click.stop="saveFirstProject()">Create</button>
        </div>
      </div>
    </ModalBasic>
    <ModalBlank id="danger-modal" :maxWidth="'460px'" :modalOpen="changeApiTokenModal" @close-modal="changeApiTokenModal = false">
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
            <div class="text-lg font-semibold text-gray-800">Change API Key</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-5 text-gray-600">
            <div class="space-y-2">
              <p>Do you really want to change your API key? This can lead to irreversible changes</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="changeApiTokenModal = false">Cancel</button>
            <button class="btn min-w-[80px] bg-rose-500 hover:bg-rose-600 text-white" @click="updateApiToken(), changeApiTokenModal = false">Change</button>
          </div>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="change-secret-key-modal" :maxWidth="'500px'" :modalOpen="changeSecretKeyModal" @close-modal="changeSecretKeyModal = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#E0E7FF"/>
            <path d="M20 12.5C15.8574 12.5 12.5 15.8574 12.5 20C12.5 24.1426 15.8574 27.5 20 27.5C24.1426 27.5 27.5 24.1426 27.5 20C27.5 15.8574 24.1426 12.5 20 12.5ZM19.2969 16.9531C19.2969 16.5664 19.6133 16.25 20 16.25C20.3867 16.25 20.7031 16.5649 20.7031 16.9531V20.7031C20.7031 21.0913 20.3882 21.4062 20 21.4062C19.6118 21.4062 19.2969 21.0928 19.2969 20.7031V16.9531ZM20 24.2188C19.4914 24.2188 19.0789 23.8062 19.0789 23.2977C19.0789 22.7891 19.4911 22.3766 20 22.3766C20.5089 22.3766 20.9211 22.7891 20.9211 23.2977C20.9199 23.8057 20.5098 24.2188 20 24.2188Z" fill="#6366F1"/>
          </svg>
        </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Change Secret Key</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-5 text-gray-600">
            <div class="space-y-2">
              <p>If you have lost your API secret key, we strongly recommend creating a new one as soon as possible.
                <br />
                If your Key is safe, please do not apply any actions!</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="changeSecretKeyModal = false">Cancel</button>
            <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white" @click="updateSecretToken(), changeSecretKeyModal = false">Create new</button>
          </div>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="info-modal" :modalOpen="reissueModal" @close-modal="closeReissueModal">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
         <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
            <svg class="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Do you really want to reissue the API Key?</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-5">
            <div class="space-y-2">
              <p>Changing the address may result in the deletion of previous transactions</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="closeReissueModal">Cancel</button>
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="ReissueToken">Create New</button>
          </div>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="register-info-modal" :maxWidth="'420px'" :modalOpen="registerInfoModal" @close-modal="registerInfoModal = false">
      <div class="p-5">
        <div class="flex justify-end">
          <svg class="w-4 h-4 fill-gray-400 cursor-pointer" @click.stop="registerInfoModal = false">
            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
          </svg>
        </div>
        <div class="flex justify-center mb-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#818CF8"/>
            <path opacity="0.88" d="M34.3271 18.1941H10.1202C9.62529 18.1941 9.22363 18.5515 9.22363 18.9919V33.3963C9.22363 33.8367 9.62529 34.1941 10.1202 34.1941H34.3271C34.822 34.1941 35.2236 33.8367 35.2236 33.3963V18.9919C35.2236 18.5515 34.822 18.1941 34.3271 18.1941Z" fill="#4F46E5"/>
            <path d="M35.6492 13.1991L11.6779 16.5681C11.1878 16.637 10.8398 17.0468 10.9011 17.4829L12.9058 31.7471C12.9671 32.1832 13.4146 32.4813 13.9046 32.4124L37.876 29.0434C38.366 28.9746 38.714 28.5647 38.6527 28.1286L36.648 13.8644C36.5867 13.4283 36.1393 13.1303 35.6492 13.1991Z" fill="url(#paint0_linear_2902_12420)"/>
            <path opacity="0.72" d="M25.194 25.7765C23.5532 26.0071 22.0363 24.8641 21.8057 23.2232C21.5751 21.5824 22.7181 20.0655 24.359 19.8349C25.9999 19.6043 27.5167 20.7473 27.7473 22.3882C27.9779 24.0291 26.8349 25.5459 25.194 25.7765Z" fill="#6366F1"/>
            <defs>
              <linearGradient id="paint0_linear_2902_12420" x1="10.79" y1="16.6929" x2="13.0168" y2="32.5372" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="#A5B4FC"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="text-center text-gray-800 text-lg font-semibold mb-2">Thank you for registering in Kod.Mobi</div>
        <div class="text-center text-gray-600 text-sm mb-[18px]">We give you a gift of <span class="text-gray-800 font-medium">100 credits</span> to the account so that you can get acquainted with Kod.Mobi</div>
        <div class="flex justify-center">
          <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white w-[150px]" @click.stop="registerInfoModal = false">Get Started</button>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script>
import SettingSidebar from "@/views/settings/sidebar.vue"
// import DropdownEditMenu from '@/components/Dropdown/DropdownEditMenu.vue'
// import SettingTable from './table/settingTable.vue'
import Channels from '@/views/settings/components/channels.vue'
import { mapFields } from 'vuex-map-fields';
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import { copy } from 'clipboard';
import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex';

const toast = useToast()

export default ({
  data: () => ({
    // project_name: '',
    privateToken: 'a00000aa-000a-0000-0000-aaaa0a0a0a0a',
    privateTokenCopied: false,
    showPrivateToken: false,
    changeSecretKeyModal: false,
    changeApiTokenModal: false,
    editProjectNameModal: false,
    tooltipOpen: false,
    newProjectName: "",
    create_project: {
      id: null,
      name: '',
    },
    registerInfoModal: false,
    // reissueModal: {
    //   show: false,
    // },
    // deleteProjectModal: {
    //   show: false,
    // },
  }),
  components: {
    SettingSidebar,
    Channels,
    ModalBasic,
    ModalBlank,
    Tooltip,
    PlusIcon,
    // SettingTable
  },
  computed: {
    // ...mapFields('SettingModule', {
    //   api_key: 'api_key',
    //   project_name: 'project_name'
    // }),
    ...mapFields('AuthModule', {
      successfully: 'register.successfully'
    }),
    ...mapFields('ProjectsModule', {
      all_projects: 'all_projects.projects',
      active_project: 'active_project.project',
      reissueModal: 'modals.reissueModal.show',
      deleteProjectModal: 'modals.deleteProjectModal.show',
      has_tokens: 'active_project.project.has_tokens',
      // project_name: 'active_project.project.name',
      // api_token: 'active_project.project.api_token',
    }),
    apiToken() {
      return this.active_project?.api_key || ''
    },
    projectName() {
      return this.active_project?.name || ''
    }
  },
  methods: {
    ...mapActions('ProjectsModule', ['UPDATE_API_TOKEN', 'UPDATE_SECRET_TOKEN', 'UPDATE_NAME_PROJECT', 'DELETE_PROJECT', 'ADD_PROJECT']),
    saveFirstProject() {
      this.$store.commit("AuthModule/commitChangeSuccessfully", false)
      this.ADD_PROJECT(this.create_project.name)
      this.registerInfoModal = true;
    },
    closeWelcomeModal() {
      // this.$store.commit("AuthModule/commitChangeSuccessfully", false)
    },
    updateApiToken() {
      this.UPDATE_API_TOKEN(this.active_project.id)
    },
    async updateSecretToken() {
      const res = await this.UPDATE_SECRET_TOKEN(this.active_project.id)
      if (res.success) {
        this.privateToken = res.data.secret;
        this.showPrivateToken = true;
      }
      console.log(res)
    },
    changeNameProject() {
      const data = {
        id: this.active_project.id,
        name: this.newProjectName
      }
      this.UPDATE_NAME_PROJECT(data)
      this.editProjectNameModal = false
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
    copyPrivateToken() {
      copy(this.privateToken);
      this.privateTokenCopied = true
      // toast.success('Successfully copied')
      const self = this
      setTimeout(() => {
        self.privateTokenCopied = false
      }, 3000)
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.project_name = this.projectName
    // }, 300)
  },
  unmounted() {
    this.showPrivateToken = false
  }
})
</script>

<style scoped>

</style>
