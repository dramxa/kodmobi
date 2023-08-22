<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <!-- <img class="w-8 h-8 rounded-full" :src="UserAvatar" width="32" height="32" alt="User" /> -->
      <div class="flex items-center justify-center bg-gray-100 rounded-full w-8 h-8 text-xs font-semibold uppercase text-gray-500">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#F3F5F8"/>
          <path d="M21.3214 21.875H17.6786C13.9902 21.875 11 24.9531 11 28.75C11 29.4402 11.5438 30 12.2143 30H26.7857C27.4562 30 28 29.4402 28 28.75C28 24.9531 25.0098 21.875 21.3214 21.875ZM12.859 28.125C13.1588 25.6602 15.2045 23.75 17.6786 23.75H21.3214C23.794 23.75 25.8408 25.6621 26.1406 28.125H12.859ZM19.5 20C22.1824 20 24.3571 17.7613 24.3571 15C24.3571 12.2387 22.1824 10 19.5 10C16.8176 10 14.6429 12.2387 14.6429 15C14.6429 17.7617 16.8172 20 19.5 20ZM19.5 11.875C21.1738 11.875 22.5357 13.277 22.5357 15C22.5357 16.723 21.1738 18.125 19.5 18.125C17.8262 18.125 16.4643 16.7227 16.4643 15C16.4643 13.277 17.8266 11.875 19.5 11.875Z" fill="#808894"/>
        </svg>
        <!-- {{avatarName}} -->
      </div>
      <div class="flex items-center truncate">
        <span class="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
        </span>
        <svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
          <div class="font-medium text-gray-800">{{ name ? name : 'User' }}</div>
          <div class="text-xs text-gray-500 italic">Administrator</div>
        </div>
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <router-link class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3" to="/profile/setting" @click="dropdownOpen = false">Personal settings</router-link>
          </li>
          <li>
            <router-link class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3" to="/balance" @click="dropdownOpen = false">Balance</router-link>
          </li>
          <li>
            <span class="font-medium text-sm text-rose-500 hover:text-rose-600 flex items-center py-1 px-3 cursor-pointer" @click="signOut">Sign Out</span>
          </li>
        </ul>
      </div> 
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import UserAvatar from '../../assets/user-avatar-32.png'

export default {
  name: 'DropdownProfile',
  props: ['align'],
  data() {
    return {
      UserAvatar: UserAvatar,
    }
  },
  computed: {
    ...mapFields('ProfileModule', {
      name: 'name',
    }),
    avatarName() {
      if(this.name.indexOf(' ') != -1){
        return this.name.substring(0, 1) + this.name.substring(this.name.indexOf(' ') + 1, this.name.indexOf(' ') + 2);
      }else{
        return this.name.substring(0, 2);
      }
      
    }
  },
  methods: {
    ...mapActions('AuthModule', ['LOGOUT']),
    signOut() {
      this.dropdownOpen = false
      console.log('logout')
      this.LOGOUT()
    }
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