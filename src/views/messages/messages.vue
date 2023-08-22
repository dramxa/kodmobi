<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Messages</h1>
      <div class="flex">
        <!-- <SearchForm
          ref="search"
          @hideField="hideField"
          class="mr-1.5"
        /> -->
        <!-- <transition name="component-fade" mode="out-in">
          <SearchForm
            v-show="showSearch"
            ref="search"
            @hideField="hideField"
            class="mr-1.5"
          />
        </transition>
        <button
          v-show="!showSearch"
          @click="showSearchForm"
          class="btn border-gray-200 hover:border-gray-300 bg-white mr-1.5"
        >
          <svg class="fill-current text-gray-400 group-hover:text-gray-500" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.818 13.0391L10.6766 9.89844C11.3564 9.06641 11.7315 8.01875 11.7315 6.875C11.7315 4.18203 9.5482 2 6.85521 2C4.16223 2 2 4.18273 2 6.875C2 9.56727 4.18309 11.75 6.85521 11.75C7.99904 11.75 9.04838 11.3537 9.87946 10.6944L13.0209 13.835C13.1522 13.9461 13.2976 14 13.4406 14C13.5836 14 13.7285 13.9451 13.8384 13.8352C14.0571 13.6156 14.0571 13.2594 13.818 13.0391ZM3.12531 6.875C3.12531 4.80734 4.8081 3.125 6.87631 3.125C8.94452 3.125 10.6273 4.80734 10.6273 6.875C10.6273 8.94266 8.94452 10.625 6.87631 10.625C4.8081 10.625 3.12531 8.94219 3.12531 6.875Z"/>
          </svg>
        </button>
        <DropdownFilter align="right" class="mr-1.5" />
        <Datepicker v-if="showDatepicker"  align="right" />
        <DateSelect v-else @selectValue="selectValue" /> -->
        <button class="h-[38px] btn flex items-center px-3 bg-white border-gray-200 ml-1.5" @click="updateTable()">
          <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9987 1.98736V6.35619C13.9987 6.71935 13.7066 7.01151 13.3435 7.01151H8.97571C8.61536 7.01151 8.32054 6.71935 8.32054 6.35619C8.32054 5.99303 8.614 5.70086 8.97571 5.70086H11.7192C10.9085 4.12535 9.26235 3.07956 7.44697 3.07956C4.77442 3.07956 2.64238 5.2121 2.64238 7.88528C2.64238 10.5585 4.79817 12.691 7.44697 12.691C8.56868 12.691 9.66064 12.2959 10.5208 11.5783C10.7982 11.3462 11.2118 11.3829 11.4438 11.6619C11.6758 11.9402 11.6383 12.353 11.3602 12.5851C10.2639 13.4982 8.87137 13.9987 7.44282 13.9987C4.07284 13.9989 1.33203 11.2575 1.33203 7.88528C1.33203 4.51309 4.07284 1.77165 7.44424 1.77165C9.62406 1.77165 11.6046 2.95833 12.6884 4.75064V1.98736C12.6884 1.62556 12.9818 1.33203 13.3435 1.33203C13.7052 1.33203 13.9987 1.62556 13.9987 1.98736Z" fill="#6366F1"/>
          </svg>
          <span class="text-sm font-medium text-indigo-500">Update</span>
        </button>
        <button
          v-if="activeChannels.length > 0 && billing_data.length"
          @click.stop="showMessageModal"
          class="h-[38px] bg-indigo-500 hover:bg-indigo-600 rounded px-3 py-1 ml-1.5 text-white transition-all text-sm font-medium w-[120px]"
        >
          Test message
        </button>
      </div>
    </div>
    <div>
      <!-- <div class="flex flex-col md:flex-row md:-mr-px">
      </div> -->
      <!-- <ChannelsTable @change-selection="updateSelectedItems($event)" /> -->
      <MessagesTable :loading="loading" @showMessageModal="showMessageModal" />
    </div>
    <MessagesPagination
      v-if="billing_data.length"
      class="mt-8"
      :current_page="current_page"
      :last_page="last_page"
      :per_page="per_page"
      :total="total"
    />
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
              @keyup.enter="create_project.name !== '' ? saveFirstProject() : () => {}"
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
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white w-[150px]" @click.stop="registerInfoModal = false">Get Started</button>
        </div>
      </div>
    </ModalBlank>
    <TestMessageModal
      :activeChannels="activeChannels"
      :show="messageModal.show"
      @close-modal="closeMessageModal"
      @showSuccessMessageModal="showSuccessMessageModal"
      @showErrorMessageModal="showErrorMessageModal"
    />
    <ModalBlank id="success-message-modal" :maxWidth="'460px'" :modalOpen="successMessageModal" @close-modal="successMessageModal = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="min-w-[40px]">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#D8FFDE"/>
            <path d="M12.5 20C12.5 15.8574 15.8574 12.5 20 12.5C24.1426 12.5 27.5 15.8574 27.5 20C27.5 24.1426 24.1426 27.5 20 27.5C15.8574 27.5 12.5 24.1426 12.5 20ZM23.3926 18.7051C23.7119 18.3857 23.7119 17.8643 23.3926 17.5449C23.0732 17.2256 22.5518 17.2256 22.2324 17.5449L19.0625 20.7148L17.7676 19.4199C17.4482 19.1006 16.9268 19.1006 16.6074 19.4199C16.2881 19.7393 16.2881 20.2607 16.6074 20.5801L18.4824 22.4551C18.8018 22.7744 19.3232 22.7744 19.6426 22.4551L23.3926 18.7051Z" fill="#44C157"/>
          </svg>
        </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Everything went well!</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-5">
            <div class="space-y-2 text-gray-600">
              <p>Now you can set up communication channels for further work in Kod.Mobi</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white min-w-[80px]" @click="successMessageModal = false">OK</button>
          </div>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="success-message-modal" :maxWidth="'460px'" :modalOpen="errorMessageModal.show" @close-modal="errorMessageModal.show = false">
      <div class="p-5 flex space-x-4">
        <div class="min-w-[40px]">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#D8FFDE"/>
            <path d="M12.5 20C12.5 15.8574 15.8574 12.5 20 12.5C24.1426 12.5 27.5 15.8574 27.5 20C27.5 24.1426 24.1426 27.5 20 27.5C15.8574 27.5 12.5 24.1426 12.5 20ZM23.3926 18.7051C23.7119 18.3857 23.7119 17.8643 23.3926 17.5449C23.0732 17.2256 22.5518 17.2256 22.2324 17.5449L19.0625 20.7148L17.7676 19.4199C17.4482 19.1006 16.9268 19.1006 16.6074 19.4199C16.2881 19.7393 16.2881 20.2607 16.6074 20.5801L18.4824 22.4551C18.8018 22.7744 19.3232 22.7744 19.6426 22.4551L23.3926 18.7051Z" fill="#44C157"/>
          </svg>
        </div>
        <div class="grow">
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Code not found</div>
          </div>
          <div class="text-sm mb-5">
            <div class="space-y-2 text-gray-600">
              <p>Your session has expired</p>
            </div>
          </div>
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white min-w-[80px]" @click="successMessageModal = false">OK</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script>

