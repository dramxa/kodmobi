<template>
  <form class="relative">
    <label for="action-search" class="sr-only">Search</label>
    <input
      v-model="searchField"
      id="action-search"
      ref="searchInput"
      class="form-input pl-9 focus:border-gray-300 h-[40px]"
      type="search"
      :placeholder="placeholder"
      @blur="blurInput"
    />
    <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
      <!-- <svg class="w-4 h-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
      </svg> -->
      <svg class="w-4 h-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.8182 13.0391L10.6767 9.89844C11.3566 9.06641 11.7317 8.01875 11.7317 6.875C11.7317 4.18203 9.54832 2 6.85529 2C4.16226 2 2 4.18273 2 6.875C2 9.56727 4.18312 11.75 6.85529 11.75C7.99913 11.75 9.04849 11.3537 9.87959 10.6944L13.0211 13.835C13.1524 13.9461 13.2977 14 13.4408 14C13.5838 14 13.7286 13.9451 13.8386 13.8352C14.0573 13.6156 14.0573 13.2594 13.8182 13.0391ZM3.12532 6.875C3.12532 4.80734 4.80815 3.125 6.87639 3.125C8.94463 3.125 10.6275 4.80734 10.6275 6.875C10.6275 8.94266 8.94463 10.625 6.87639 10.625C4.80815 10.625 3.12532 8.94219 3.12532 6.875Z"/>
      </svg>
    </button>
  </form>
</template>

<script>

import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'SearchForm',
  data: () => ({
    searchField: '',
    interval: 1000,
    oldSearch: '',
  }),
  props: {
    placeholder: {
      default: 'Search…'      
    }
  },
  watch: {
    searchField(newValue) {
      setTimeout(() => {
        clearInterval(this.interval);
        if (newValue !== this.oldSearch) {
          this.interval = setInterval(() => {
            // this.$store.dispatch('PromoListModule/getPromoList'); // тут отправлять запрос с текстом поиска
            this.GET_BILLING({"page": this.current_page, "search": newValue})
            this.oldSearch = newValue;
            clearInterval(this.interval);
          }, 1000);
        }
      }, 0);
    },
  },
  methods: {
    ...mapActions('BillingModule', ['GET_BILLING']),
    focusInput() {
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    blurInput() {
      if(this.searchField === '') {
        this.$emit('hideField')
      }
    }
  },
  computed: {
    ...mapFields('BillingModule', {
      current_page: 'billing_meta.current_page',
    }),
  }
}
</script>