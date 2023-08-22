<template>
  <div class="flex flex-col h-full">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-1 flex flex-col bg-white shadow-lg rounded-sm border border-gray-200">
        <div class="px-8 py-4 flex flex-col grow">
          <div class="grow md:flex md:justify-between md:items-center">
            <div class="flex flex-col mb-4 md:mb-0 w-6/12">
              <div class="text-gray-800 text-xl font-semibold">Balance</div>
              <div class="text-base mt-2.5 mb-1.5 text-gray-600">Current account balance</div>
              <div
                class="text-lg font-semibold"
                :class="balance < 0 ? 'text-rose-500' : 'text-gray-800'"
              >
                {{balance.toLocaleString('ru', { maximumFractionDigits: 3 })}} <span class="text-base text-gray-600">Credits</span>
              </div>
            </div>
            <button class="btn h-[38px] bg-indigo-500 hover:bg-indigo-600 text-white text-sm ml-3" @click.stop="openPaymentModal">
              <PlusIcon class="h-4 w-4 mr-2" />
              Deposit
            </button>
            <!-- <div class="flex flex-col w-6/12">
              ДОБАВИТЬ УСЛОВИЕ ИЗ АПИ 
              <div
                class="flex text-2xl font-bold items-center"
                :class="false ? 'text-rose-500' : 'text-gray-600'"
              >
                <span class="mr-2">$ 15</span> 
                <TooltipInfo
                  v-if="false"
                  size="lg"
                  bg="dark"
                  :tooltipOpen="tooltipOpen"
                >
                  <div class="text-xs">You need to top up the balance. The estimated cost will soon exceed the balance.</div>
                </TooltipInfo>
              </div>
              <span class="flex text-base mt-2.5 text-gray-600">Estimated cost for the billing period</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-span-1 flex flex-col bg-white shadow-lg rounded-sm border border-gray-200 bg-gray-50">
        <div class="px-8 py-4 flex flex-col grow">
          <div class="grow md:flex md:justify-between md:items-center">
            <!-- <div class="flex flex-col mb-4 md:mb-0 w-6/12">
              <div class="text-gray-800 text-xl font-semibold mb-2.5">Subscription</div>
              <div class="text-gray-600 text-sm mb-2.5">This function is not available and is currently under development.</div>
              <div class="flex">
                <div class="mr-12">
                  <div class="mb-1.5 text-gray-800 font-semibold text-base">Current plan</div>
                  <div v-if="profile" class="text-base text-gray-600 uppercase">{{ profile.tariff_plan.name }}</div>
                </div>
                <div>
                  <div class="mb-1.5 text-gray-800 font-semibold text-base">Price</div>
                  <div v-if="profile" class="text-base text-gray-600">${{ profile.tariff_plan.cost }}/month</div>
                </div>
              </div>
            </div> -->
            <div class="flex flex-col mb-4 grow">
              <div class="text-gray-600 text-xl font-semibold mb-2.5">Subscription</div>
              <div class="text-gray-600 text-sm mb-2.5">This function is not available and is currently under development.</div>
            </div>
            <button class="btn h-[38px] border-gray-200 text-gray-300 cursor-not-allowed text-sm ml-3">
              Unavailable
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <h2 class="text-xl font-bold mt-6 mb-[17px] text-gray-800">Payment history</h2>
      <BalanceTable />
      <BalancePaginationTable
        v-if="payment_history.length"
        class="py-8"
        :payment_history="payment_history"
        :current_page="current_page"
        :last_page="last_page"
        :per_page="per_page"
        :total="total"
      />
    </div>
    <ModalBasic id="payment-modal" maxWidth="490px" :close="true" :modalOpen="paymentModal.show" @close-modal="closePaymentModal()" :customPadding="true" :title="paymentModal.title">
      <!-- Modal content -->
      <div class="px-6 py-4">
        <!-- <p class="mb-3 text-gray-600 text-sm leading-5 font-normal">Attention! The amount of deposit must exceed the amount of estimated cost.</p> -->
        <div class="sm:w-1/2">
          <label class="block text-sm font-medium mb-3 text-gray-600">Currency <span class="text-rose-500">*</span></label>
          <DropdownCurrency
            v-model="paymentModal.currency"
          />
        </div>
        <div>
          <div class="my-3 text-gray-600 font-medium text-sm">Amount <span class="text-rose-500">*</span></div>
          <div class="grid gap-2 sm:grid-cols-2 grid-cols-1">
            <div
              v-for="(amount, i) in paymentModal.amountList"
              :key="i"
              class="py-6 px-2 flex flex-col justify-center items-center text-sm cursor-pointer rounded-[10px]"
              :class="paymentModal.activeAmount == i ? 'border-2 border-indigo-500' : 'border border-gray-200 hover:border-gray-300'"
              @click="paymentModal.activeAmount = i"
            >
              <div class="text-gray-600 font-medium">{{ calculatePrice(amount) }}</div>
              <div class="text-gray-500">{{ amount.toLocaleString('ru-RU')}} Credits</div>
            </div>
            <input
              v-show="paymentModal.amountFocus || paymentModal.amount == ''"
              v-model="paymentModal.amount"
              id="amount"
              ref="paymentAmount"
              type="text"
              maxlength="8"
              :placeholder="paymentModal.amountFocus ? '' : 'Other amount'"
              class="py-6 px-2 text-sm cursor-pointer rounded-[10px] font-medium placeholder:text-gray-600 text-center outline-0 shadow-none caret-indigo-500"
              :class="paymentModal.activeAmount == null ? 'border-2 border-indigo-500' : 'border border-gray-200 hover:border-gray-300'"
              @click="paymentModal.activeAmount = null"
              @keyup.enter="$refs.paymentAmount.blur()"
              @keypress="keypressAmount($event, paymentModal.amount)"
              @focus="focusPayment('focus'), paymentModal.amountFocus = true"
              @blur="paymentModal.amountFocus = false"
            >
            <div
              v-show="!paymentModal.amountFocus && paymentModal.amount !== ''"
              class="py-6 px-2 flex flex-col justify-center items-center text-sm cursor-pointer rounded-[10px]"
              :class="paymentModal.activeAmount == null ? 'border-2 border-indigo-500' : 'border border-gray-200 hover:border-gray-300'"
              @click="paymentAmountClick()"
            >
              <div class="text-gray-600 font-medium">
                {{ paymentModal.currency == 'usd' ? '$' : ''}}{{ parseInt(paymentModal.amount).toLocaleString('ru-RU') }}{{ paymentModal.currency == 'rub' ? '₽' : ''}}
              </div>
              <div class="text-gray-500">{{ calculateCredits(paymentModal.amount) }} Credits</div>
            </div>
          </div>
          <div class="hidden grid gap-2 sm:grid-cols-4 grid-cols-2">
            <div 
              v-for="(amount, i) in paymentModal.amountList" 
              :key="i" 
              class="py-1 px-3 text-sm rounded cursor-pointer"
              :class="paymentModal.activeAmount == i ? 'bg-indigo-500' : 'border border-gray-200'"
              @click="paymentModal.activeAmount = i"
            >
              <div :class="paymentModal.activeAmount == i ? 'text-white' : 'text-gray-500'">{{amount.toLocaleString('ru-RU')}} Credits</div>
              <div class="font-medium" :class="paymentModal.activeAmount == i ? 'text-white' : 'text-gray-500'">{{calculatePrice(amount)}}</div>
            </div>
            <div 
              class="py-1 px-3 text-sm rounded cursor-pointer font-medium"
              :class="paymentModal.activeAmount == null ? 'bg-indigo-500 text-white' : 'text-gray-500 border border-gray-200'"
              @click="paymentModal.activeAmount = null"
            >
              <div>Other</div>
              <div>amount</div>
            </div>
          </div>
        </div>
        <!-- <div :class="{'invisible': paymentModal.activeAmount != null}">
          <label class="block text-sm font-medium my-3 text-gray-600" for="amount">
            Enter amount of credits <span class="text-rose-500">*</span>
          </label>
          <div class="sm:flex sm:items-center space-x-2">
            <div class="relative sm:w-1/2">
              <input
                v-model="paymentModal.amount"
                id="amount"
                class="form-input w-full tracking-wide"
                :class="{ 'border-rose-300 text-rose-500' : paymentModal.error }"
                type="text"
                placeholder="Credits"
                maxlength="8"
                @keypress="keypressAmount($event, paymentModal.amount)"
                @focus="focusPayment('focus')"
              />
              <span v-if="paymentModal.error" class="text-xs mt-1 text-rose-500 absolute left-0 top-10">Amount is required</span>
            </div>
            <div class="sm:w-1/2 m-0 sm:mt-0 mt-3">
              {{calculatePrice(paymentModal.amount)}}
            </div>
          </div>
        </div> -->
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4 border-t border-gray-200">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="btn border-gray-200 hover:border-gray-300 text-gray-600 font-medium" @click.stop="closePaymentModal()">Cancel</button>
          <button 
            :disabled="paymentModal.activeAmount == null && paymentModal.amount == ''" 
            class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200" 
            @click="goToPayment()"
          >
            Go To Payment
          </button>
        </div>
      </div>
    </ModalBasic>
    <ChangePlanModal
      :show="changePlanModalOpen"
      @close-modal="changePlanModalOpen = false"
    />
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields'
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import BalanceTable from '@/views/balance/balance/table/BalanceTable.vue'
import BalancePaginationTable from '@/views/balance/balance/table/BalancePaginationTable.vue'
import { PlusIcon, XIcon } from '@heroicons/vue/outline'
import TooltipInfo from '@/components/Tooltip/TooltipInfo.vue'
import DropdownCurrency from '@/components/Dropdown/DropdownCurrency.vue'
import { useToast } from 'vue-toastification'
import ChangePlanModal from "@/components/Modals/ChangePlanModal.vue"

