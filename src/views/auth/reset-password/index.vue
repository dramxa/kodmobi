<template>
  <div class="w-[344px] mx-auto py-8 rounded-lg">
    <h1 class="text-3xl text-gray-800 font-bold mb-6">Reset password</h1>
    <!-- Form -->
    <form>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="password">New password <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="password"
              id="password"
              :class="{'border-rose-300 text-rose-500':error.password}"
              class="form-input w-full"
              :type="typePass"
              autoComplete="on"
              placeholder="New password"
              required
              @focus="error.password = false"
            />
            <EyeChangeIcon
              :class="{'text-rose-400 hover:text-rose-600': error.password, 'text-gray-400 hover:text-gray-600': !error.password}"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="confpass">Confirm password <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              id="confpass"
              :class="{'border-rose-300 text-rose-500':error.confirmPassword}"
              class="form-input w-full"
              :type="typePass"
              autoComplete="on"
              placeholder="Confirm password"
              required
              @focus="error.confirmPassword = false"
            />
            <EyeChangeIcon
              :class="{'text-rose-400 hover:text-rose-600': error.confirmPassword, 'text-gray-400 hover:text-gray-600': !error.confirmPassword}"
            />
          </div>
          <div v-if="error.message_error" class="text-xs mt-1 text-rose-500">{{error.message_error}}</div>
        </div>
      </div>
      <div class="flex items-center mt-6 justify-end">
        <!-- <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm" to="/">Send Reset Link</router-link> -->
        <button
          class="btn min-w-[150px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm"
          @click.stop.prevent="changePassword"
        >
          Change Password
        </button>
      </div>
    </form>
    <!-- <ModalBlank id="success-modal" :modalOpen="successModalOpen" @close-modal="successModalOpen = false">
      <div class="p-5 flex space-x-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
          <svg class="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
          </svg>
        </div>
        <div>
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Password sent</div>
          </div>
          <div class="text-sm">
            <div class="space-y-2">
              <p>The new password has been successfully sent to your email</p>
            </div>
          </div>
        </div>
      </div>
    </ModalBlank> -->
  </div>
</template>

<script>

// import ModalBlank from '../../../components/Modals/ModalBlank.vue'
import { EyeOffIcon, EyeIcon } from '@heroicons/vue/outline'
import EyeChangeIcon from '@/components/Icon/EyeChangeIcon.vue'
import { mapActions } from 'vuex';
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {
  name: 'Reset-password',
  data: () => ({
    password: '',
    confirmPassword: '',
    error: {
      password: false,
      confirmPassword: false,
      message_error: '',
    },
    // successModalOpen: false,
    // error_passwords: false,
    typePass: 'password',
  }),
  components: {
    EyeOffIcon,
    EyeIcon,
    EyeChangeIcon,
    // ModalBlank,
  },
  methods: {
    ...mapActions('AuthModule', ['RESET_PASSWORD', 'CHECK_HASH']),
    async changePassword() {
      this.error.password = false
      this.error.confirmPassword = false
      this.error.message_error = ''
      if (this.password == '' || this.password.length < 5 || this.confirmPassword == '' || this.confirmPassword.length < 5) {
        this.error.password = true
        this.error.confirmPassword = true
        this.error.message_error = 'The password must contain at least 6 symbols'
        return;
      }
      if (this.password != this.confirmPassword) {
        this.error.password = true
        this.error.confirmPassword = true
        this.error.message_error = 'Passwords do not match'
        return;
      }
      const data = {
        hash: this.$route.params.hash,
        password: this.password,
        password_confirmation: this.confirmPassword,
      }
      const res = await this.RESET_PASSWORD(data)
      console.log(res)
      if (res.success) {
        toast.success(res.data.message)
        this.$router.push('/auth/signin')
      } else {
        toast.error(res.error)
      }
    },
    SendNewPassword() {
      if(!this.errorMessage) {
        this.error.message_error = 'Placeholder all fields'
        if(this.password === '')
          this.error.password = true

        if(this.confirmPassword === '')
          this.error.confirmPassword = true
      } else {
        if(this.password !== this.confirmPassword) {
          this.error.confirmPassword = true
          this.error.message_error = 'Passwords do not match'
        } else {
          this.error.message_error = ''
          // this.successModalOpen = true
          this.$router.push('/auth/signin') // временно
          // показывать notification
        }
      }
    }
  },
  computed: {
    errorMessage() {
      return this.password !== '' && this.confirmPassword !== ''
    }
  },
  async beforeMount() {
    const data = {
      hash: this.$route.params.hash
    }
    const res = await this.CHECK_HASH(data)
    if (!res.success) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>