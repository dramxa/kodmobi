<template>
  <div class="bg-white shadow-lg rounded-sm border border-gray-200 relative flex flex-col">
    <!-- <header class="px-5 py-4 flex justify-between">
      <h2 class="font-semibold text-gray-800">Total <span class="text-gray-400 font-medium">{{billing_data.length}}</span></h2>
      <div class="text-base text-gray-800 font-semibold">- ${{billingSum}}</div>
    </header> -->
    <div class="flex-auto">

      <!-- Table -->
      <div
        :class="!billing_data.length || loading ? 'flex flex-col justify-center items-center overflow-x-auto h-full' : 'overflow-x-auto h-full'"
      >
        <table v-if="!loading" class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left flex items-center">
                  <span class="mr-1">Sent at</span>
                  <img
                    class="w-3.5 h-3.5"
                    src="@/assets/icons/sort.svg"
                    alt="sort"
                  >
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left">Channel</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left">Provider</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left">Recepient</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left">Credits</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-xs text-left">Status</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200">
            <MessagesTableItem
              v-for="(item, index) in billing_data"
              :key="index"
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
          <div class="mb-6 text-gray-400">You have no messages</div>
          <button class="btn bg-indigo-500 hover:bg-indigo-600 font-medium text-white text-sm w-[156px]" @click.stop="showMessageModal">Send Test Message</button>
        </div>
        <!-- <div v-if="loading" class="my-10">
          <div role="status">
            <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

import MessagesTableItem from '@/views/messages/table/MessagesTableItem.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';

export default {
  name: 'MessagesTable',
  components: {
    MessagesTableItem,
  },
  data: () => ({
  }),
  // props: {
  //   loading: {
  //     type: Boolean,
  //     default: true,
  //   }
  // },
  methods: {
    ...mapActions('BillingModule', ['SEND_TEST_MESSAGE', 'CHECK_CODE']),
    showMessageModal() {
      this.$emit('showMessageModal')
    },
  },
  computed: {
    ...mapFields('LoadingModule', {
      loading: 'messageLoading',
    }),
    ...mapFields('BillingModule', {
      billing_data: 'billing_data',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
}
</script>