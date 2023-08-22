<template>
  <tr v-if="payment.status !== 'Pending'">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-[25%]">
      <div class="flex items-center">
        <!-- <img
          class="w-6 h-6"
          :src="require(`@/assets/icons/messengers/${payment.icon}`)"
          :alt="channel.channel"
        > -->
        <div class="font-normal text-gray-600">{{dateFormat(payment.created_at, 'time')}}</div>
      </div>
    </td>    
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(channel.status.background)">{{channel.status.text}}</div>
    </td>  -->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-800">{{payment.description}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-[10%]">
      <div
        class="font-medium"
        :class="totalColor(payment.type)"
      >
        <!-- <span v-if="payment.payment_type === 'income'">+</span> -->
        <!-- <span v-if="payment.payment_type === 'outcome'">-</span> -->
        {{payment.amount}} {{ payment.currency }}
      </div>
    </td>
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium">
        {{calculatePrice(payment.amount)}}
      </div>
    </td> -->
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="my-3 w-24">
        <div
          class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1"
          :class="statusColor(payment.status)"
        >
          {{payment.status}}
        </div>
      </div>
    </td> -->
  </tr>
</template>

<script>

import { PlusIcon } from '@heroicons/vue/outline'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import { mapFields } from 'vuex-map-fields'
import dateFormatMixin from '@/mixins/dateFormat.js'

export default {
  name: 'BalanceTableItem',
  props: ['payment'],
  mixins: [dateFormatMixin],
  data: () => ({
  }),
  components: {
    PlusIcon
  },
  methods: {
    calculatePrice(amount){
      let price = amount * this.settings.currency.usd;
      price = price.toLocaleString('ru-RU', { maximumFractionDigits: 3 });
      price = price.replace(/,/g, '.');
      return `${price} ₽`
    },
    // changeStatus(id) {
    //   this.$store.commit("ChannelsModule/commitChangeStatus", id)
    //     if (this.channels[id - 1].status) {
    //       this.$emit('showConnectedModal', this.channels[id - 1].channel)
    //       // this.$emit('openDepositModal')
    //     }
    // },
  },
  computed: {
    ...mapFields('ChannelsModule', {
      payment_history: 'payment_history',
    }),
    ...mapFields('ProfileModule', {
      settings: 'settings'
    }),
  },
  setup() {
    
    const totalColor = (status) => {
      switch (status) {
        case 'income':
          return 'text-green-500'
        case 'outcome':
          return 'text-rose-500'    
        default:
          return 'text-rose-500'
      }
    }    

    const statusColor = (status) => {
      switch (status) {
        case 'success':
          return 'bg-emerald-100 text-emerald-600'
        case 'Completed':
          return 'bg-emerald-100 text-emerald-600'
        case 'Pending':
          return 'bg-gray-100 text-gray-500'
        case 'Refund':
          return 'bg-amber-100 text-amber-600'
        case 'Failed':
          return 'bg-rose-100 text-rose-500'          
        default:
          return 'bg-gray-100 text-gray-500'
      }
    }

    return {
      totalColor,
      statusColor,
    }
  },
}
</script>

<style scoped>
.form-switch input[type=checkbox]:checked + label {
  --tw-bg-opacity: 1;
  background-color: #10B981;
}
</style>