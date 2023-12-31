<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="modalOpen" class="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="modalOpen" :id="id" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6" role="dialog" aria-modal="true">
      <div
        ref="modalContent"
        class="bg-white rounded shadow-lg overflow-auto w-full max-h-full relative"
        :class="[customPadding ? customPadding : 'px-10 py-3', width, {'max-w-lg': !maxWidth}]"
        :style="{maxWidth: maxWidth}"
      >
        <!-- <XIcon @click="$emit('close-modal')" class="absolute top-[10px] right-[10px] h-5 w-5 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all" /> -->
        <!-- :class="{width: width !== undefined, 'max-w-lg' : width == undefined , 'px-10 py-3' : !customPadding }" -->
        <!-- :class="width !== undefined ? width : 'max-w-lg' customPadding ? '' : 'px-10 py-3'" -->
        <!-- align === 'right' ? 'right-0' : 'left-0' -->
        <!-- Modal header -->
        <div 
          v-if="title"
          class="px-5 py-3"
          :class="underline !== undefined ? underline : 'border-b border-gray-200'"
        >
          <div class="flex justify-between items-center">
            <div
              class="font-semibold text-gray-800"
              :class="{ header : header !== '', 'text-lg' : header == '' }"
            >
              <!-- :class="header !== '' ? header : 'text-lg'" -->
              {{ title }}
              </div>
            <button class="text-gray-400 hover:text-gray-500" @click.stop="$emit('close-modal')">
              <div class="sr-only">Close</div>
              <svg v-if="close" class="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
              </svg>
            </button>
          </div>
        </div>
        <slot />       
      </div>
    </div>
  </transition>
</template>

<script>

import { ref, onMounted, onUnmounted } from 'vue'
import { XIcon } from '@heroicons/vue/outline'

export default {
  name: 'ModalBasic',
  props: ['id', 'modalOpen', 'title', 'width', 'maxWidth', 'close', 'underline', 'header', 'customPadding'],
  emits: ['close-modal'],
  components: {
    XIcon,
  },
  setup(props, { emit }) {

    const modalContent = ref(null)

    // close on click outside
    // const clickHandler = ({ target }) => {
    //   if (!props.modalOpen || modalContent.value.contains(target)) return
    //   emit('close-modal')
    // }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.modalOpen || keyCode !== 27) return
      emit('close-modal')
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
      modalContent,
    }
  }  
}
</script>