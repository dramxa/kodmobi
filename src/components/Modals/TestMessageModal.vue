<template>
  <ModalBasic id="message-modal" :maxWidth="'400px'" :modalOpen="show" @close-modal="closeTestMessageModal" :customPadding="true" :title="messageModal.title" :close="true">
    <div class="px-5 pb-10 py-7">
      <p class="mb-3 text-gray-600 text-sm leading-5 font-normal">You can check the operation of the service by sending a message to your phone. To do this, you need to fill in the required fields.</p>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1 text-gray-600" for="country">Country</label>
        <div class="h-[38px] rounded flex items-center justify-between px-3 border border-gray-200 hover:border-gray-300 cursor-pointer" @click="countryModalOpen = true">
          <span class="text-gray-800 text-sm">{{selectedCountry}}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1804 6.84378L9.70308 12.4596C9.50705 12.6637 9.25137 12.75 8.99995 12.75C8.74852 12.75 8.49369 12.6641 8.29681 12.4925L1.81947 6.87666C1.40931 6.51856 1.39205 5.92264 1.77952 5.54512C2.16837 5.16492 2.81845 5.1515 3.22584 5.50832L9.00005 10.5473L14.7743 5.50832C15.1817 5.15144 15.829 5.16494 16.2206 5.54512C16.6078 5.88622 16.5908 6.48273 16.1804 6.84378Z" fill="#ADB3BC"/>
          </svg>
        </div>
      </div>
      <div class="mb-3 flex items-center">
        <div class="grow">
          <label class="block text-sm font-medium mb-1 text-gray-600">
            Phone number <span class="text-rose-500">*</span>
          </label>
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
                v-model="messageModal.number"
                id="numberphone"
                :class="{'border-rose-500 text-rose-500': messageModal.error || messageModal.errorPhone}"
                class="form-input w-full"
                type="phone"
                autoComplete="on"
                placeholder="Phone number"
                required
                @keypress="keypressPhoneNumber($event, messageModal.number)"
                maxlength="15"
                @keyup.enter="checkNumber ? testSendCode() : () => {}"
                @focus="focusPhoneNumber('focus'), messageModal.error = false, messageModal.errorPhone = false"
                @blur="focusPhoneNumber('blur')"
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="messageModal.number != ''" @click="clearPhoneNumber" class="h-5 w-5 text-gray-400 hover:text-gray-600" :class="{ 'text-rose-500' : messageModal.error || messageModal.errorPhone }" />
              </div>
            </div>
          </div>
          <!-- <div class="flex items-center">
            <DropdownPhoneCode :isDialog="true" @changeCode="changeCode($event)" />
            <div class="relative grow ml-1">
              <input
                v-model="messageModal.number"
                id="numberphone"
                class="form-input w-full tracking-wide"
                :class="{ 'border-rose-300 text-rose-500' : messageModal.error || messageModal.errorPhone }"
                type="text"
                placeholder="Phone number"
                @keypress="keypressPhoneNumber($event, messageModal.number)"
                maxlength="15"
                @keyup.enter="checkNumber ? testSendCode() : () => {}"
                @focus="focusPhoneNumber('focus'), messageModal.error = false, messageModal.errorPhone = false"
                @blur="focusPhoneNumber('blur')"
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="messageModal.number != ''" @click="clearPhoneNumber" class="h-5 w-5 text-gray-400 hover:text-gray-600" :class="{ 'text-rose-500' : messageModal.error || messageModal.errorPhone }" />
              </div>
              <span v-if="messageModal.error" class="text-xs mt-1 text-rose-500 absolute left-0 top-10">Number must be 11 characters long</span>
            </div>
          </div> -->
        </div>
        <!-- <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-out duration-300" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-x-4">
          <button
          v-if="!isSendCode"
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white ml-5 self-end h-[38px] disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="!checkNumber || disabledSend" 
            @click="testSendCode"
          >
            Send
          </button>
        </transition> -->
      </div>
      <div v-if="isSendCode" class="flex items-end mb-3">
        <div class="grow mr-1">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="channel">
            Select Channel <span class="text-rose-500">*</span>
          </label>
          <!-- <label v-else class="block text-sm font-medium mb-1 text-gray-600" for="channel">
            Channel
          </label> -->
          <div class="relative">
            <DropdownChannels
              ref="dropdownChannels"
              :channels="client_channels"
              :channelsTimer="channelsTimer"
              @selectedChannel="selectedChannel"
            />
            <!-- <input
              v-else
              :value="activeChannels[0]?.name || ''"
              id="channel"
              class="form-input w-full tracking-wide disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              type="text"
              disabled
              ref="select_channel"
            /> -->
          </div>
        </div>
        <button
          v-if="!messageModal.channel"
          class="btn min-w-[100px] h-[38px] bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled
        >
          Send
        </button>
        <button
          v-else
          class="btn min-w-[100px] px-2 h-[38px] bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          :disabled="channelsTimer[`${messageModal.channel}`].timer > 0"
          @click="testSendCode()"
        >
          {{ channelsTimer[`${messageModal.channel}`].timer > 0 ? `Send (${outputTimer(messageModal.channel)})` : 'Send' }}
        </button>
      </div>
      <div v-if="isSendCode">
        <div class="flex">
          <div class="flex-auto">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="code">
              Code <span class="text-rose-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="messageModal.code"
                id="code"
                class="form-input w-full tracking-wide"
                :class="{ 'border-rose-300 text-rose-500' : messageModal.errorCode }"
                maxlength="4"
                type="text"
                placeholder="Code"
                @keyup.enter="checkLengthCode ? checkCode() : () => {}"
                @keypress="keypressCode($event)"
              />
              <!-- <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon v-if="messageModal.code != ''" @click.stop="messageModal.code = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div> -->
              <!-- <span v-if="messageModal.errorCode" class="text-xs text-rose-500 absolute left-0 top-10">The code is entered incorrectly</span> -->
              <span v-if="messageModal.errorCode" class="text-xs text-rose-500 absolute left-0 top-10">{{messageModal.errorMessage}}</span>
            </div>
          </div>
          <!-- <button
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white ml-5 self-end h-[38px] disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="!checkLengthCode"
            @click="checkCode"
          >
            Check code
          </button> -->
        </div>
      </div>
    </div>
    <!-- Modal footer -->
    <div class="px-5 py-4 border-t border-gray-200">
      <div class="flex flex-wrap justify-end space-x-2">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600 font-medium" @click.stop="closeTestMessageModal">Cancel</button>
        <!-- <button
          v-if="!channelsTimer[`${messageModal.channel}`].send"
          class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          :disabled="!checkNumber || disabledSend" 
          @click="testSendCode"
        >
          Next
        </button> -->
        <button
          v-if="!session.phone"
          class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          :disabled="!checkNumber" 
          @click="testSendCode()"
        >
          Next
        </button>
        <button
          v-else
          class="btn min-w-[107px] bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          :disabled="!checkLengthCode" 
          @click="checkCode()"
        >
          Check code
        </button>
        <!-- <button v-else class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="checkCode">Check code</button> -->
      </div>
    </div>
    <ModalBasic id="telegram-modal" :modalOpen="telegramModal.show" @close-modal="closeTelegramModal" :customPadding="true" title="Telegram" :close="true">
      <div class="px-5 py-7 flex flex-col justify-center items-center">
        <img class="w-[120px] h-[120px] mb-5 self-center" src="@/assets/icons/Apps-telegram.svg" alt="Telegram">
        <p class="mb-2.5 text-gray-600 text-sm leading-5 font-normal">To use this communication channel, you need to log in to the bot</p>
        <!-- <p
          v-if="telegramModal.message.text"
          class="text-sm leading-5 font-normal"
          :class="telegramModal.message.error ? 'text-red-500' : 'text-green-500'"
        >
          {{ telegramModal.message.text }}
        </p> -->
        <div class="flex items-center text-green-500 font-medium text-sm" v-if="telegramModal.message.active === true">
          <svg class="mr-2.5" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.939 3.54272C15.2428 3.82414 15.2428 4.2792 14.939 4.53367L7.07749 12.4373C6.82438 12.7427 6.37174 12.7427 6.09183 12.4373L2.04281 8.36574C1.76373 8.11127 1.76373 7.65621 2.04281 7.37479C2.32186 7.09637 2.7745 7.09637 3.05352 7.37479L6.59806 10.9404L13.9534 3.54272C14.2333 3.2631 14.6859 3.2631 14.939 3.54272Z" fill="#44C157"/>
          </svg>
          <span>You have successfully logged in to the bot</span>
        </div>
        <div class="flex items-center text-rose-500 font-medium text-sm" v-if="telegramModal.message.active === false">
          <svg class="mr-2.5" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.70221 4.66064C6.8772 3.67253 8.58968 3.75554 9.67718 4.91077C10.5793 5.86923 10.773 7.29916 10.2855 8.47896L11.2355 9.26919L13.2167 7.16413C13.9959 6.33406 13.9959 4.99046 13.2167 4.16282C12.473 3.37282 11.2792 3.33054 10.4897 4.06632L10.3605 4.18474C10.1543 4.37731 9.83759 4.35518 9.65634 4.13471C9.47301 3.91403 9.49593 3.57846 9.70218 3.38522L9.83134 3.26657C11.0188 2.16271 12.8084 2.226 13.923 3.41156C15.0938 4.654 15.0938 6.67052 13.923 7.91452L12.0272 9.92882L14.975 12.3836C15.1917 12.5651 15.2313 12.8994 15.0605 13.1296C14.8896 13.3598 14.5751 13.4018 14.3584 13.2203L2.02507 2.94937C1.80774 2.76831 1.76964 2.43451 1.93999 2.20355C2.11037 1.97264 2.42453 1.93215 2.64203 2.11315L5.70221 4.66064ZM6.52304 5.34462L9.46468 7.79499C9.67926 7.06231 9.51051 6.23667 8.96885 5.66115C8.30635 4.95504 7.27303 4.85101 6.52304 5.34462ZM7.32303 10.4224C6.69595 9.75838 6.4022 8.86633 6.45012 7.98978L7.57928 8.93495C7.67511 9.20278 7.82719 9.45513 8.02927 9.67205C8.33552 10.0151 8.76052 10.2166 9.17926 10.2741L10.3105 11.2215C9.2876 11.5469 8.13136 11.2813 7.32303 10.4224ZM4.26264 6.1592L5.0543 6.82104L3.7841 8.16907C3.00411 8.99914 3.00411 10.3427 3.7841 11.1706C4.52722 11.9409 5.72096 12.0029 6.51054 11.268L6.6397 11.1485C6.84595 10.9559 7.16261 10.978 7.34386 11.1994C7.52511 11.4185 7.50428 11.755 7.29803 11.9475L7.16886 12.0671C5.98137 13.1716 4.19181 13.1074 3.07702 11.921C1.90651 10.6792 1.90651 8.64276 3.07702 7.41869L4.26264 6.1592Z" fill="#DC3545"/>
          </svg>
          <span>Something wrong, please try again</span>
        </div>
        <a :class="{'invisible': telegramModal.message.active === true}" :href="telegramLink" target="_blank" @click="authTelegramBot" class="btn min-w-[150px] bg-indigo-500 hover:bg-indigo-600 text-white self-center text-center mt-5">Login to the bot</a>
        <p v-if="telegramModal.auth && telegramModal.message.active !== true" class="mb-3 text-indigo-500 text-sm leading-5 font-normal mt-5 hover:cursor-pointer" @click="checkTelegramStatus">Check status</p>
        <p v-if="telegramModal.message.active === true" class="mb-3 text-indigo-500 text-sm leading-5 font-normal mt-5 hover:cursor-pointer" @click="closeTelegramModal">Close Modal</p>
      </div>
    </ModalBasic>
  </ModalBasic>
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
</template>

