<template>
  <div class="relative">
    <button
      ref="trigger"
      class="btn justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="flex items-center">
        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.07143 2.99967H9.92857V1.95801C9.92857 1.61296 10.2152 1.33301 10.5714 1.33301C10.9277 1.33301 11.2143 1.61296 11.2143 1.95801V2.99967H12.2857C13.2313 2.99967 14 3.74577 14 4.66634V12.9997C14 13.9189 13.2313 14.6663 12.2857 14.6663H3.71429C2.76741 14.6663 2 13.9189 2 12.9997V4.66634C2 3.74577 2.76741 2.99967 3.71429 2.99967H4.78571V1.95801C4.78571 1.61296 5.07232 1.33301 5.42857 1.33301C5.78482 1.33301 6.07143 1.61296 6.07143 1.95801V2.99967ZM3.28571 12.9997C3.28571 13.2288 3.4775 13.4163 3.71429 13.4163H12.2857C12.5214 13.4163 12.7143 13.2288 12.7143 12.9997V6.33301H3.28571V12.9997Z" fill="#ADB3BC"/>
        </svg>
        <span class="text-gray-500 font-medium text-sm">{{options[selected].period}}</span>
      </span>
      <svg class="shrink-0 ml-1 fill-current text-gray-400" width="11" height="7" viewBox="0 0 11 7">
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
      <div v-show="dropdownOpen" class="z-10 absolute top-full right-0 w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
        <div
          ref="dropdown"
          class="font-medium text-sm text-gray-600"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >

          <button
            v-for="option in options"
            :key="option.id"
            class="flex items-center w-full hover:bg-gray-50 py-1 px-3 cursor-pointer"
            :class="option.id === selected && 'text-indigo-500'"
            @click="choiceSelect(option); dropdownOpen = false"
          >
            <svg class="shrink-0 mr-2 fill-current text-indigo-500" :class="option.id !== selected && 'invisible'" width="12" height="9" viewBox="0 0 12 9">
              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
            </svg>
            <span>{{option.period}}</span>
          </button>          
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DateSelect',
  methods: {
    choiceSelect(opt) {
      this.selected = opt.id
      this.$emit('selectValue', opt.period)
    },
  },
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)    
    const selected = ref(1)

    const options = ref([
      {
        id: 0,
        period: 'Today'
      },
      {
        id: 1,
        period: 'This Month'
      },
      {
        id: 2,
        period: 'Last 12 Months'
      },
      {
        id: 3,
        period: 'All Time'
      },
      {
        id: 4,
        period: 'Custom'
      }
    ])

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
      selected,
      options,
    }
  }
}
</script>