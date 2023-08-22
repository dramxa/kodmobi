<template>
  <div class="relative inline-flex w-full flex-col">
    <button
      ref="trigger"
      class="flex items-center justify-between text-gray-300 hover:text-indigo-300 text-sm w-full rounded-sm h-10 px-3 py-2"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="flex items-center">
        <svg class="shrink-0 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2820_70726)">
            <path d="M5 12H3L12 3L21 12H19" fill="#616975"/>
            <path d="M5 12H3L12 3L21 12H19" stroke="#ADB3BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12" fill="#616975"/>
            <path d="M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12" stroke="#ADB3BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21" fill="#616975"/>
            <path d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21" stroke="#ADB3BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_2820_70726">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <!-- <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
          <path class="fill-current text-gray-600" :class="{'fill-gray-100' : dropdownOpen}" d="M5.20833 12.5H3.125L12.5 3.125L21.875 12.5H19.7917" fill="#475569"/>
          <path class="fill-current text-gray-600" :class="{'stroke-indigo-300' : dropdownOpen}" d="M5.20833 12.5H3.125L12.5 3.125L21.875 12.5H19.7917" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="fill-current text-gray-600" :class="{'fill-gray-100' : dropdownOpen}" d="M5.2085 12.5V19.7917C5.2085 20.3442 5.42799 20.8741 5.81869 21.2648C6.20939 21.6555 6.7393 21.875 7.29183 21.875H17.7085C18.261 21.875 18.7909 21.6555 19.1816 21.2648C19.5723 20.8741 19.7918 20.3442 19.7918 19.7917V12.5" fill="#475569"/>
          <path class="fill-current text-gray-600" :class="{'stroke-indigo-300' : dropdownOpen}" d="M5.2085 12.5V19.7917C5.2085 20.3442 5.42799 20.8741 5.81869 21.2648C6.20939 21.6555 6.7393 21.875 7.29183 21.875H17.7085C18.261 21.875 18.7909 21.6555 19.1816 21.2648C19.5723 20.8741 19.7918 20.3442 19.7918 19.7917V12.5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="fill-current text-gray-600" :class="{'text-gray-100' : dropdownOpen}" d="M9.375 21.8753V15.6253C9.375 15.0728 9.59449 14.5429 9.98519 14.1522C10.3759 13.7615 10.9058 13.542 11.4583 13.542H13.5417C14.0942 13.542 14.6241 13.7615 15.0148 14.1522C15.4055 14.5429 15.625 15.0728 15.625 15.6253V21.8753" fill="#475569"/>
          <path class="fill-current text-gray-600" :class="{'stroke-indigo-300' : dropdownOpen}" d="M9.375 21.8753V15.6253C9.375 15.0728 9.59449 14.5429 9.98519 14.1522C10.3759 13.7615 10.9058 13.542 11.4583 13.542H13.5417C14.0942 13.542 14.6241 13.7615 15.0148 14.1522C15.4055 14.5429 15.625 15.0728 15.625 15.6253V21.8753" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> -->
        <!-- <span class="mx-3 text-gray-200 font-medium">{{activeProjectName}}</span> -->
        <span class="mx-3 text-gray-200 font-medium">Projects</span>
        <!-- <span v-else>Projects</span> -->
      </span>
      <svg 
        class="shrink-0 ml-3 fill-current text-gray-300 hover:text-indigo-300"
        :class="dropdownOpen ? 'rotate-180 transition-all duration-300' : 'transition-all duration-300'"
        width="11"
        height="7"
        viewBox="0 0 11 7"
      >
        <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen">
        <div
          class="top-full left-0 w-full py-1.5 rounded-b-sm min-w-44 -mt-0.5 max-h-44 overflow-auto"
        >
          <div
            ref="dropdown"
            class="font-medium text-sm text-gray-400"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
          >

            <button
              v-for="project in projects"
              :key="project.id"
              class="flex items-center w-full py-2 px-3 cursor-pointer h-[38px] font-medium"
              :class="project.id === active_project.id ? 'text-indigo-500 bg-gray-900' : 'hover:text-indigo-300'"
              @click="changeProject(project)"
            >
              <!-- @click="active_project.id = project.id; dropdownOpen = false" -->
              <span>{{project.name}}</span>
            </button>          
          </div>
        </div>
        <button
          @click.stop="showAddProjectModal"
          class="flex items-center p-3 text-green-500 hover:text-green-600 hover:scale-105 duration-300 transition-all"
        >
          <PlusIcon class="h-5 w-5" />
          <span class="ml-2">New project</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { mapFields } from 'vuex-map-fields';
import { useRouter } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/outline'

export default {
  name: 'DropdownClassic',
  components: {
    PlusIcon,
  },
  methods: {
    getProjectName() {
      let result = this.active_project ? this.active_project.name : 'Projects'
      return result
    },
    changeProject(proj) {
      this.$store.commit('ProjectsModule/commitChangeActiveProject', proj)
      this.$store.commit('ChannelsModule/commitAddAttach', proj)
      this.dropdownOpen = false
    },
    showAddProjectModal() {
      this.$emit('showAddProjectModal')
    }
  },
  computed: {
    ...mapFields('ProjectsModule', {
      projects: 'all_projects.projects',
      active_project: 'active_project.project',
    }),
    activeProjectName() {
      let result = this.active_project ? this.active_project.name : 'Projects'
      return result
    }
  },
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)   
    
    const currentRoute = useRouter().currentRoute.value
    // const selected = this.active_project

    // close on click outside
    // const clickHandler = ({ target }) => {
    //   if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
    //   dropdownOpen.value = false
    // }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      // document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      // document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })    
    
    return {
      dropdownOpen,
      trigger,
      dropdown,
      currentRoute,
      // selected,
      // options,
    }
  },
}
</script>