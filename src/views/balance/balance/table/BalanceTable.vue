<template>
  <div class="bg-white rounded-sm border border-gray-200 relative flex-auto flex flex-col">
    <!-- <header class="px-5 py-4">
      <h2 class="font-semibold text-gray-800">Invoices <span class="text-gray-400 font-medium">67</span></h2>
    </header> -->
    <div class="flex-auto">

      <!-- Table -->
      <div class="flex flex-col overflow-x-auto h-full" :class="{'justify-center items-center': !payment_history.length}">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Date</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Description</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Amount</div>
              </th>
              <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Price</div>
              </th> -->
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200">
            <BalanceTableItem
              v-for="payment in payment_history"
              :key="payment.id"
              :payment="payment"
            />
          </tbody>
        </table>
        <div v-if="!payment_history.length" class="flex flex-col justify-center text-center px-4 h-full">
          <!-- <div class=" self-center inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-gray-200 to-gray-100 mb-4">
            <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
              <path class="text-gray-500" d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z" />
              <path class="text-gray-300" d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z" />
              <path class="text-gray-400" d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z" />
            </svg>
          </div> -->
          <span class="my-6 text-gray-600 text-base">The balance history will be stored here</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, watch } from 'vue'
import BalanceTableItem from './BalanceTableItem.vue'
import { mapFields } from 'vuex-map-fields'
// import ModalBlank from '@/components/Modals/ModalBlank.vue'

export default {
  name: 'BalanceTable',
  components: {
    BalanceTableItem,
    // ModalBlank,
  },
  data: () => ({
    // deposit_channel_modal: {
    //   open: false
    // },
    // connectedModal: {
    //   show: false,
    //   channel: ''
    // }
  }),
  methods: {
    // openDepositModal() {
    //   this.deposit_channel_modal.open = true
    // },
    // showConnectedModal(channel) {
    //   this.connectedModal.channel = channel
    //   this.connectedModal.show = true
    // }
  },
  computed: {
    ...mapFields('BalanceModule', {
      payment_history: 'payment_history',
    }),
  },
}
</script>