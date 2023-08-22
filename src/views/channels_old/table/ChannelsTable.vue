<template>
  <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative">
    <!-- <header class="px-5 py-4">
      <h2 class="font-semibold text-gray-800">Invoices <span class="text-gray-400 font-medium">67</span></h2>
    </header> -->
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Channel</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">SMS cost</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Monthly payment</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Actions</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200">
            <ChannelsTableItem
              v-for="channel in channels"
              :key="channel.id"
              :channel="channel"
              @openDepositModal="openDepositModal"
              @showConnectedModal="showConnectedModal"
              @deactivationChannel="deactivationChannel"
            />
          </tbody>
        </table>
      </div>
    </div>
    <ModalBlank id="danger-modal" :modalOpen="deposit_channel_modal.open" @close-modal="deposit_channel_modal.open = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
          <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
        </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">Deposit your balance</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p>You can't activate the channel because you don't have enough money for a monthly payment. Please top up your balance.</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="deposit_channel_modal.open = false">Close</button>
            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Deposit</button>
          </div>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="info-modal" :modalOpen="connectedModal.show" @close-modal="connectedModal.show = false">
      <div class="p-5 flex space-x-4">
        <!-- Icon -->
         <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
            <svg class="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
        <!-- Content -->
        <div class="grow">
          <!-- Modal header -->
          <div class="mb-2">
            <div class="text-lg font-semibold text-gray-800">You have connected {{connectedModal.channel}}</div>
          </div>
          <!-- Modal content -->
          <div class="text-sm mb-10">
            <div class="space-y-2">
              <p v-if="connectedModal.channel !== 'SMS'">A monthly payment of 35₽ will be debited from your account.</p>
              <p v-else>An amount of 0.25₽ will be debited for each SMS message. Please check your balance.</p>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-wrap justify-end space-x-2">
            <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="connectedModal.show = false">Cancel</button>
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="changeChannelStatus">Ok</button>
          </div>
        </div>
      </div>
    </ModalBlank>
  </div>
</template>

<script>
// import { ref, watch } from 'vue'
import ChannelsTableItem from './ChannelsTableItem.vue'
import { mapFields } from 'vuex-map-fields'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import { mapActions } from 'vuex';

export default {
  name: 'ChannelsTable',
  components: {
    ChannelsTableItem,
    ModalBlank,
  },
  data: () => ({
    deposit_channel_modal: {
      open: false
    },
    connectedModal: {
      id: null,
      show: false,
      channel: ''
    }
  }),
  methods: {
    ...mapActions('ChannelsModule', ['TOGGLE_CHANNEL']),
    openDepositModal() {
      this.deposit_channel_modal.open = true
    },
    showConnectedModal(channel) {
      this.connectedModal.id = channel.id
      this.connectedModal.channel = channel.name
      this.connectedModal.show = true
    },
    deactivationChannel(channel) {
      const data = {
        channel_id: channel.id,
        active_project_id: this.active_project.id
      }
      this.TOGGLE_CHANNEL(data)
      // this.connectedModal.show = false
    },
    changeChannelStatus() {
      const data = {
        channel_id: this.connectedModal.id,
        active_project_id: this.active_project.id
      }
      this.TOGGLE_CHANNEL(data)
      // this.connectedModal.show = false
    }
  },
  computed: {
    ...mapFields('ChannelsModule', {
      channels: 'channels',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  // props: ['selectedItems'],
  // setup(props, { emit }) {

  //   const selectAll = ref(false)
  //   const selected = ref([])

  //   const checkAll = () => {
  //     selected.value = []
  //     if (!selectAll.value) {
  //       selected.value = invoices.value.map(invoice => invoice.id)
  //     }
  //   }
    
  //   watch(selected, () => {
  //     selectAll.value = invoices.value.length === selected.value.length ? true : false
  //     emit('change-selection', selected.value)
  //   })    
    
  //   const invoices = ref([
  //     {
  //       id: '0',
  //       invoice: '#123567',
  //       total: '$129.00',
  //       status: 'Overdue',
  //       customer: 'Dominik Lamakani',
  //       issueddate: '22/07/2021',
  //       paiddate: '-',        
  //       type: 'Subscription',
  //     },
  //     {
  //       id: '1',
  //       invoice: '#779912',
  //       total: '$59.00',
  //       status: 'Paid',
  //       customer: 'Mark Cameron',
  //       issueddate: '19/07/2021',
  //       paiddate: '20/07/2021',        
  //       type: 'Subscription',
  //     },
  //     {
  //       id: '2',
  //       invoice: '#889924',
  //       total: '$89.00',
  //       status: 'Paid',
  //       customer: 'Sergio Gonnelli',
  //       issueddate: '17/07/2021',
  //       paiddate: '19/07/2021',        
  //       type: 'One-time',
  //     },
  //     {
  //       id: '3',
  //       invoice: '#897726',
  //       total: '$129.00',
  //       status: 'Due',
  //       customer: 'Manuel Garbaya',
  //       issueddate: '04/07/2021',
  //       paiddate: '-',        
  //       type: 'Subscription',
  //     },
  //     {
  //       id: '4',
  //       invoice: '#123567',
  //       total: '$129.00',
  //       status: 'Due',
  //       customer: 'Cool Robot',
  //       issueddate: '04/07/2021',
  //       paiddate: '-',        
  //       type: 'Subscription',
  //     },
  //     {
  //       id: '5',
  //       invoice: '#896644',
  //       total: '$129.00',
  //       status: 'Paid',
  //       customer: 'Mark Cameron',
  //       issueddate: '04/07/2021',
  //       paiddate: '09/07/2021',        
  //       type: 'One-time',
  //     },
  //     {
  //       id: '6',
  //       invoice: '#136988',
  //       total: '$69.00',
  //       status: 'Paid',
  //       customer: 'Glenn Thomas',
  //       issueddate: '01/07/2021',
  //       paiddate: '01/07/2021',        
  //       type: 'One-time',
  //     },
  //     {
  //       id: '7',
  //       invoice: '#442206',
  //       total: '$129.00',
  //       status: 'Overdue',
  //       customer: 'Dominik Lamakani',
  //       issueddate: '22/06/2021',
  //       paiddate: '-',        
  //       type: 'Subscription',
  //     },
  //     {
  //       id: '8',
  //       invoice: '#764321',
  //       total: '$89.00',
  //       status: 'Paid',
  //       customer: 'Brian Halligan',
  //       issueddate: '21/06/2021',
  //       paiddate: '29/06/2021',        
  //       type: 'One-time',
  //     },
  //     {
  //       id: '9',
  //       invoice: '#908764',
  //       total: '$129.00',
  //       status: 'Due',
  //       customer: 'Carolyn McNeail',
  //       issueddate: '17/06/2021',
  //       paiddate: '-',        
  //       type: 'Subscription',
  //     }
  //   ])

  //   return {
  //     selectAll,
  //     selected,
  //     checkAll,
  //     invoices,
  //   }
  // }
}
</script>