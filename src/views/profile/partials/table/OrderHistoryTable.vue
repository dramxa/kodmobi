<template>
  <div class="bg-white">
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 border-t border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Reference</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Status</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Amount</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-right">Payment Date</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200 border-b border-gray-200">
            <OrderHistoryTableItem
              v-for="transaction in transactions"
              :key="transaction.id"
              :transaction="transaction"
            />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import OrderHistoryTableItem from './OrderHistoryTableItem.vue'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'TransactionsTable',
  components: {
    OrderHistoryTableItem,
  },  
  props: ['selectedItems'],
  computed: {
    ...mapFields('BillingModule', {
      transactions: 'transactions',
    })
  },
}
</script>