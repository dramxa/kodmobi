<template>
  <header class="sticky top-0 bg-white border-b border-gray-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">

        <!-- Header: Left side -->
        <div class="flex">
          <!-- <img v-if="$route.fullPath == '/all-projects'" class="mx-auto" src="@/assets/logo.svg" alt="logo">
          <DropdownClassic v-else /> -->
          <!-- <div v-if="isProviders" class="flex items-center text-sm font-medium text-indigo-500 cursor-pointer" @click="$router.push('/channels')">
            <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.79266 2.20677L1.55501 7.45682C1.41365 7.59842 1.33366 7.79464 1.33366 7.99995C1.33366 8.20526 1.41365 8.4012 1.55501 8.54308L6.79266 13.7931C7.07817 14.0783 7.5301 14.0675 7.80269 13.7677C8.07517 13.4709 8.06493 12.9943 7.77851 12.7071L3.82944 8.75082H13.9525C14.3468 8.75082 14.667 8.41456 14.667 8.0005C14.667 7.58643 14.3468 7.2508 13.9525 7.2508H3.8313L7.78037 3.29452C8.06636 3.00678 8.07529 2.53022 7.80448 2.2324C7.53069 1.9324 7.10513 1.92177 6.79266 2.20677Z" fill="#6366F1"/>
            </svg>
            <span>Back to Channels</span>
          </div> -->

          <!-- Hamburger button -->
          <button class="text-gray-500 hover:text-gray-600 lg:hidden" @click.stop="$emit('toggle-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <div class="relative">
            <button
              v-if="profile && profile.tariff_plan.name == 'free'"
              class="btn border-gray-200 text-gray-300 cursor-not-allowed"
              @mouseenter="tooltipOpen = true"
              @mouseleave="tooltipOpen = false"
            >
              Change plan
            </button>
            <div v-show="tooltipOpen" class="absolute top-[50px] w-[204px] translate-x-[-24%] px-2 py-1 rounded bg-gray-800 text-gray-200 text-xs">
              This function is not available and is currently under development.
            </div>
          </div>
          <!-- <button v-if="profile && profile.tariff_plan.name == 'free'" class="btn border-gray-200 hover:border-gray-300 text-indigo-500 shadow" @click.stop="tariffPlanModalOpen = true">
            <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5631 5.35422C11.5631 5.8933 11.1435 6.29175 10.6255 6.29175C10.1075 6.29175 9.68798 5.8933 9.68798 5.35422C9.68798 4.85734 10.1075 4.4167 10.6255 4.4167C11.1435 4.4167 11.5631 4.85734 11.5631 5.35422ZM11.0006 9.31526V11.2395C11.0006 11.8372 10.6865 12.388 10.1732 12.6927L8.09881 13.9208C7.92537 14.024 7.70973 14.0263 7.53394 13.9279C7.35814 13.8271 7.25032 13.6396 7.25032 13.438V10.7497C7.25032 10.2176 7.03937 9.69027 6.66435 9.31526C6.28933 8.94025 5.78305 8.7504 5.25098 8.7504H2.56253C2.36049 8.7504 2.17377 8.64259 2.07374 8.4668C1.97368 8.29101 1.97557 8.07538 2.07868 7.90194L3.3086 5.82767C3.61236 5.31438 4.16412 4.97921 4.76111 4.97921H6.68545C8.60275 1.91122 11.5818 1.79993 13.3421 2.1238C13.6163 2.17393 13.8273 2.38579 13.8765 2.65814C14.2 4.41904 14.0898 7.39802 11.0006 9.31526ZM6.63857 7.95116C6.94093 8.09882 7.21751 8.29805 7.44018 8.53946C7.7027 8.78321 7.90193 9.05978 8.04959 9.36213C10.5294 8.65899 11.7225 7.49646 12.3061 6.40659C12.8921 5.31203 12.9249 4.12068 12.8218 3.17987C11.8795 3.05542 10.6888 3.10979 9.57312 3.69551C8.50431 4.27748 7.34174 5.47141 6.63857 7.95116ZM2.98397 10.0981C3.79003 9.29182 5.09628 9.29182 5.90258 10.0981C6.70888 10.9044 6.70888 12.2099 5.90258 13.0161C4.74236 14.1763 2.01117 13.9888 2.01117 13.9888C2.01117 13.9888 1.82383 11.2372 2.98397 10.0981ZM3.51369 12.4864C3.51369 12.4864 4.42124 12.5497 4.80799 12.163C5.07519 11.8958 5.07519 11.4598 4.80799 11.1926C4.53844 10.9255 4.10505 10.9255 3.83714 11.1926C3.45134 11.5794 3.51369 12.4864 3.51369 12.4864Z" fill="#6366F1"/>
            </svg>
            Upgrade
          </button> -->
          <hr v-if="profile && profile.tariff_plan.name == 'free'" class="w-px h-6 bg-gray-200" />
          <div class="text-gray-600 font-semibold cursor-pointer" @click="toBalance">
            <div>{{balance.toLocaleString('ru-RU', { maximumFractionDigits: 3 })}} <span class="text-gray-500 font-normal">Credits</span></div>
            <!-- <div v-if="profile" class="text-gray-500 text-xs font-normal">Tariff plan: <span class="uppercase">{{ profile.tariff_plan.name }}</span></div> -->
          </div>
          <!-- <button
            class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3"
            :class="{ 'bg-gray-200': searchModalOpen }"
            aria-controls="search-modal"
            @click="toBalance"
          >
            <BalanceIcon class="h-5 w-5 text-gray-500 hover:text-gray-600"/>
          </button>  -->

          <!-- <button
            class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3"
            :class="{ 'bg-gray-200': searchModalOpen }"
            @click.stop="searchModalOpen = true"
            aria-controls="search-modal"
          >
            <span class="sr-only">Search</span>
            <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-current text-gray-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path class="fill-current text-gray-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button> -->
          <!-- <SearchModal id="search-modal" searchId="search" :modalOpen="searchModalOpen" @open-modal="searchModalOpen = true" @close-modal="searchModalOpen = false" /> -->
          <!-- Divider -->
          <hr class="w-px h-6 bg-gray-200" />
          <UserMenu align="right" />
        </div>
      </div>
      <ChangePlanModal
        :show="tariffPlanModalOpen"
        @close-modal="tariffPlanModalOpen = false"
      />
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