<script>

import ModalBasic from '@/components/Modals/ModalBasic.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import DropdownChannels from '@/components/Dropdown/DropdownChannels.vue'
import DropdownPhoneCode from '@/components/Dropdown/DropdownPhoneCode.vue'
import { XIcon } from '@heroicons/vue/outline'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import phoneCodesList from '@/plugins/countryCodes.js'

export default {
  name: 'TestMessageModal',
  props: ['activeChannels', 'show'],
  emits: ['close-modal', 'showSuccessMessageModal', 'showErrorMessageModal'],
  components: {
    ModalBasic,
    ModalBlank,
    DropdownChannels,
    DropdownPhoneCode,
    XIcon,
  },
  data: () => ({
    client_channels: [],
    phoneCode: '+7',
    selectedCountry: 'Russia',
    countryModalOpen: false,
    phoneCodesList,
    search: '',
    telegramModal: {
      show: false,
      auth: false,
      message: {
        active: null,
        text: '',
        error: false
      }
    },
    messageModal: {
      show: false,
      channel: null,
      title: 'Send Test Message',
      number: '',
      placeholderInput: '+',
      placeholderNumber: false,
      error: false,
      errorPhone: false,
      errorCode: false,
      errorMessage: '',
      code: '',
    },
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
    isSendCode: false,
    // sessionId: null,
    session: {
      id: null,
      phone: null
    },
    resetTimer: null,
    resendTimerSms: 5,
    defaultResendTimer: 61 // секунды
  }),
  watch: {
    'messageModal.code' (val, old) {
      if(this.messageModal.errorCode) this.messageModal.errorCode = false
    },
    'channelsTimer.whatsapp.timer' (val, old) {
      if (this.channelsTimer.whatsapp.timer > 1) {
        setTimeout(() => {
          this.timerChannels('whatsapp')
        }, 1000)
      } else {
        this.channelsTimer.whatsapp.timer = 0;
      }
    },
    'channelsTimer.telegram.timer' (val, old) {
      if (this.channelsTimer.telegram.timer > 1) {
        setTimeout(() => {
          this.timerChannels('telegram')
        }, 1000)
      } else {
        this.channelsTimer.telegram.timer = 0;
      }
    },
    'channelsTimer.sms.timer' (val, old) {
      if (this.channelsTimer.sms.timer > 1) {
        setTimeout(() => {
          this.timerChannels('sms')
        }, 1000)
      } else {
        this.channelsTimer.sms.timer = 0;
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
    ...mapActions('SendCodeModule', ['SEND_TEST_MESSAGE', 'CREATE_CODE', 'SEND_CODE', 'CHECK_CODE', 'CHECK_CHANNEL']),
    ...mapActions('BillingModule', ['GET_BILLING']),
    ...mapActions('ProfileModule', ['GET_PROFILE']),
    changeCode(value) {
      this.phoneCode = value.dial_code
    },
    selectCountryCode(code) {
      this.phoneCode = `+${code.dial_code}`
      this.selectedCountry = code.name
      this.search = ''
      this.countryModalOpen = false
    },
    async testSendCode() {
      if(this.messageModal.channel) {
        const activeChannel = this.client_channels.find(c => c.type == this.messageModal.channel)
        console.log(activeChannel)
        if (!activeChannel.is_active) {
          this.telegramModal.show = true
          return
        }
      }
      if(this.session.id) {
        `${this.phoneCode.replace('+', '')}${this.messageModal.number}` === this.session.phone ? await this.sendCode() : await this.createCode();
      } else {
        this.isSendCode ? await this.sendCode() : await this.createCode();
      }
      setTimeout(function(self){
        // self.GET_BILLING({project_id: self.active_project.id});
        self.GET_PROFILE();
      }, 2000, this);
    },
    selectedChannel(channel) {
      if(channel.type === 'telegram') {
        if(!channel.is_active) {
          this.telegramModal.show = true
        }
      }
      this.messageModal.channel = channel.type
      // if (channel.is_active && !this.channelsTimer[channel.type].send) {
      //   this.testSendCode();
      // }
    },
    authTelegramBot() {
      this.telegramModal.auth = true
    },
    closeTestMessageModal() {
      this.clearDataModal()
      this.$emit('close-modal')
    },
    clearDataModal() {
      this.messageModal = {
        show: false,
        channel: 'whatsapp',
        title: 'Send Test Message',
        number: '',
        placeholderInput: '+',
        placeholderNumber: false,
        error: false,
        errorCode: false,
        errorMessage: '',
        code: '',
      }
      this.isSendCode = false
      this.session = {
        id: null,
        phone: null,
      }
    },
    closeTelegramModal() {
      this.telegramModal.show = false
      this.telegramModal.message = {
        active: null,
        text: '',
        error: false
      }
    },
    async checkTelegramStatus() {
      const data = {
        type: 'telegram',
        session_id: this.session.id,
        api_token: this.active_project.api_key
      }
      const res = await this.CHECK_CHANNEL(data);

      if(res.data.is_active) {
        this.telegramModal.message.active = true;
        this.telegramModal.message.text = 'You have successfully logged in to the bot';
        this.telegramModal.message.error = false;
        const index = this.client_channels.findIndex(e => e.type == 'telegram');
        this.client_channels[index].is_active = true;
      } else {
        this.telegramModal.message.active = false;
        this.telegramModal.message.text = 'You are still not logged in to the bot, please try again';
        this.telegramModal.message.error = true;
      }
    },
    resetChannelsTimer() {
      this.channelsTimer.whatsapp.timer = 0
      this.channelsTimer.whatsapp.send = false
      this.channelsTimer.telegram.timer = 0
      this.channelsTimer.telegram.send = false
      this.channelsTimer.sms.timer = 0
      this.channelsTimer.sms.send = false
    },
    async createCode(type = null) {
      if(this.checkNumber) {
        const phoneNumber = `${this.phoneCode.replace('+', '')}${this.messageModal.number}`
        let data = {
          phone: Number(phoneNumber),
          api_token: this.active_project.api_key,
          send: false,
        }
        if(type) {
          data.type = type;
          data.send = true;
        }
        const res = await this.CREATE_CODE(data);
        console.log(res)
        if(res.success) {
          this.client_channels = res.data.client_channels
          this.session.id = res.data.session_id;
          this.session.phone = phoneNumber;
          this.isSendCode = true;
          if (type) {
            // this.messageModal.channel = res.data.client_channels[0].type;
            this.resetChannelsTimer()
            this.resendTimerSms = this.defaultResendTimer;
            this.channelsTimer[`${this.messageModal.channel}`].timer = this.defaultResendTimer;
            this.channelsTimer[`${this.messageModal.channel}`].send = true;
            clearTimeout(this.resetTimer);
            this.resetTimer = null;
            this.timer();
            this.timerChannels(this.messageModal.channel)
          }
        } else {
          if (res.errors.phone) {
            this.messageModal.errorPhone = true;
          }
        }
      } else {
        this.messageModal.error = true
      }
    },
    async sendCode() {
      if(this.checkNumber) {
        const data = {
          type: this.messageModal.channel,
          session_id: this.session.id,
          api_token: this.active_project.api_key
        }
        const res = await this.SEND_CODE(data);
        if(res.success){
          this.isSendCode = true;
          this.resendTimerSms = this.defaultResendTimer;
          this.channelsTimer[`${this.messageModal.channel}`].timer = this.defaultResendTimer
          this.channelsTimer[`${this.messageModal.channel}`].send = true
          clearTimeout(this.resetTimer);
          this.resetTimer = null;
          this.timer();
          this.timerChannels(this.messageModal.channel)
        }
        if(!res.success && res.sys_message === 'ERROR_SESSION_EXPIRED') {
          // this.$emit('showErrorMessageModal')
          this.createCode(this.messageModal.channel)
        }
      } else {
        this.messageModal.error = true
      }
    },
    async checkCode(){
      this.messageModal.errorCode = false;
      const data = {
        session_id: this.session.id,
        code: Number(this.messageModal.code),
        api_token: this.active_project.api_key,
      }
      const res = await this.CHECK_CODE(data);
      if(res.success){
        this.resendTimerSms = this.defaultResendTimer;
        clearTimeout(this.resetTimer);
        this.resetTimer = null;
        this.clearDataModal();
        this.resetChannelsTimer();
        this.closeTestMessageModal();
        this.$emit('showSuccessMessageModal');
      } else {
        this.messageModal.errorCode = true;
        this.messageModal.errorMessage = res?.data?.error?.message || 'The code is entered incorrectly'
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
    phoneNumberConversion (number) {
      // let num = number.split('')
      // num.splice(0, 1)
      // num.splice(3, 2)
      // num.splice(6, 1)
      // num.splice(8, 1)
      // num.unshift('7')
      // const result = num.join('')
      // return result
      if (number.slice(0,1) == '8') {
        return `7${number.slice(1,number.length)}`
      } else {
        return number;
      }
    },
    focusPhoneNumber(str) {
      this.messageModal.error = false
      if(str === 'focus') {
        this.messageModal.placeholderNumber = true
        this.messageModal.placeholderInput = ''
      } else if(str === 'blur' && this.messageModal.number === '') {
        this.messageModal.placeholderNumber = false
        this.messageModal.placeholderInput = 'Phone number'
      }
    },
    clearPhoneNumber() {
      this.messageModal.placeholderNumber = false
      this.messageModal.number = ''
      this.messageModal.placeholderInput = 'Phone number'
    },
    keypressPhoneNumber(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      }
      // if (!/^\d+$/.test(e.key)) {
      //   return e.preventDefault();
      // } else if(value.length === 0) {
      //   this.messageModal.number += '('
      // } else if(value.length === 4) {
      //   this.messageModal.number += ') '
      // } else if(value.length === 9 ||value.length === 12) {
      //   this.messageModal.number += ' '
      // }
    },
    keypressPhoneCode(e) {
      if (e.target.value.substring(0,1) !== '+') {
        this.phoneCode = `+${this.phoneCode}`
      }
    },
    keypressCode(e) {
      if (!/^[0-9]+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    outputTimer(type) {
      const timer = this.channelsTimer[`${type}`].timer;
      const minutes = Math.floor(timer / 60);
      const seconds = (timer % 60).toString().padStart(2, "00");

      return `${minutes}:${seconds}`;
    },
  },
  computed: {
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
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
    checkNumber() {
      // return this.messageModal?.number?.length === 15
      return this.phoneCode.length + this.messageModal?.number?.length > 11
    },
    checkLengthCode() {
      return this.messageModal.code.length == 4
    },
    // disabledSend() {
    //   if(this.session.id && `${this.phoneCode}${this.messageModal.number}` !== this.session.phone) {
    //     return `${this.phoneCode}${this.messageModal.number}` === this.session.phone
    //   } else {
    //     return this.channelsTimer[`${this.messageModal.channel}`].timer !== 0
    //   }
    // }
  },
}
</script>

<style>

</style>