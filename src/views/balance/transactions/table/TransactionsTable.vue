<template>
  <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative h-full flex flex-col">
    <header class="px-5 py-4 flex justify-between">
      <h2 class="font-semibold text-gray-800">Total <span class="text-gray-400 font-medium">{{billing_data.length}}</span></h2>
      <div class="text-base text-gray-800 font-semibold">- ${{billingSum}}</div>
    </header>
    <div class="flex-auto">

      <!-- Table -->
      <div
        :class="!billing_data.length ? 'flex flex-col justify-center items-center overflow-x-auto h-full' : 'overflow-x-auto h-full'"
      >
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left flex items-center">
                  <span class="mr-1">Project</span>
                  <img
                    class="w-3.5 h-3.5"
                    src="@/assets/icons/sort.svg"
                    alt="sort"
                  >
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Channel</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left flex items-center">
                  <span class="mr-1">Date</span>
                  <img
                    class="w-3.5 h-3.5"
                    src="@/assets/icons/sort.svg"
                    alt="sort"
                  >
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Payment type</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Price</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200">
            <TransactionsTableItem
              v-for="item in billing_data"
              :key="item.id"
              :item="item"
            />
          </tbody>
        </table>
        <div v-if="!billing_data.length" class="flex flex-col justify-center text-center px-4 h-full my-10">
          <div class=" self-center inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-gray-200 to-gray-100 mb-4">
            <svg class="w-5 h-6 fill-current" viewBox="0 0 20 24">
              <path class="text-gray-500" d="M10 10.562l9-5-8.514-4.73a1 1 0 00-.972 0L1 5.562l9 5z" />
              <path class="text-gray-300" d="M9 12.294l-9-5v10.412a1 1 0 00.514.874L9 23.294v-11z" />
              <path class="text-gray-400" d="M11 12.294v11l8.486-4.714a1 1 0 00.514-.874V7.295l-9 4.999z" />
            </svg>
          </div>
          <span class="mb-6 text-gray-400">You have no messages</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TransactionsTableItem from '@/views/balance/transactions/table/TransactionsTableItem.vue'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'TransactionsTable',
  components: {
    TransactionsTableItem,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
    ...mapFields('BillingModule', {
      billing_data: 'billing_data',
    }),
    // billingSum() {
    //   return this.billing_data.reduce((prev, item) => prev + item.channel.amount, 0)
    // }
  },
}
</script>