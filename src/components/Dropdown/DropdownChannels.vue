<template>
  <div class="relative inline-flex" :class="loginPage ? 'ml-1' : 'w-full'">
    <div
      v-if="loginPage"
      ref="trigger"
      class="flex items-center text-indigo-500 text-sm"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <div class="border-b border-indigo-500 leading-none">{{ selectedChannelName.name }}</div>
      <svg class="ml-1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.7869 4.56252L6.46872 8.3064C6.33804 8.44244 6.16758 8.5 5.99996 8.5C5.83235 8.5 5.66246 8.44276 5.53121 8.32832L1.21298 4.58444C0.939541 4.34571 0.928035 3.94843 1.18635 3.69674C1.44558 3.44328 1.87897 3.43433 2.15056 3.67222L6.00004 7.0315L9.84951 3.67222C10.1212 3.43429 10.5526 3.44329 10.8137 3.69674C11.0719 3.92415 11.0605 4.32182 10.7869 4.56252Z" fill="#6366F1"/>
      </svg>
    </div>
    <button
      v-else
      ref="trigger"
      class="btn w-full justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <div class="flex items-center">
        <span class="font-normal text-gray-800">{{ selectedChannelName.name }}</span>
        <!-- <span class="ml-3 inline-block" v-if="channelsTimer[`${selectedChannelName.type}`].timer > 0">(Send the code again after {{ outputTimer(selectedChannelName.type) }})</span> -->
      </div>
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
      <div v-show="dropdownOpen" class="z-10 absolute top-full left-0 min-w-[200px] w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
        <div
          ref="dropdown"
          class="font-medium text-sm text-gray-600 divide-y divide-gray-200"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >

          <button
            v-for="channel in channels"
            :key="channel.type"
            class="flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
            :class="channel.type === selectedChannelType && 'text-indigo-500'"
            @click.stop="changeChannel(channel.type)"
          >
            <div>
              <span>{{channel.name}}</span>
              <!-- <span v-if="channelsTimer[`${channel.type}`].timer > 0">({{ channelsTimer[`${channel.type}`].timer }})</span> -->
              <!-- <span class="ml-3 inline-block" v-if="channelsTimer[`${channel.type}`].timer > 0">({{ outputTimer(channel.type) }})</span> -->
            </div>
            <svg class="shrink-0 ml-2 fill-current text-indigo-400" :class="channel.type !== selectedInList && 'invisible'" width="12" height="9" viewBox="0 0 12 9">
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

export default {
  name: 'DropdownFull',
  props: ['channels', 'channelsTimer', 'loginPage'],
  data: () => ({
    selected: undefined,
    selectedChannelType: '',
  }),
  methods: {
    changeChannel(type) {
      this.dropdownOpen = false
      this.selectedChannelType = type
      this.selected = this.channels.findIndex(el => {
        return el.type === type
      });
    },
    outputTimer(type) {
      const timer = this.channelsTimer[`${type}`].timer;
      const minutes = Math.floor(timer / 60);
      const seconds = (timer % 60).toString().padStart(2, "0");

      return `${minutes}:${seconds}`;
    }
  },
  computed: {
    selectedChannelName() {
      if (this.selected !== undefined) {
        this.$emit('selectedChannel', this.channels[this.selected])
        return this.channels[this.selected]
      } else {
        return {
          name: 'Select channel',
        }
      }
    },
    selectedInList() {
      if (this.selected) {
        return this.channels[this.selected].type
      } else {
        return undefined;
      }
    }
  },
  setup() {
    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)    
    // const selected = ref(1)

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
    }
  }
}
</script>