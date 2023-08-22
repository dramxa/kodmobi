<template>
  <div class="w-[344px] mx-auto py-8 rounded-lg">
    <h1 class="text-3xl text-gray-800 font-bold mb-6">Reset your Password</h1>
    <!-- Form -->
    <form>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Email Address</label>
          <div class="relative">
            <input
              v-model="email"
              id="email"
              :class="{'border-rose-300 text-rose-500':error.email}"
              class="form-input w-full"
              type="email"
              placeholder="Email"
              @focus="error.email = false"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon
                @click="email = ''"
                :class="{'text-rose-400 hover:text-rose-600': error.email, 'text-gray-400 hover:text-gray-600': !error.email}"
                class="h-5 w-5 text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
          <div v-if="error.email" class="text-xs mt-1 text-rose-500">{{error.message_error}}</div>
        </div>
      </div>
      <div class="flex items-center mt-6 justify-between">
        <!-- <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm" to="/">Send Reset Link</router-link> -->
        <!-- <button
          v-if="showBackBtn"
          @click.stop.prevent="showBack"
          class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Back to login page
        </button> -->
        <div class="px-3 flex items-center cursor-pointer" @click.stop.prevent="showBack">
          <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.79242 2.20677L1.55476 7.45682C1.41341 7.59842 1.33341 7.79464 1.33341 7.99995C1.33341 8.20526 1.41341 8.4012 1.55476 8.54308L6.79242 13.7931C7.07793 14.0783 7.52985 14.0675 7.80245 13.7677C8.07493 13.4709 8.06469 12.9943 7.77827 12.7071L3.8292 8.75082H13.9522C14.3465 8.75082 14.6667 8.41456 14.6667 8.0005C14.6667 7.58643 14.3465 7.2508 13.9522 7.2508H3.83106L7.78013 3.29452C8.06612 3.00678 8.07504 2.53022 7.80423 2.2324C7.53045 1.9324 7.10489 1.92177 6.79242 2.20677Z" fill="#6366F1"/>
          </svg>
          <span class="text-sm text-indigo-500 font-medium">Back to Login</span>
        </div>
        <button
          v-if="!resetTimer"
          @click.stop.prevent="SendResetLink"
          :disabled="isDisabled"
          class="btn min-w-[150px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Send Reset Link
        </button>
        <button
          v-else
          @click.stop.prevent="SendResetLink"
          :disabled="!isNaN(parseFloat(resetTimer)) && isFinite(resetTimer)"
          class="btn min-w-[150px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Send again {{ outputTimer }}
        </button>
      </div>
    </form>
    <ModalBlank id="success-modal" :modalOpen="successModalOpen" @close-modal="successModalOpen = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
          <svg class="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
          </svg>
        </div>
        <!-- Content -->
        <div>
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Password sent</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm">
            <div class="space-y-2">
              <p>The new password has been successfully sent to your email</p>
            </div>
          </div>
          <!-- Modal footer -->
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script>

import { XIcon } from '@heroicons/vue/outline'
import ModalBlank from '../../../components/Modals/ModalBlank.vue'
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'Reset-link',
  data: () => ({
    showBackBtn: false,
    email: '',
    error: {
      email: false,
      message_error: '',
    },
    resendTimer: 15,
    resetTimer: null,
    show: {
      sendMessage: false,
      errorMessage: false,
      time: true
    },
  }),
  components: {
    XIcon,
    ModalBlank
  },
  methods: {
    ...mapActions('AuthModule', ['RESET_LINK']),
    showBack() {
      this.showBackBtn = false
      this.$router.push('/auth/signin')
    },
    SendResetLink() {
      if(!this.errorMessage) {
        this.error.email = true
        this.error.message_error = 'Fill in the email field'
      } else {
        this.error.email =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)
        if(this.error.email) {
          this.error.email = false
          this.resendTimer = 15
          this.timer()
          this.RESET_LINK({ email: this.email })
          this.showBackBtn = true
        } else {
          this.error.email = true
          this.error.message_error = 'Invalid email'
        }
      }
    },
    timer() {
      if (this.resendTimer > 1) {
        this.resendTimer -= 1;
        this.resetTimer = setTimeout(this.timer, 1000);
      } else {
        this.resendTimer = this.defaultResendTimer;
        this.resetTimer = null;
        this.show.errorMessage = false;
        this.show.sendMessage = false;
      }
    },
  },
  computed: {
    ...mapFields('AuthModule', {
      successModalOpen: 'reset.successModalOpen',
      // disable_btn: 'reset.disable_btn',
    }),
    errorMessage() {
      return this.email !== ''
    },
    isDisabled() {
      return this.email == ''
    },
    outputTimer() {
      const timer = this.resendTimer;
      const minutes = Math.floor(timer / 60);
      const seconds = (timer % 60).toString().padStart(2, '0');

      return `${minutes}:${seconds}`;
    },
  }
}
</script>

<style scoped>

</style>