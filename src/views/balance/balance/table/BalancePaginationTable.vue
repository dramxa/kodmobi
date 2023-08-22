<template>
  <div>
    <nav v-if="numberOfPages > 1" class="flex justify-between" role="navigation" aria-label="Navigation">
      <div class="flex-1 mr-2">
        <a
          :class="current_page === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300 text-indigo-500'"
          class="btn bg-white"
          href="javascript:void(0);"
          :disabled="current_page === 1"
          @click="changePageWithButton('-')"
        >
          <div class="flex items-center">
            <ArrowSmLeftIcon class="w-5" />
            <span class="hidden sm:inline">Previous</span>
          </div>
        </a>
      </div>
      <div class="grow text-center">
        <paginate
          v-model="current_page"
          :page-count="numberOfPages"
          :page-range="3"
          :margin-pages="1"
          :click-handler="changePage"
          :hide-prev-next="true"
          prev-text=""
          next-text=""
          :page-link-class="'w-5'"
          :disabled-class="'cursor-not-allowed hover:text-gray-600'"
          :page-class="'inline-flex items-center justify-center leading-5 px-2 py-2 text-gray-600 cursor-pointer hover:text-indigo-500'"
          :active-class="'activePage'"
        />
        <!-- rounded-full text-indigo-500 bg-white border border-gray-200 shadow-sm cursor-default -->
      </div>
      <div class="flex-1 text-right ml-2">
        <a
          :class="current_page === last_page ? 'bg-white border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300 text-indigo-500'"
          class="btn bg-white"
          :disabled="current_page === last_page"
          href="javascript:void(0);"
          @click="changePageWithButton('+')"
        >
          <div class="flex items-center">
            <span class="hidden sm:inline">Next</span>
            <ArrowSmRightIcon class="w-5" />
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>

import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/vue/outline'
import { mapActions } from 'vuex';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'PaginationOrder',
  props: ['payment_history', 'current_page', 'last_page', 'per_page', 'total'],
  components: {
    ArrowSmLeftIcon,
    ArrowSmRightIcon,
    paginate: Paginate,
  },
  methods: {
    ...mapActions('BalanceModule', ['GET_BALANCE']),
    changePage(page) {
      this.GET_BALANCE(page)
    },
    changePageWithButton(value) {
      if(this.current_page !== 1 && value === '-') {
        this.GET_BALANCE(this.current_page - 1)
      } else if(this.current_page !== this.last_page && value === '+') {
        this.GET_BALANCE(this.current_page + 1)
      }
    },
    getRange(start, end) {
      const result =  Array(end - start + 1).fill().map((v, i) => i + start)
      return result
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.total/this.per_page)
    },
  }
}
</script>

<style lang="scss" scope>
.activePage {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-text-opacity: 1;
  color: rgb(99 102 241 / var(--tw-text-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  --tw-border-opacity: 1;
  border-color: rgb(226 232 240 / var(--tw-border-opacity));
  border-width: 1px;
  border-radius: 9999px;
  cursor: default;
}
</style>