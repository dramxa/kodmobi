<template>
  <div class="relative inline-flex w-full flex-col">
    <button
      ref="trigger"
      class="flex items-center justify-between bg-gray-900 text-gray-300 hover:text-indigo-300 text-sm w-full rounded-sm h-10 px-3 py-2"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="flex items-center">
        <span>{{activeProjectName}}</span>
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
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="top-full left-0 w-full bg-gray-900 py-1.5 rounded-b-sm shadow-lg overflow-hidden min-w-44 -mt-0.5">
        
        <div
          ref="dropdown"
          class="font-medium text-sm text-gray-400"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >

          <button
            v-for="project in projects"
            :key="project.id"
            class="flex items-center w-full py-1 px-3 cursor-pointer"
            :class="project.id === active_project.id ? 'text-indigo-500' : 'hover:text-indigo-300'"
            @click="changeProject(project)"
          >
            <!-- @click="active_project.id = project.id; dropdownOpen = false" -->
            <span>{{project.name}}</span>
          </button>          
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'DropdownClassic',
  methods: {
    getProjectName() {
      let result = this.active_project ? this.active_project.name : 'Projects'
      return result
    },
    changeProject(proj) {
      this.$store.commit('ProjectsModule/commitChangeActiveProject', proj)
      this.dropdownOpen = false
    }
  },
  computed: {
    ...mapFields('ProjectsModule', {
      // name: 'new_projects.name',
      projects: 'all_projects.projects',
      active_project: 'active_project.project',
      // attached: 'new_project.attached'
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
    // const selected = this.active_project

    // const options = ref([
    //   {
    //     id: 0,
    //     period: 'Today'
    //   },
    //   {
    //     id: 1,
    //     period: 'Last 7 Days'
    //   },
    //   {
    //     id: 2,
    //     period: 'Last Month'
    //   },
    //   {
    //     id: 3,
    //     period: 'Last 12 Months'
    //   },
    //   {
    //     id: 4,
    //     period: 'All Time'
    //   }
    // ])

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })    
    
    return {
      dropdownOpen,
      trigger,
      dropdown,
      // selected,
      // options,
    }
  },
}
</script>