const toast = useToast();

export default {
  data: () => ({
    tooltipOpen: true,
    changePlanModalOpen: false,
    paymentModal: {
      show: false,
      title: 'Make a payment',
      currency: 'usd',
      activeAmount: 0,
      amountList: [100, 500, 1000],
      amount: '',
      amountFocus: false,
      error: false
    },
    settings: {
      currency: {
        usd: 75
      }
    }
  }),
  components: {
    BalanceTable,
    BalancePaginationTable,
    ModalBasic,
    PlusIcon,
    XIcon,
    TooltipInfo,
    DropdownCurrency,
    ChangePlanModal,
  },
  methods: {
    ...mapActions('BalanceModule', ['GET_BALANCE', 'INCOME_BALANCE']),
    ...mapActions('ProfileModule', ['EXTENSION_TARIF_PLAN']),
    paymentAmountClick(){
      this.paymentModal.activeAmount = null;
      this.paymentModal.amountFocus = true;
      setTimeout(function(self){
        self.$refs.paymentAmount.focus();
      }, 100, this);
    },
    changeCurrency(e){
      this.paymentModal.currency = e;
    },
    calculatePrice(amount){
      if (!parseInt(amount)) return;
      if (!this.settings) return;
      if (this.paymentModal.currency == 'usd') {
        const price = parseInt(amount / 100).toLocaleString('ru-RU').replace(/,/g, '.');
        return `$${price}`
      } 
      if (this.paymentModal.currency == 'rub') {
        const price = ((amount / 100) * this.settings.currency.usd).toLocaleString('ru-RU').replace(/,/g, '.');
        return `${price}₽`
      }
    },
    calculateCredits(amount){
      if (!parseInt(amount)) return;
      if (!this.settings) return;
      if (this.paymentModal.currency == 'usd') {
        return parseInt(amount).toLocaleString('ru-RU').replace(/,/g, '.');
      } 
      if (this.paymentModal.currency == 'rub') {
        return (amount / this.settings.currency.usd).toLocaleString('ru-RU').replace(/,/g, '.');
      }
      // if (!this.settings) return;
      // const amount = (price / this.settings.currency.usd).toLocaleString('ru-RU', { maximumFractionDigits: 3 }).replace(/,/g, '.');
      // return `${amount} Credits`
    },
    goToPayment() {
      console.log(this.paymentModal.amount, this.paymentModal.activeAmount)
      if (this.paymentModal.activeAmount !== null) {
        const total = (this.paymentModal.amountList[this.paymentModal.activeAmount] / 100) * this.settings.currency.usd;
        console.log(total);
        this.INCOME_BALANCE({
          amount: Number(total),
          currency: this.paymentModal.currency,
        });
        this.paymentModal.show = false;
      } else {
        if(this.paymentModal.amount !== '') {
          if (this.paymentModal.currency == 'usd') {
            const total = this.paymentModal.amount * this.settings.currency.usd;
            this.INCOME_BALANCE({
              amount: Number(total),
              currency: this.paymentModal.currency,
            });
          } 
          if (this.paymentModal.currency == 'rub') {
            const total = this.paymentModal.amount;
            this.INCOME_BALANCE({
              amount: Number(total),
              currency: this.paymentModal.currency,
            });
          }
          // const total = this.paymentModal.amount * this.settings.currency.usd;
          
          this.paymentModal.show = false;
        } else {
          this.paymentModal.error = true;
        }
      }
    },
    async payPlan() {
      const res = await this.EXTENSION_TARIF_PLAN()
      if(res?.data?.link) {
        location.href = res.data.link
      }
    },
    openPaymentModal() {
      this.paymentModal.show = true
      this.paymentModal.amount = ''
    },
    closePaymentModal() {
      this.paymentModal.show = false
    },
    focusPayment() {
      this.paymentModal.error = false
    },
    keypressAmount(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    // changeAmount: function(e) {
    //   if (e.value.indexOf(".") != '-1') {
    //     e.value=e.value.substring(0, e.value.indexOf(".") + 3); 
    //   }
    // }
  },
  computed: {
    ...mapFields('BalanceModule', {
      payment_history: 'payment_history',
      current_page: 'payment_meta.current_page',
      last_page: 'payment_meta.last_page',
      per_page: 'payment_meta.per_page',
      total: 'payment_meta.total',
    }),
    ...mapFields('ProfileModule', {
      balance: 'balance',
      // settings: 'settings',
      profile: 'profile',
    }),
    amountLength() {
      return this.paymentModal.amount?.length
    }
    // userBalance() {
    //   // // var numb = 10572,
    //   //     // pay = 11073;
    //   // const res = Math.round(this.balance*2.1/100);
    //   // var outrez = (res+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    //   return this.balance
    // }
  },
  beforeMount() {
    this.GET_BALANCE()
  },
  mounted() {
    if(location.href.includes('success')) {
      toast.success('Successful payment')
      this.$router.push('/balance')
    }

    if(location.href.includes('fail')) {
      toast.error('Failed payment')
      this.$router.push('/balance')
    }
  }
}
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
</style>