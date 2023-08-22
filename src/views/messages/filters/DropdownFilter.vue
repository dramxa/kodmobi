<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Filter</span><wbr />
      
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.33301 3.55588C1.33301 3.06505 1.7595 2.66699 2.28539 2.66699H13.714C14.2407 2.66699 14.6663 3.06505 14.6663 3.55588C14.6663 4.04755 14.2407 4.44477 13.714 4.44477H2.28539C1.7595 4.44477 1.33301 4.04755 1.33301 3.55588ZM3.23777 8.00033C3.23777 7.50866 3.66426 7.11144 4.19015 7.11144H11.8092C12.336 7.11144 12.7616 7.50866 12.7616 8.00033C12.7616 8.49199 12.336 8.88921 11.8092 8.88921H4.19015C3.66426 8.88921 3.23777 8.49199 3.23777 8.00033ZM8.95206 13.3337H7.04729C6.52051 13.3337 6.09491 12.9364 6.09491 12.4448C6.09491 11.9531 6.52051 11.5559 7.04729 11.5559H8.95206C9.47884 11.5559 9.90444 11.9531 9.90444 12.4448C9.90444 12.9364 9.47884 13.3337 8.95206 13.3337Z" fill="#ADB3BC"/>
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-56 bg-white border border-gray-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
        <div ref="dropdown">
          <div class="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">Filters</div>
          <ul class="mb-4">
            <li class="py-1 px-3">
              <label class="flex items-center">
                <input v-model="watsappCheckbox" type="checkbox" class="form-checkbox" />
                <span class="text-sm font-medium ml-2">WhatsApp</span>
              </label>
            </li>
            <li class="py-1 px-3">
              <label class="flex items-center">
                <input v-model="telegramCheckbox" type="checkbox" class="form-checkbox" />
                <span class="text-sm font-medium ml-2">Telegram</span>
              </label>
            </li>
            <li class="py-1 px-3">
              <label class="flex items-center">
                <input v-model="smsCheckbox" type="checkbox" class="form-checkbox" />
                <span class="text-sm font-medium ml-2">SMS</span>
              </label>
            </li>
          </ul>
          <div class="py-2 px-3 border-t border-gray-200 bg-gray-50">
            <ul class="flex items-center justify-between">
              <li>
                <button @click="clearSelection" class="btn-xs bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600">Clear</button>
              </li>
              <li>
                <button class="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" @click="applySelection" @focusout="dropdownOpen = false">Apply</button>
              </li>
            </ul>
          </div>          
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { ref, onMounted, onUnmounted } from 'vue'
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'DropdownFilter',
  props: ['align'],
  data: () => ({
    watsappCheckbox: false,
    telegramCheckbox: false,
    smsCheckbox: false,
  }),
  methods: {
    ...mapActions('BillingModule', ['GET_BILLING']),
    clearSelection() {
      this.watsappCheckbox = false
      this.telegramCheckbox = false
      this.smsCheckbox = false
    },
    applySelection() {
      this.dropdownOpen = false
      const data = {}
      if(this.watsappCheckbox)
        data.watsapp = true
      if(this.telegramCheckbox)
        data.telegram = true
      if(this.smsCheckbox)
        data.sms = true
      
      this.GET_BILLING({...data, project_id: this.active_project.id})
    }
  },
  computed: {
    ...mapFields('BillingModule', {
      current_page: 'billing_meta.current_page',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

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
    }
  }
}
</script>