<template>
  <div class="w-[344px] mx-auto py-8 rounded-lg">
    <h1 v-if="activeTab != 'tg'" class="text-3xl text-gray-800 font-bold mb-6">{{ activeTab == 'code' ? 'Enter the code' : 'Sign Up' }}</h1>
    <div v-if="activeTab == 'code'" class="flex items-center mb-6">
      <span class="text-gray-600 text-sm">Sent by number <span class="text-gray-700 font-medium">{{phoneCode}}{{form_signup.phone}}</span> via</span>
      <DropdownChannels
        ref="dropdownChannels"
        :loginPage="true"
        :channels="client_channels"
        :channelsTimer="channelsTimer"
        @selectedChannel="selectChannel"
      />
    </div>
    <div v-if="activeTab == 'tg'" class="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3690_120490)">
          <rect width="119.997" height="119.997" rx="59.9986" fill="#039BE5"/>
          <path d="M26.925 57.3231C33.5607 53.6821 40.9679 50.6433 47.8889 47.5889C59.7956 42.5861 71.7497 37.67 83.8243 33.0932C86.1737 32.3133 90.3948 31.5507 90.8087 35.0188C90.5821 39.9278 89.6498 44.8081 89.0102 49.6884C87.387 60.4206 85.511 71.1161 83.6815 81.813C83.0512 85.376 78.5704 87.2206 75.7033 84.9404C68.8131 80.3042 61.8699 75.7132 55.0676 70.9695C52.8394 68.7141 54.9056 65.4753 56.8957 63.8647C62.5707 58.2936 68.5891 53.5603 73.9675 47.7013C75.4183 44.2113 71.1317 47.1526 69.7178 48.0538C61.9486 53.3869 54.3697 59.0456 46.1786 63.7327C41.9946 66.0271 37.1181 64.0664 32.936 62.7861C29.1862 61.2396 23.6914 59.6815 26.9246 57.3234L26.925 57.3231Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_3690_120490">
            <rect width="119.997" height="119.997" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <div class="text-2xl font-bold text-gray-800 my-4">Telegram</div>
      <div v-if="checkTelegramError" class="text-center text-rose-500 mb-[70px]">You are still not logged in to the bot, please try again</div>
      <div v-else class="text-center text-gray-600 mb-[70px]">To use this communication channel, you need to log in to the bot</div>
      <a class="btn btn-lg w-full bg-indigo-500 text-white mb-[22px] text-base" target="_blank" :href="telegramLink">Log in to the bot</a>
      <div class="font-medium text-indigo-500 cursor-pointer" @click="checkChannel">Check status</div>
    </div>
    <!-- Form -->
    <!-- <div v-if="activeTab != 'code' && activeTab != 'tg'" class="flex relative mb-[17px]">
      <ul class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
        <li class="last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
          <a class="block pb-3 whitespace-nowrap px-4" :class="[activeTab == 'email' ? 'border-b-2 border-indigo-500 text-indigo-500 hover:text-indigo-500' : 'text-gray-500 hover:text-gray-600']" href="#0" @click="activeTab = 'email'">Email</a>
        </li>
        <li class="last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
          <a class="block pb-3 whitespace-nowrap px-4" :class="[activeTab == 'phone' ? 'border-b-2 border-indigo-500 text-indigo-500 hover:text-indigo-500' : 'text-gray-500 hover:text-gray-600']" href="#0" @click="activeTab = 'phone'">Phone number</a>
        </li>
      </ul>
    </div> -->
    <div v-if="activeTab == 'code'">
      <div class="flex items-center justify-between text-gray-600 text-sm mb-1">
        <span class="font-medium">Code</span>
        <span v-if="channelsTimer[`${activeChannel}`].timer > 0">{{outputTimer(activeChannel)}}</span>
        <span v-else class="text-indigo-500 hover:text-indigo-600 font-medium cursor-pointer" @click="sendCode()">Send again</span>
      </div>
      <input
        v-model="code"
        id="code"
        :class="{'border-rose-500 text-rose-500':form_signup.error.error_code}"
        class="form-input w-full"
        type="text"
        autoComplete="on"
        placeholder="Code"
        required
        @keypress="keypressCode($event, code)"
        @focus="form_signup.error.error_code = false"
        @change="clearErrors"
      />
      <div v-if="form_signup.error.error_code" class="text-xs mt-1 text-rose-500">Invalid code</div>
      <div class="flex items-center justify-between mt-6">
        <div class="text-indigo-500 flex items-center cursor-pointer" @click="clickBack()">
          <ArrowLeftIcon
            class="mr-2 h-5 w-5"
          />
          <span class="font-medium text-sm">Back</span>
        </div>
        <button @click.prevent="checkCode" class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm">
          Next
          <ArrowRightIcon
            class="ml-2 h-5 w-5 text-white"
          />
        </button>
      </div>
    </div>
    <div v-if="activeTab == 'phone'">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1 text-gray-600" for="country">Country</label>
        <div class="h-[38px] rounded flex items-center justify-between px-3 border border-gray-200 hover:border-gray-300 cursor-pointer" @click="countryModalOpen = true">
          <span class="text-gray-800 text-sm">{{selectedCountry}}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1804 6.84378L9.70308 12.4596C9.50705 12.6637 9.25137 12.75 8.99995 12.75C8.74852 12.75 8.49369 12.6641 8.29681 12.4925L1.81947 6.87666C1.40931 6.51856 1.39205 5.92264 1.77952 5.54512C2.16837 5.16492 2.81845 5.1515 3.22584 5.50832L9.00005 10.5473L14.7743 5.50832C15.1817 5.15144 15.829 5.16494 16.2206 5.54512C16.6078 5.88622 16.5908 6.48273 16.1804 6.84378Z" fill="#ADB3BC"/>
          </svg>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-600" for="phone">Phone number</label>
        <div class="flex items-center">
          <div>
            <input
              v-model="phoneCode"
              id="phoneCode"
              type="phone"
              class="form-input w-[66px] text-center"
              @keypress="keypressPhoneCode($event)"
              @input="keypressPhoneCode($event)"
            />
          </div>
          <div class="relative grow ml-1">
            <input
              v-model="form_signup.phone"
              id="phone"
              :class="{'border-rose-500 text-rose-500':form_signup.error.error_phone}"
              class="form-input w-full"
              type="phone"
              autoComplete="on"
              placeholder="Phone"
              required
              @keypress="keypressPhoneNumber($event, form_signup.phone)"
              @focus="form_signup.error.error_phone = false"
              @change="clearErrors"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon
                v-if="form_signup.phone != ''"
                @click="form_signup.phone = ''"
                class="h-5 w-5"
                :class="{'text-rose-400 hover:text-rose-600': form_signup.error.error_phone, 'text-gray-400 hover:text-gray-600': !form_signup.error.error_phone}"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-6">
        <div class="mr-1">
          <label class="flex items-center">
            <input
              v-model="form_signup.checkbox"
              :class="{'border-rose-300':form_signup.error.checkbox}"
              class="form-checkbox"
              type="checkbox"
              @focus="form_signup.error.checkbox = false"
            />
            <span class="text-sm ml-2 text-gray-600">I agree with the <a class="text-indigo-500 hover:underline" target="_blank" href="https://kod.mobi/privacy-policy.html">Privacy Policy</a></span>
          </label>
        </div>
        <button @click.prevent="signUpPhone" class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm w-[100px]">
          Next
          <ArrowRightIcon
            class="ml-2 h-5 w-5 text-white"
          />
        </button>
      </div>
    </div>
    <form v-if="activeTab == 'email'">
      <div class="space-y-4">
        <!-- <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Your Name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="form_signup.name"
              id="name"
              :class="{'border-rose-300 text-rose-500':form_signup.error.name}"
              class="form-input w-full"
              type="text"
              placeholder="Name"
              required
              @focus="form_signup.error.name = false"
              @keypress="keypressName($event)"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon
                @click="form_signup.name = ''"
                :class="{'text-rose-400 hover:text-rose-600': form_signup.error.name, 'text-gray-400 hover:text-gray-600': !form_signup.error.name}"
                class="h-5 w-5 text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
        </div> -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Email Address <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="form_signup.email"
              id="email"
              :class="{'border-rose-300 text-rose-500':form_signup.error.email}"
              class="form-input w-full"
              type="email"
              placeholder="Email"
              required
              @focus="form_signup.error.email = false"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon
                @click="form_signup.email = ''"
                :class="{'text-rose-400 hover:text-rose-600': form_signup.error.email, 'text-gray-400 hover:text-gray-600': !form_signup.error.email}"
                class="h-5 w-5 text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
          <div v-if="!errorEmail" class="text-xs mt-1 text-rose-500">Invalid email</div>
        </div>
        <!-- <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="phone">Phone number <span class="text-rose-500">*</span></label>
          <div class="flex items-center">
            <DropdownPhoneCode @changeCode="changeCode($event)" />
            <div class="relative grow ml-1">
              <input
                v-model="form_signup.phone"
                id="phone"
                :class="{'border-rose-300 text-rose-500':form_signup.error.phone}"
                class="form-input w-full"
                type="text"
                placeholder="Phone"
                required
                @focus="form_signup.error.phone = false"
                @keypress="keypressPhone($event)"
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon
                  @click="form_signup.phone = ''"
                  :class="{'text-rose-400 hover:text-rose-600': form_signup.error.phne, 'text-gray-400 hover:text-gray-600': !form_signup.error.name}"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                />
              </div>
            </div>
          </div>
        </div> -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="password">Password <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="form_signup.password"
              id="password"
              :class="{'border-rose-300 text-rose-500':form_signup.error.password}"
              class="form-input w-full"
              :type="typePass"
              autoComplete="on"
              placeholder="Password"
              required
              @focus="form_signup.error.password = false"
            />
            <EyeChangeIcon
              :class="{'text-rose-400 hover:text-rose-600': form_signup.error.password, 'text-gray-400 hover:text-gray-600': !form_signup.error.password}"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="confpass">Confirm password <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="form_signup.confirmPassword"
              id="confpass"
              :class="{'border-rose-300 text-rose-500': form_signup.error.confirmPassword}"
              class="form-input w-full"
              :type="typeConfirmPass"
              autoComplete="on"
              placeholder="Confirm password"
              required
              @focus="form_signup.error.confirmPassword = false"
            />
            <EyeChangeIcon
              :class="{'text-rose-400 hover:text-rose-600': form_signup.error.confirmPassword, 'text-gray-400 hover:text-gray-600': !form_signup.error.confirmPassword}"
            />
          </div>
        </div>
        <div v-if="!errorMessage || form_signup.error.error_message !== ''" class="text-xs mt-1 text-rose-500" v-html="form_signup.error.error_message" />
      </div>
      <div class="flex items-center justify-between mt-8">
        <div class="mr-1">
          <label class="flex items-center">
            <input
              v-model="form_signup.checkbox"
              :class="{'border-rose-300':form_signup.error.checkbox}"
              class="form-checkbox"
              type="checkbox"
              @focus="form_signup.error.checkbox = false"
            />
            <span class="text-sm ml-2 text-gray-600">I agree with the <a class="text-indigo-500 hover:underline" target="_blank" href="https://kod.mobi/privacy-policy.html">Privacy Policy</a></span>
          </label>
        </div>
        <button class="btn min-w-[100px] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm" @click.prevent="singup">Sign Up</button>
      </div>
      <div v-if="!errorCheckbox" class="text-xs mt-1 text-rose-500">{{form_signup.error.error_message_policy}}</div>
    </form>
    <div v-if="activeTab == 'phone' || activeTab == 'email'" class="pt-5 mt-5 border-t border-gray-200">
      <div class="text-sm flex">
        <span class="text-gray-600 text-sm mr-2">Have an account?</span>
        <router-link class="font-medium text-indigo-500 hover:text-indigo-600 text-sm" to="/auth/signin">Log In</router-link>
      </div>
    </div>
    <ModalBlank id="phone-country-modal" :modalOpen="countryModalOpen" :maxWidth="'376px'" @close-modal="countryModalOpen = false, search == ''">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Select country</div>
        <XIcon @click.stop="countryModalOpen = false, search == ''" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div class="px-5 mt-4">
        <div class="relative">
          <input
            v-model="search"
            id="search"
            class="form-input w-full pl-8"
            type="text"
            placeholder="Search..."
          />
          <svg class="absolute top-[11px] left-[12px]" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.818 13.5391L10.6766 10.3984C11.3564 9.56641 11.7315 8.51875 11.7315 7.375C11.7315 4.68203 9.5482 2.5 6.85521 2.5C4.16223 2.5 2 4.68273 2 7.375C2 10.0673 4.18309 12.25 6.85521 12.25C7.99904 12.25 9.04838 11.8537 9.87946 11.1944L13.0209 14.335C13.1522 14.4461 13.2976 14.5 13.4406 14.5C13.5836 14.5 13.7285 14.4451 13.8384 14.3352C14.0571 14.1156 14.0571 13.7594 13.818 13.5391ZM3.12531 7.375C3.12531 5.30734 4.8081 3.625 6.87631 3.625C8.94452 3.625 10.6273 5.30734 10.6273 7.375C10.6273 9.44266 8.94452 11.125 6.87631 11.125C4.8081 11.125 3.12531 9.44219 3.12531 7.375Z" fill="#ADB3BC"/>
          </svg>
        </div>
      </div>
      <div class="px-5 mb-2.5 mt-3 max-h-[330px] overflow-auto">
        <div v-for="(code, index) in filteredPhoneCodesList" :key="index" class="min-h-[38px] flex items-center font-medium border-b border-gray-200 cursor-pointer hover:bg-gray-50 px-2.5 py-1" @click="selectCountryCode(code)">
          <span class="text-gray-900 pr-6">{{ code.name }}</span>
          <span class="text-gray-500">+{{ code.dial_code }}</span>
        </div>
      </div>
      <div class="py-4 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="countryModalOpen = false, search == ''">Close</button>
      </div>
    </ModalBlank>
  </div>
