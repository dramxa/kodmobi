<template>
  <div class="flex flex-col h-full">
    
    <div class="mb-2">
      <!-- Start -->
      <ul class="inline-flex flex-wrap text-sm font-medium">
        <li class="flex items-center">
          <!-- <a class="text-gray-500 hover:text-indigo-500" href="#0">Balance</a> -->
          <router-link class="text-gray-500 hover:text-indigo-500" to="/balance">Balance</router-link>
          <svg class="h-4 w-4 fill-current text-gray-400 mx-3" viewBox="0 0 16 16">
            <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
          </svg>
        </li>
        <li class="flex items-center">
          <span class="text-indigo-500 cursor-default">Invoice for January 2022</span>
        </li>
      </ul>
      <!-- End -->
    </div>


    
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold mb-10 text-gray-800">Transactions</h1>
      <div class="flex">
        <transition name="component-fade" mode="out-in">
          <SearchForm
            v-show="showSearch"
            ref="search"
            @hideField="hideField"
            class="mr-1.5"
          />
        </transition>
        <button
          v-show="!showSearch"
          @click="showSearchForm"
          class="btn border-gray-200 hover:border-gray-300 bg-white mr-1.5"
        >
          <svg class="w-4 h-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>
        </button>
        <DropdownFilter align="right" class="mr-1.5" />
        <Datepicker v-if="showDatepicker"  align="right" />
        <DateSelect v-else @selectValue="selectValue" />
      </div>
    </div>
    <div class="bg-white flex-auto">
      <!-- <div class="flex flex-col md:flex-row md:-mr-px">
        asdadad
      </div> -->
      <!-- <ChannelsTable @change-selection="updateSelectedItems($event)" /> -->
      <TransactionsTable />
    </div>
    <TransactionsPagination
      v-if="billing_data.length"
      class="mt-8"
      :current_page="current_page"
      :last_page="last_page"
      :per_page="per_page"
      :total="total"
    />
  </div>
</template>

<script>

import TransactionsTable from '@/views/balance/transactions/table/TransactionsTable.vue'
import TransactionsPagination from '@/views/balance/transactions/table/TransactionsPagination.vue'
import Datepicker from '@/views/balance/transactions/filters/Datepicker.vue'
import DateSelect from '@/views/balance/transactions/filters/DateSelect.vue'
import DropdownFilter from '@/views/balance/transactions/filters/DropdownFilter.vue'
import SearchForm from '@/views/balance/transactions/filters/SearchForm.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import { ref, onMounted, onUnmounted } from 'vue'

export default ({
  data: () => ({
    showSearch: false,
    showDatepicker: false,
  }),
  components: {
    TransactionsTable,
    TransactionsPagination,
    Datepicker,
    DateSelect,
    DropdownFilter,
    SearchForm
  },
  methods: {
    ...mapActions('BillingModule', ['GET_BILLING']),
    selectValue(val) {
      if(val === 'Custom')
        return this.showDatepicker = true
        return this.showDatepicker = false
    },
    showSearchForm() {
      this.showSearch = true
      this.$nextTick(() => {
        this.$refs.search.focusInput()
      })
    },
    hideField() {
      this.showSearch = false
    }
  },
  computed: {
    ...mapFields('BillingModule', {
      billing_data: 'billing_data',
      current_page: 'billing_meta.current_page',
      last_page: 'billing_meta.last_page',
      per_page: 'billing_meta.per_page',
      total: 'billing_meta.total',
    }),
  },
  mounted() {
    this.GET_BILLING()
  },
})
</script>

<style>
</style>