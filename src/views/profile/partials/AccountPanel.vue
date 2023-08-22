<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 font-bold mb-5">My Account</h2>
      <section>
        <div class="sm:flex sm:items-top space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Name</label>
            <div class="relative">
              <input
                v-model="form.name"
                id="name"
                class="form-input w-full"
                :class="{'border-rose-500': error.name}"
                type="text"
                placeholder="Name"
                required
                @keypress="keypressName($event)"
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="form.name != ''" @click="form.name = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.name" class="text-sm text-rose-500">Name is required</div>
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Email Address </label>
            <div class="relative">
              <input
                v-model="form.email"
                id="email"
                class="form-input w-full"
                :class="{'border-rose-500': error.email}"
                type="email"
                placeholder="Email"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="form.email != ''" @click="form.email = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.email" class="text-sm text-rose-500">Incorrect Email</div>
          </div>
          <!-- <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Surname</label>
            <div class="relative">
              <input
                v-model="surname"
                id="surname"
                class="form-input w-full"
                type="text"
                placeholder="surname"
                required
                @keypress="keypressName($event)"
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click="surname = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
          </div> -->
        </div>
        <!-- <div class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="phone">Phone </label>
            <div class="relative">
              <input
                v-model="form.phone"
                id="phone"
                class="form-input w-full"
                :class="{'border-rose-500': error.phone}"
                type="text"
                autocomplete="off"
                placeholder="Phone number"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="form.phone != ''" @click="form.phone = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.phone" class="text-sm text-rose-500">Phone is required</div>
          </div>
        </div> -->
        <div class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600">Language</label>
            <DropdownLang />
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600">Currency</label>
            <DropdownCurrency v-model="currency" />
          </div>
        </div>
      </section>
      <section>
        <h3 class="text-xl leading-snug text-gray-800 font-bold mb-5">Password</h3>
        <div class="mb-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="curpass">Current password <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="currentPassword"
                id="curpass"
                :class="{'border-rose-300 text-rose-500':error.currentPassword}"
                class="form-input w-full"
                :type="typePass"
                autoComplete="off"
                placeholder="Current password"
                required
                @focus="error.currentPassword = false"
              />
              <EyeChangeIcon
                :class="{'text-rose-400 hover:text-rose-600': error.currentPassword, 'text-gray-400 hover:text-gray-600': !error.currentPassword}"
              />
            </div>
          </div>
        </div>
        <div class="sm:flex sm:items-top space-y-4 sm:space-y-0 sm:space-x-4 mb-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="password">Password <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="password"
                id="password"
                :class="{'border-rose-300 text-rose-500':error.password}"
                class="form-input w-full"
                :type="typePass"
                autoComplete="off"
                placeholder="Password"
                required
                @focus="error.password = false"
              />
              <EyeChangeIcon
                :class="{'text-rose-400 hover:text-rose-600': error.password, 'text-gray-400 hover:text-gray-600': !error.password}"
              />
            </div>
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="confpass">Confirm password <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                id="confpass"
                :class="{'border-rose-300 text-rose-500':error.confirmPassword}"
                class="form-input w-full"
                :type="typePass"
                autoComplete="off"
                placeholder="Confirm password"
                required
                @focus="error.confirmPassword = false"
              />
              <EyeChangeIcon
                :class="{'text-rose-400 hover:text-rose-600': error.confirmPassword, 'text-gray-400 hover:text-gray-600': !error.confirmPassword}"
              />
            </div>
            <div v-if="error.confirmPassword" class="text-xs mt-1 text-rose-500">Passwords do not match</div>
          </div>
        </div>
        <!-- <button
              @click="SetNewPassword"
              class="btn border-gray-200 shadow-sm text-indigo-500 hover:text-indigo-600 hover:border-indigo-500 duration-500"
            >
              Set New Password
            </button> -->
        <!-- <div>
            <span class="text-gray-800 block mb-3 font-semibold">Password requirements:</span>
            <span class="text-gray-800 block mb-3">Ensure that these requirements are met:</span>
            <ul class="list-disc">
              <li class="text-gray-800 ml-6 mb-1">Minimum 8 characters long - the more, the better</li>
              <li class="text-gray-800 ml-6 mb-1">At least one lowercase character</li>
              <li class="text-gray-800 ml-6 mb-1">At least one uppercase character</li>
              <li class="text-gray-800 ml-6 mb-1">At least one number, symbol, or whitespace character</li>
            </ul>
          </div> -->
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-gray-200">
        <div class="flex self-end">
          <!-- <button class="btn border-gray-200 hover:border-gray-300 text-gray-600">Cancel</button> -->
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white min-w-[100px] ml-3" @click="saveChanges">Save</button>
        </div>
      </div>
    </footer>
  </div>  
