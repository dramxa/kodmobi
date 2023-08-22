<template>
  <div class="bg-white shadow-lg rounded border border-gray-200 relative">
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs font-semibold uppercase text-gray-500 border-b border-gray-200">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">API key</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Actions</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-gray-200">
            <tr>
              <td class="px-2 first:pl-5 last:pr-5 py-4 whitespace-nowrap flex">
                <div class="flex items-center">
                  <div class="font-medium text-lg text-gray-800 mr-4">{{api_key}}</div>
                  <!-- text-gray-400 hover:text-gray-500 -->
                  <button class="text-gray-400 hover:text-gray-500 rounded-full"
                    @click="copyKey(api_key)"
                  >
                    <svg class="w-6 h-6 fill-transparent custom-hover" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-2 first:pl-5 last:pr-5 whitespace-nowrap w-px">
                <div class="space-x-1 text-center">
                  <button class="text-rose-500 hover:text-rose-600 rounded-full">
                    <span class="sr-only">Delete</span>
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                        <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'SettingTable',
  components: {
  },  
  props: ['selectedItems'],
  computed: {
    ...mapFields('SettingModule', {
      api_key: 'api_key',
    }),
  },
  methods: {
    copyKey(key) {
      navigator.clipboard.writeText(key)
    }
  },
}
</script>

<style lang="scss">
.custom-hover {
  &:hover path {
    transition: all .3s ease;
    stroke: #6366f1;
  }
}
</style>