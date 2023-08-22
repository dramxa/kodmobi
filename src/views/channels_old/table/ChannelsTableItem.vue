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
      <div class="font-medium text-gray-800" v-if="channel.tariff === 'monthly'">0 $</div>
      <div class="font-medium text-gray-800" v-else>{{channel.amount}} $</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-gray-800" v-if="channel.tariff !== 'monthly'">0 $</div>
      <div class="font-medium text-gray-800" v-else>{{channel.amount}} $</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="my-3 w-24">
        <div class="flex items-center">
          <!-- <div class="text-sm text-gray-400 italic mr-2">{{channel.status === true ? 'On' : 'Off'}}</div> -->
          <div class="text-sm text-gray-400 italic mr-2">{{getChannelStatus(channel) === true ? 'On' : 'Off'}}</div>
          <div class="form-switch">
            <input
              type="checkbox"
              :id="channel.id"
              class="sr-only"
              :value="getChannelStatus(channel)"
              :checked="getChannelStatus(channel)"
              true-value="On"
              false-value="Off"
              @change="changeStatus(channel)"
            />
            <label class="bg-gray-400" :for="channel.id">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
            </label>
          </div>
        </div>
      </div>
      <!-- <div v-if="channel.remote_id" class="space-x-1">
        <button class="text-gray-400 hover:text-gray-500 rounded-full">
          <span class="sr-only">Edit</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
          </svg>
        </button>
        <button @click.stop="this.$emit('openDeleteModal')" class="text-rose-500 hover:text-rose-600 rounded-full">
          <span class="sr-only">Delete</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>
      </div>
      <div v-else>
        <button @click.prevent="addChannel" class="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 text-sm">
          <PlusIcon class="h-5 w-5 text-indigo-200 hover:text-indigo-300 mr-3" />
          <span>Add</span>
        </button>
      </div> -->
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
      
      // this.$store.commit("ChannelsModule/commitChangeStatus", id)
      if (!this.getChannelStatus(channel)) {
        this.$emit('showConnectedModal', channel)
        // this.$emit('openDepositModal')
      } else {
        this.$emit('deactivationChannel', channel)
      }
    },
    getChannelStatus(channel) {
      let result = false
      if(this.active_project) {
        this.active_project.channels.forEach(el => {
          if(el.id === channel.id) {
            result = true
          }
        });
      }
      return result
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