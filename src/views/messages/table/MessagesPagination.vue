<template>
  <div v-if="numberOfPages > 1">
    <nav class="flex justify-between" role="navigation" aria-label="Navigation">
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
import { mapFields } from 'vuex-map-fields';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'PaginationMessages',
  props: ['current_page', 'last_page', 'per_page', 'total'],
  components: {
    ArrowSmLeftIcon,
    ArrowSmRightIcon,
    paginate: Paginate,
  },
  methods: {
    ...mapActions('BillingModule', ['GET_BILLING']),
    changePage(page) {
      // if(page !== this.current_page) {
        this.GET_BILLING({ page })
      // }
    },
    changePageWithButton(value) {
      if(this.current_page !== 1 && value === '-') {
        this.GET_BILLING({ project_id: this.active_project.id, page: this.current_page - 1 })
      } else if(this.current_page !== this.last_page && value === '+') {
        this.GET_BILLING({ project_id: this.active_project.id, page: this.current_page + 1 })
      }
    },
  },
  computed: {
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
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