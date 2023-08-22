<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <img
          class="w-6 h-6"
          :src="require(`@/assets/icons/messengers/${channel.type}_black.svg`)"
          :alt="channel.name"
        >
        <div class="font-medium text-gray-800 ml-3">{{channel.name}}</div>
      </div>
    </td>    
    <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" :class="statusColor(channel.status.background)">{{channel.status.text}}</div>
    </td>  -->
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-800" v-if="channel.tariff === 'monthly'">0 ₽</div>
      <div class="font-medium text-gray-800" v-else>{{channel.amount}} ₽</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-800" v-if="channel.tariff !== 'monthly'">0 ₽</div>
      <div class="font-medium text-gray-800" v-else>{{channel.amount}} ₽</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="my-3 w-24">
        <div class="flex items-center">
          <!-- <div class="text-sm text-gray-400 italic mr-2">{{channel.status === true ? 'On' : 'Off'}}</div> -->
          <!-- КОСТЫЛЬ ПОКА НЕТ ТЕЛЕГРАМА -->
          <div v-if="channel.name !== 'Telegram'" class="text-sm text-gray-400 italic mr-2">{{channel.attach === true ? 'On' : 'Off'}}</div>
          <div v-else class="text-sm text-gray-400 italic mr-2">in developing</div>
          
          <div class="form-switch"
            v-if="channel.name !== 'Telegram'"
            @click.stop.prevent="changeStatus(channel)"
          >
          <!-- end костыль -->
            <input
              type="checkbox"
              :id="channel.id"
              class="sr-only"
              :checked="channel.attach"
              true-value="On"
              false-value="Off"
            />
              <!-- @change="changeStatus(channel)" -->
            <label class="bg-gray-400" :for="channel.id">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
            </label>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>

import { PlusIcon } from '@heroicons/vue/outline'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'ChannelsTableItem',
  props: ['channel'],
  data: () => ({
  }),
  components: {
    PlusIcon
  },
  methods: {
    changeStatus(channel) {
      // if(!channel.name === 'Telegram') { // КОСТЫЛЬ ПОКА НЕТ ТЕЛЕГРАМА
        if (!channel.attach) {
          this.$emit('showConnectedModal', channel)
          // this.$emit('openDepositModal')
        } else {
          this.$emit('toogleChannel', channel)
          // this.$store.commit('ChannelsModule/addAttachChannel', { channel, result })
        }
      // }
    },
  },
  computed: {
    ...mapFields('ChannelsModule', {
      channels: 'channels',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  setup() {

    // const sidebarOpen = ref(false)
    // const toggle1 = ref('On')
    // const toggle2 = ref('Off')
    // const toggle3 = ref('Off')

    // return {
    //   sidebarOpen,
    //   toggle1,
    //   toggle2,
    //   toggle3,
    // }  

    // const totalColor = (status) => {
    //   switch (status) {
    //     case 'Paid':
    //       return 'text-emerald-500'
    //     case 'Due':
    //       return 'text-amber-500'
    //     case 'Overdue':
    //       return 'text-rose-500'          
    //     default:
    //       return 'text-gray-500'
    //   }
    // }    

    // const statusColor = (status) => {
    //   switch (status) {
    //     case 'Paid':
    //       return 'bg-emerald-100 text-emerald-600'
    //     case 'Due':
    //       return 'bg-amber-100 text-amber-600'
    //     case 'Overdue':
    //       return 'bg-rose-100 text-rose-500'          
    //     default:
    //       return 'bg-gray-100 text-gray-500'
    //   }
    // }

    // return {
      // totalColor,
      // statusColor,
    // }
  },
}
</script>

<style scoped>
.form-switch input[type=checkbox]:checked + label {
  --tw-bg-opacity: 1;
  background-color: #10B981;
}
</style>