</template>

<script>
import { ref } from 'vue'
import { XIcon, EyeOffIcon, EyeIcon } from '@heroicons/vue/outline'
import EyeChangeIcon from '@/components/Icon/EyeChangeIcon.vue'
import DropdownCurrency from '@/components/Dropdown/DropdownCurrency.vue'
import DropdownLang from '@/components/Dropdown/DropdownLang.vue'
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

export default {
  name: 'AccountPanel',
  data: () => ({
    showPassword: false,
    typePass: 'password',
    userName: '',
    currency: 'usd',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    form: {
      name: '',
      email: '',
      phone: '',
    },
    error: {
      name: false,
      email: false,
      currentPassword: false,
      password: false,
      confirmPassword: false,
      message_error: '',
    }
  }),
  components: {
    EyeIcon,
    EyeOffIcon,
    XIcon,
    EyeChangeIcon,
    DropdownCurrency,
    DropdownLang
  },
  methods: {
    ...mapActions('ProfileModule', ['UPDATE_PROFILE', 'UPDATE_PASSWORD']),
    async saveChanges() {
      console.log(this.form.name)
      this.error.currentPassword = false;
      this.error.name = false;
      this.error.email = false;
      this.error.phone = false;
      this.error.confirmPassword = false;
      if(!this.form.name || this.form.name == '') {
        this.error.name = true;
      }
      if(!this.form.email || this.form.email == '') {
        this.error.email = true;
      }
      if(!this.form.name || !this.form.email || this.form.name == '' || this.form.email == '') {
        return
      }
      const data = {
        name: this.form.name,
        email: this.form.email,
      }
      // if (this.phone.slice(0,1) == '8') {
      //   data.phone = `7${this.form.phone.slice(1,this.form.phone.length)}`
      // } else {
      //   data.phone = this.form.phone;
      // }
      if (this.password) {
        if (this.password != this.confirmPassword) {
          this.error.confirmPassword = true;
          return;
        } else {
          data.current_password = this.currentPassword;
          data.password = this.password;
          data.password_confirmation = this.confirmPassword;
        }
      }
      const res = await this.UPDATE_PROFILE(data);
      console.log(res)
      if (!res.success) {
        if (res.errors.current_password) {
          this.error.currentPassword = true;
        }
        if (res.errors.email) {
          this.error.email = true
        }
      }
    },
    SetNewPassword() {
      if(!this.errorMessage) {
        this.error.message_error = 'Placeholder all fields'
        if(this.password === '')
          this.error.password = true

        if(this.confirmPassword === '')
          this.error.confirmPassword = true
      } else if(this.password !== this.confirmPassword) {
        this.error.confirmPassword = true
        this.error.message_error = 'Passwords do not match'
      } 
      // else if(this.password.length < 8) {
      //   this.error.confirmPassword = true
      //   this.error.message_error = 'Minimum 8 characters long'
      // } 
      else {
        this.error.message_error = ''
        const data = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        }
        this.UPDATE_PASSWORD(data)
      }
    },
    keypressName(e) {
      if (!/^[A-Za-z,А-Яа-я]+$/.test(e.key)) {
        return e.preventDefault();
      }
    }
  },
  watch: {
    name: {
      handler(val) {
        this.userName = val
      }
    },
    profile: {
      handler(val) {
        this.form.name = val.name
        this.form.email = val.email
        this.form.phone = val.phone
      }
    }
  },
  computed: {
    ...mapFields('ProfileModule', {
      profile: 'profile',
      id: 'id',
      name: 'name',
      surname: 'surname',
      email: 'email',
      phone: 'phone',
      password: 'new_password.password',
      confirmPassword: 'new_password.confirm_password',
    }),
    errorMessage() {
      return this.password !== '' && this.confirmPassword !== ''
    }
  },
  mounted() {
    // this.GET_PROFILE()
    this.form.name = this.profile?.name || ''
    this.form.email = this.profile?.email || ''
    this.form.phone = this.profile?.phone || ''
  }
}
</script>