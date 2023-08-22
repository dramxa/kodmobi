<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-600">project name</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <img
          class="w-6 h-6"
          :src="require(`@/assets/icons/messengers/${item.channel.type}_black.svg`)"
          :alt="item.channel.name"
        >
        <div class="font-medium text-gray-800 ml-3">{{item.channel.name}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-600">{{dateFormat(item.created_at, 'time')}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-600">type    123</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-600">{{item.channel.amount}} $</div>
    </td>
  </tr>
</template>

<script>

import { PlusIcon } from '@heroicons/vue/outline'
import dateFormatMixin from '@/mixins/dateFormat.js'

export default {
  name: 'TransactionsTableItem',
  props: ['item'],
  mixins: [dateFormatMixin],
  components: {
    PlusIcon
  },
  methods: {
    getNumber(item) {
      const result = item.message === null ? '-' : item.message.phone
      return result
    },
    // getPaymentType(item) {
    //   const result = item.channel.tariff === 'one_time' ? 'Per message' : 'Per month'
    //   return result
    // },
  },
  setup() {

    const statusColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'bg-emerald-100 text-emerald-600'
        case 'Due':
          return 'bg-amber-100 text-amber-600'
        case 'Overdue':
          return 'bg-rose-100 text-rose-500'          
        default:
          return 'bg-gray-100 text-gray-500'
      }
    }

    return {
      statusColor,
    }
  },
}
</script>