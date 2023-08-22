<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/3">
      <div class="flex items-center">
        <!-- <div class="w-9 h-9 shrink-0 mr-2 sm:mr-3">
          <img class="rounded-full" :src="transaction.image" width="36" height="36" :alt="transaction.name" />
        </div> -->
        <div class="font-medium text-gray-800">{{transaction.reference}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">
        <div class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1" :class="statusColor(transaction.status)">{{transaction.status}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="text-left font-medium" :class="amountColor(transaction.amount)">{{transaction.amount}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-right">{{transaction.date}}</div>
    </td>   
  </tr>  
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TransactionsTableItem',
  props: ['transaction', 'value', 'selected'],
  setup() {
    
    const statusColor = (status) => {
      switch (status) {
        case 'Completed':
          return 'bg-emerald-100 text-emerald-600'
        case 'Failed':
          return 'bg-rose-100 text-rose-500'
        default:
          return 'bg-gray-100 text-gray-500'
      }
    }
    
    const amountColor = (amount) => {
      switch (amount.charAt(0)) {
        case '+':
          return 'text-emerald-500'
        default:
          return 'text-gray-700'
      }
    }    

    return {
      statusColor,
      amountColor,
    }
  },
}
</script>