import MessagesTable from '@/views/messages/table/MessagesTable.vue'
import MessagesPagination from '@/views/messages/table/MessagesPagination.vue'
import Datepicker from '@/views/messages/filters/Datepicker.vue'
import DateSelect from '@/views/messages/filters/DateSelect.vue'
import DropdownFilter from '@/views/messages/filters/DropdownFilter.vue'
import SearchForm from '@/views/messages/filters/SearchForm.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import TestMessageModal from '@/components/Modals/TestMessageModal.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import { ref, onMounted, onUnmounted } from 'vue'

export default ({
  data: () => ({
    loading: true,
    showSearch: false,
    showDatepicker: false,
    create_project: {
      id: null,
      name: '',
    },
    registerInfoModal: false,
    messageModal: {
      show: false,
    },
    successMessageModal: false,
    errorMessageModal: {
      show: false,
    },
  }),
  components: {
    PlusIcon,
    MessagesTable,
    MessagesPagination,
    Datepicker,
    DateSelect,
    DropdownFilter,
    SearchForm,
    ModalBlank,
    ModalBasic,
    TestMessageModal
  },
  methods: {
    ...mapActions('BillingModule', ['GET_BILLING']),
    ...mapActions('ProjectsModule', ['ADD_PROJECT']),
    ...mapActions('ChannelsModule', ['GET_CHANNELS']),
    saveFirstProject() {
      this.$store.commit("AuthModule/commitChangeSuccessfully", false)
      this.ADD_PROJECT(this.create_project.name)
      this.registerInfoModal = true;
    },
    async selectValue(val) {
      if(val === 'Custom') {
        this.showDatepicker = true
      } else {
        this.showDatepicker = false
        this.loading = true;
        await this.GET_BILLING({page: this.current_page, date: val, project_id: this.active_project.id})
        this.loading = false;
      }

      // тут отправлять запрос с датами
    },
    showSearchForm() {
      this.showSearch = true
      this.$nextTick(() => {
        this.$refs.search.focusInput()
      })
    },
    hideField() {
      this.showSearch = false
    },
    closeWelcomeModal() {
      this.$store.commit("AuthModule/commitChangeSuccessfully", false)
    },
    showMessageModal() {
      this.messageModal.show = true
    },
    closeMessageModal() {
      this.messageModal.show = false
      this.GET_BILLING({ project_id: this.active_project.id })
    },
    showSuccessMessageModal() {
      this.successMessageModal = true
    },
    showErrorMessageModal() {
      this.errorMessageModal.show = true
    },
    updateTable() {
      this.GET_BILLING({project_id: this.active_project.id})
    },
  },
  watch: {
    async active_project(val){
      this.GET_CHANNELS(val.id)
      this.loading = true;
      await this.GET_BILLING({project_id: val.id});
      this.loading = false;
    }
  },
  computed: {
    ...mapFields('BillingModule', {
      billing_data: 'billing_data',
      current_page: 'billing_meta.current_page',
      last_page: 'billing_meta.last_page',
      per_page: 'billing_meta.per_page',
      total: 'billing_meta.total',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
    ...mapFields('ChannelsModule', {
      channels: 'channels',
    }),
    ...mapFields('AuthModule', {
      successfully: 'register.successfully'
    }),
    activeChannels() {
      const activeChannels = this.channels.filter(el => {
        return el.is_active === true
      })
      return activeChannels || []
    },
  },
  mounted() {
    if(this.active_project && this.active_project.id) {
      this.GET_CHANNELS(this.active_project.id)
      this.GET_BILLING({project_id: this.active_project.id});
    }
  },
})
</script>

<style>
</style>