// import SearchModal from '@/components/Modals/ModalSearch.vue'
import UserMenu from '@/components/Dropdown/DropdownProfile.vue'
// import DropdownClassic from '@/components/Dropdown/DropdownClassic.vue'
import { PlusIcon, XIcon } from '@heroicons/vue/outline'
import { mapFields } from 'vuex-map-fields';
import BalanceIcon from '@/components/Icon/BalanceIcon.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import ChangePlanModal from "@/components/Modals/ChangePlanModal.vue"
import Tooltip from "@/components/Tooltip/Tooltip"

export default {
  name: 'Header',
  props: ['sidebarOpen'],
  components: {
    // SearchModal,
    UserMenu,
    BalanceIcon,
    // DropdownClassic,
    PlusIcon,
    XIcon,
    ModalBlank,
    ChangePlanModal,
    Tooltip,
  },
  data: () => ({
    changePlanModalOpen: false,
    tooltipOpen: false,
  }),
  methods: {
    toBalance() {
      this.$router.push('/balance')
    }
  },
  computed: {
    ...mapFields('ProfileModule', {
      balance: 'balance',
      profile: 'profile',
      tariffPlanModalOpen: 'tariffPlanModalOpen'
    }),
    isProviders() {
      return this.$route.path.includes('/providers');
    }
  },
  setup() {
    const searchModalOpen = ref(false)
    return {
      searchModalOpen,
    }  
  }  
}
</script>