</template>

<script>

import { XIcon, EyeOffIcon, EyeIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/outline'
import EyeChangeIcon from '@/components/Icon/EyeChangeIcon.vue'
import DropdownChannels from '@/components/Dropdown/DropdownChannelsAuth.vue'
import DropdownPhoneCode from '@/components/Dropdown/DropdownPhoneCode.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import { mapActions } from 'vuex';
import { useToast } from 'vue-toastification'
import phoneCodesList from '@/plugins/countryCodes.js'

const toast = useToast()

export default {
  name: 'Signup',
  data: () => ({
    activeTab: 'email',
    session_id: null,
    activeChannel: null,
    client_channels: [],
    code: '',
    checkTelegramError: false,
    phoneCode: '+7',
    selectedCountry: 'Russia',
    countryModalOpen: false,
    phoneCodesList,
    search: '',
    channelsTimer: {
      whatsapp: {
        send: false,
        timer: 0
      },
      telegram: {
        send: false,
        timer: 0
      },
      sms: {
        send: false,
        timer: 0
      }
    },
    resetTimer: null,
    resendTimerSms: 5,
    defaultResendTimer: 61, // секунды
    form_signup: {
      name: '',
      phone: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkbox: false,
      error: {
        error_phone: false,
        error_code: false,
        error_email: false,
        error_password: false,
        name: false,
        phone: false,
        surname: false,
        email: false,
        password: false,
        confirmPassword: false,
        checkbox: false,
        error_message: '',
        error_message_email: '',
        error_message_policy: ''
      }
    },
    showPassword: false,
    showConfirmPassword: false,
    typePass: 'password',
    typeConfirmPass: 'password',
  }),
  components: {
    EyeIcon,
    EyeOffIcon,
    XIcon,
    EyeChangeIcon,
    DropdownPhoneCode,
    DropdownChannels,
    ArrowRightIcon,
    ArrowLeftIcon,
    ModalBlank,
  },
  watch: {
    'channelsTimer.whatsapp.timer' (val, old) {
      if (this.channelsTimer.whatsapp.timer > 1) {
        setTimeout(() => {
          this.timerChannels('whatsapp')
        }, 1000)
      } else {
        this.channelsTimer.whatsapp.timer = 0;
        // this.channelsTimer.whatsapp.send = false;
      }
    },
    'channelsTimer.telegram.timer' (val, old) {
      if (this.channelsTimer.telegram.timer > 1) {
        setTimeout(() => {
          this.timerChannels('telegram')
        }, 1000)
      } else {
        this.channelsTimer.telegram.timer = 0;
        // this.channelsTimer.telegram.send = false;
      }
    },
    'channelsTimer.sms.timer' (val, old) {
      if (this.channelsTimer.sms.timer > 1) {
        setTimeout(() => {
          this.timerChannels('sms')
        }, 1000)
      } else {
        this.channelsTimer.sms.timer = 0;
        // this.channelsTimer.sms.send = false;
      }
    },
    phoneCode (val) {
      if (val.substring(0,1) == '+') {
        const code = val.substring(1)
        const findCode = this.phoneCodesList.find(c => c.dial_code == code)
        console.log(findCode)
        if (findCode) {
          this.selectedCountry = findCode.name
        } else {
          this.selectedCountry = 'Undefined Country'
        }
      }
    }
  },
  methods: {
    ...mapActions('AuthModule', ['SIGN_UP', 'SIGN_UP_PHONE', 'SEND_CODE', 'CHECK_CODE', 'CHECK_CHANNEL']),
    changeCode(value) {
      this.phoneCode = value.dial_code
    },
    selectCountryCode(code) {
      this.phoneCode = `+${code.dial_code}`
      this.selectedCountry = code.name
      this.search = ''
      this.countryModalOpen = false
    },
    async checkChannel() {
      const data = {
        session_id: this.session_id,
        type: 'telegram',
      }
      const res = await this.CHECK_CHANNEL(data);
      console.log(res);
      if(res.success) {
        if (res.data.is_active) {
          this.checkTelegramError = false;
          const index = this.client_channels.findIndex(e => e.type == 'telegram')
          this.client_channels[index].is_active = true
          // console.log(this.client_channels)
          this.activeTab = 'code'
          this.sendCode();
        } else {
          this.checkTelegramError = true;
        }
      } else {
        toast.error(res.error)
      }
    },
    timer() {
      if (this.resendTimerSms > 1) {
        this.resendTimerSms -= 1;
        this.resetTimer = setTimeout(this.timer, 1000);
      } else {
        this.resendTimerSms = this.defaultResendTimer;
        this.resetTimer = null;
      }
    },
    timerChannels(type) {
      this.channelsTimer[`${type}`].timer -= 1;
    },
    outputTimer(type) {
      const timer = this.channelsTimer[`${type}`].timer;
      const minutes = Math.floor(timer / 60);
      const seconds = (timer % 60).toString().padStart(2, "00");

      return `${minutes}:${seconds}`;
    },
    resetChannelsTimer() {
      this.channelsTimer.whatsapp.timer = 0
      this.channelsTimer.whatsapp.send = false
      this.channelsTimer.telegram.timer = 0
      this.channelsTimer.telegram.send = false
      this.channelsTimer.sms.timer = 0
      this.channelsTimer.sms.send = false
    },
    clickBack() {
      this.resetChannelsTimer()
      this.activeTab = 'phone'
    },
    selectChannel(channel) {
      this.activeChannel = channel.type
      if(channel.type === 'telegram') {
        if(!channel.is_active) {
          this.activeTab = 'tg'
          return;
        }
      }
      console.log(channel.is_active, !this.channelsTimer[channel.type].send)
      if (channel.is_active && !this.channelsTimer[channel.type].send) {
        this.sendCode()
      }
    },
    async signUpPhone() {
      this.form_signup.error.error_phone = false
      if (this.form_signup.phone == '') {
        this.form_signup.error.error_phone = true
        return;
      }
      if(this.form_signup.checkbox === false) {
        this.form_signup.error.checkbox = true
        this.form_signup.error.error_message = ""
        this.form_signup.error.error_message_policy = 'Accept privacy policy'
        return
      } else {
        this.form_signup.error.error_message_policy = ''
      }
      const phoneCode = this.phoneCode.replace('+', '')
      const res = await this.SIGN_UP_PHONE(`${phoneCode}${this.form_signup.phone}`)
      console.log(res)
      if (res.success) {
        this.resetChannelsTimer()
        this.client_channels = res.data.client_channels
        this.session_id = res.data.session_id;
        this.activeTab = 'code';
        this.resendTimerSms = this.defaultResendTimer;
        this.activeChannel = res.data.client_channels[0].type;
        this.channelsTimer[`${this.activeChannel}`].timer = this.defaultResendTimer;
        this.channelsTimer[`${this.activeChannel}`].send = true;

        clearTimeout(this.resetTimer);
        this.resetTimer = null;
        this.timer();
        this.timerChannels(this.activeChannel)
      } else {
        if (res.sys_message == 'ERROR_AUTH_PHONE_NOT_REGISTERED') {
          this.$router.push(`/auth/signup?phone=${this.form_signup.phone}`)
        } else {
          if (res.errors.phone) this.form_signup.error.error_phone = true
          toast.error(res.error)
        }
      }
    },
    async sendCode() {
      const data = {
        type: this.activeChannel,
        session_id: this.session_id,
      }
      const res = await this.SEND_CODE(data);
      console.log(res)
      if(res.success){
        this.isSendCode = true;
        this.resendTimerSms = this.defaultResendTimer;
        this.channelsTimer[`${this.activeChannel}`].timer = this.defaultResendTimer
        this.channelsTimer[`${this.activeChannel}`].send = true
        clearTimeout(this.resetTimer);
        this.resetTimer = null;
        this.timer();
        this.timerChannels(this.activeChannel)
      }
      if(!res.success && res.sys_message === 'ERROR_SESSION_EXPIRED') {
        // this.$emit('showErrorMessageModal')
        this.signInPhone()
      }
    },
    async checkCode(){
      this.form_signup.error.error_code = false
      if (this.code == '') {
        this.form_signup.error.error_code = true
        return
      }
      const data = {
        session_id: this.session_id,
        code: this.code,
        remember: true,
      }
      const res = await this.CHECK_CODE(data)
      console.log(res)
      if (res.success) {
        
      } else {
        if (res.sys_message == 'ERROR_MESSAGE_WRONG_CODE') {
          this.form_signup.error.error_code = true
        }
      }
    },
    singup() {
      if(!this.errorMessage) {
        if(this.form_signup.email === '' || this.form_signup.password === '' || this.form_signup.confirmPassword === '' || this.form_signup.password.length < 6 || this.form_signup.confirmPassword.length < 6) {
          // if(this.form_signup.name === '') this.form_signup.error.name = true
  
          // if(this.form_signup.phone === '') this.form_signup.error.phone = true
  
          if(this.form_signup.email === '') this.form_signup.error.email = true
  
          if(this.form_signup.password === '') this.form_signup.error.password = true
  
          if(this.form_signup.confirmPassword === '') this.form_signup.error.confirmPassword = true;

          this.form_signup.error.error_message = 'Placeholder all fields.'

          if(this.form_signup.password.length < 6 || this.form_signup.confirmPassword.length < 6){
            this.form_signup.error.password = true
            this.form_signup.error.confirmPassword = true;  
            this.form_signup.error.error_message += '<br/>The password must contain at least 6 symbols'
          }

        } else {
          if(this.form_signup.checkbox === false) {
            this.form_signup.error.checkbox = true
            this.form_signup.error.error_message = ""
            this.form_signup.error.error_message_policy = 'Accept privacy policy'
          } else {
            this.form_signup.error.error_message_policy = ''
          }
        }          
      } else {
        this.form_signup.error.error_message = ''
        if(this.form_signup.password !== this.form_signup.confirmPassword) {
          this.form_signup.error.confirmPassword = true
          this.form_signup.error.error_message = 'Passwords do not match'
        } else if(this.errorMessage && this.errorEmail && this.errorCheckbox) {
          this.SIGN_UP({
            // name: this.form_signup.name.trim(),
            // phone: `${this.phoneCode}${this.form_signup.phone}`,
            // phone: '79000000000',
            email: this.form_signup.email,
            password: this.form_signup.password,
            password_confirmation: this.form_signup.confirmPassword,
            remember: true,
          })
        }
      }
    },
    keypressName(e) {
      if (!/^[A-Za-z,А-Яа-я ]+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    keypressPhone(e) {
      if (!/^[0-9]+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    keypressPhoneNumber(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    keypressCode(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    keypressPhoneCode(e) {
      if (e.target.value.substring(0,1) !== '+') {
        this.phoneCode = `+${this.phoneCode}`
      }
    }
  },
  computed: {
    errorMessage() {
      return this.form_signup.checkbox === true && this.form_signup.email !== '' && this.form_signup.password !== '' && this.form_signup.confirmPassword !== ''
    },
    errorEmail() {
      if(this.form_signup.email !== '') {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.form_signup.email)
      } else {
        return true
      }
    },
    errorCheckbox() {
      return this.form_signup.checkbox
    },
    filteredPhoneCodesList() {
      if (this.search) {
        return this.phoneCodesList.filter(e => e.name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.phoneCodesList
      }
    },
    telegramLink() {
      if (!this.client_channels) {
        return '#'
      }
      const tg = this.client_channels.find(e => e.type == 'telegram');
      if (tg) {
        return tg.link
      } else {
        return '#'
      }
    },
  },
  mounted() {
    if (this.$route.query?.phone) {
      this.form_signup.phone = this.$route.query.phone
    }
  }
}
</script>

<style scoped>

</style>