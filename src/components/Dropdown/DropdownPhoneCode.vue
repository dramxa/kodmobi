<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="btn justify-between min-w-[100px] bg-white border-gray-200 hover:border-gray-300 text-gray-800"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="flex items-center font-normal">
        <span>{{selected.code}} +{{selected.dial_code}}</span>
      </span>
      <svg class="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3839 6.08401L8.62626 11.0758C8.45202 11.2572 8.22474 11.334 8.00125 11.334C7.77777 11.334 7.55125 11.2577 7.37625 11.1051L1.61861 6.11324C1.25402 5.79493 1.23868 5.26522 1.5831 4.92964C1.92875 4.59169 2.50659 4.57976 2.86872 4.89694L8.00135 9.37599L13.134 4.89694C13.4962 4.57971 14.0715 4.59171 14.4196 4.92964C14.7638 5.23285 14.7487 5.76308 14.3839 6.08401Z" fill="#ADB3BC"/>
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
      <div v-show="dropdownOpen" class="z-10 absolute top-full left-0 w-full min-w-[250px] bg-white border border-slate-200 py-1.5 rounded shadow-lg mt-1 overflow-auto" :class="isDialog ? 'max-h-[100px]' : 'max-h-[160px]'">
        <div
          ref="dropdown"
          class="font-medium text-sm text-gray-600"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >

          <button
            v-for="option in options"
            :key="option.code"
            class="flex items-center justify-between w-full hover:bg-gray-50 py-1 px-3 cursor-pointer text-left"
            :class="option.code === selected.code && 'text-indigo-500'"
            @click="selectCode(option), dropdownOpen = false"
          >
            <span>{{option.name}} ({{ option.code }}) +{{ option.dial_code }}</span>
            <svg class="shrink-0 mr-2 fill-current text-indigo-500" :class="option.code !== selected.code && 'invisible'" width="12" height="9" viewBox="0 0 12 9">
              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
            </svg>
          </button>          
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import phoneCodesList from '@/plugins/countryCodes.js'

export default {
  name: 'DropdownPhoneCode',
  props: ['isDialog'],
  setup(_, { emit }) {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)    
    const selected = ref({
      name: "Russia",
      dial_code: "7",
      code: "RU"
    })

    const options = ref(phoneCodesList)

    const selectCode = (option) => {
      selected.value = option
      emit('changeCode', option)
    }

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

      selectCode,
    }
  }
}
</script>