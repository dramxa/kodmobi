<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <!-- <div class="font-medium text-gray-600">{{transformationDate(item.created_at)}}</div> -->
      <div class="text-sm text-gray-600" style="font-feature-settings: 'tnum'">{{dateFormat(item.created_at, 'time')}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <img
          class="w-6 h-6"
          :src="require(`@/assets/icons/messengers/${item.channel.name.toLowerCase()}_black.svg`)"
          :alt="item.channel.name"
        >
        <div class="font-medium text-sm text-gray-800 ml-3">{{item.channel.name}}</div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-sm text-gray-800">{{item.provider.name}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-sm text-gray-600">+{{item.phone.code}}{{item.phone.number}}</div>
    </td>
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <img
          class="w-6 h-6"
          :src="require(`@/assets/icons/messengers/${item.icon}`)"
          :alt="item.channel"
        >
        <div
          v-if="item.message"
          class="font-medium text-gray-600 ml-3"
        >
          {{item.message.body}}
        </div>
        <div v-else class="font-medium text-gray-600 ml-3">-</div>
      </div>
    </td> -->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-sm text-gray-800">{{item.fee || '-'}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div
        v-if="item"
        class="text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1"
        :class="statusColor(item.status)"
      >
        {{item.status === 'success' ? 'Sent' : 'Failed'}}
      </div>
      <div v-else class="font-medium text-gray-600">-</div>
    </td>
  </tr>
</template>

<script>

import { PlusIcon } from '@heroicons/vue/outline'
import dateFormatMixin from '@/mixins/dateFormat.js'

export default {
  name: 'MessagesTableItem',
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
        case 'success':
          return 'bg-green-100 text-green-600'
        case 'error':
          return 'bg-rose-100 text-rose-500'   
        case 'Paid':
          return 'bg-green-100 text-green-600'
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