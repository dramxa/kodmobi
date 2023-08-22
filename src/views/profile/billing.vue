<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="space-y-6">
      <div class="p-6">
        <h2 class="text-2xl text-gray-800 font-bold mb-5">Account Balance</h2>
        <span class="font-bold text-xl block">1000 $</span>
        <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white mb-6 mt-5">Top up</button>
        <div class="lg:relative lg:flex">

          <!-- Content -->
          <div class="w-full max-w-9xl mx-auto">

            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-5">

              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h2 class="text-2xl text-gray-800 font-bold mb-5">Cards</h2>
              </div>

              <!-- Add card button -->
              <button @click.stop="card_modal.AddCardModalOpen = true" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Add Card</span>
              </button>

            </div>

            <div v-if="!cards" class="space-y-2">
              <div class=" flex p-6 mb-6 justify-center rounded border border-gray-200 hover:border-gray-300 shadow-sm duration-150 ease-in-out">
                <span class="text-gray-400">No cards</span>
              </div>
            </div>

            <!-- Credit cards -->
            <div v-else class="space-y-2">

              <label
                v-for="card in cards"
                :key="card.id"
                class="relative block cursor-pointer text-left w-full"
              >
                <input type="radio" name="radio-buttons" class="peer sr-only" checked />
                <div class="p-4 rounded border border-gray-200 hover:border-gray-300 shadow-sm duration-150 ease-in-out">
                  <div class="grid grid-cols-12 items-center gap-x-2">
                    <!-- Card -->
                    <div class="col-span-8 order-1 sm:order-none sm:col-span-4 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                      <img :src="require(`@/assets/billing-icons/${card.type.type_logo}`)" :alt="card.type.type_name">
                      <div class="flex flex-col">
                        <div class="flex">
                          <div class="text-sm font-medium text-gray-800 mr-2">{{card.type.type_name}}</div>
                          <div class="text-sm">**** {{card.ultimo_cifre}}</div>
                        </div>
                        <div>
                          <span class="text-xs text-gray-500">Expires {{card.expires}}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Name -->
                    <div class="col-span-8 order-2 sm:order-none sm:col-span-6 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                      <div class="text-sm font-medium text-gray-800 truncate text-left">{{ card.name }}</div>
                    </div>
                    <div class="col-span-12 order-3 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                      <button class="text-rose-500 hover:text-rose-600 rounded-full">
                        <span class="sr-only">Delete</span>
                        <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                            <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mb-5">
        <div class="mb-4 sm:mb-0">
          <h2 class="text-2xl text-gray-800 font-bold mb-5 pl-6">Order history</h2>
        </div>
        <OrderHistoryTable />
        <div v-if="!transactions" class="font-normal text-gray-400 text-center pt-9">No information</div>
        <div class="p-6">
          <PaginationOrderTable v-if="transactions" />
        </div>
      </div>
    </div>
    <ModalBasic id="feedback-modal" :modalOpen="card_modal.AddCardModalOpen" @close-modal="card_modal.AddCardModalOpen = false" title="Add new card">

      <div class="px-5 py-4">
        <div class="text-sm">
          <div class="font-medium text-gray-800 mb-3">Payment Details</div>
        </div>
        <div class="">
          <div class="mb-5">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="card_number">Card Number <span class="text-rose-500">*</span></label>
            <input
              v-model="card_number"
              id="card_number"
              class="form-input w-full text-gray-800"
              type="text"
              placeholder="1234 1234 1234 1234"
              required
              maxlength="19"
              @keypress="keypressCardNumber($event, card_number)"
            />
          </div>
          <div class="flex justify-between mb-5">
            <div class="mr-2 grow">
              <label class="block text-sm font-medium mb-1 text-gray-600" for="expire_date">Expiry Date <span class="text-rose-500">*</span></label>
              <input
                v-model="expire_date"
                id="expire_date"
                class="form-input w-full text-gray-800"
                type="text"
                placeholder="MM/YY"
                required
                maxlength="5"
                @keypress="keypressExpireDate($event, expire_date)"
              />
            </div>
            <div class="ml-2 grow">
              <label class="block text-sm font-medium mb-1 text-gray-600" for="cvc">CVC <span class="text-rose-500">*</span></label>
              <input
                v-model="cvc"
                id="cvc"
                class="form-input w-full text-gray-800"
                type="text"
                placeholder="123"
                required
                maxlength="3"
                @keypress="keypressCvc($event, cvc)"
              />
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="cardholder">Cardholder <span class="text-rose-500">*</span></label>
            <input
              v-model="cardholder"
              id="cardholder"
              class="form-input w-full text-gray-800"
              type="text"
              placeholder="John Doe"
              required
              @keypress="keypressCardholder($event, cardholder)"
            />
          </div>
        </div>
      </div>

      <div class="px-5 py-4 border-t border-gray-200">
        <div class="flex flex-wrap justify-end space-x-2">
          <button
            class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
            @click.stop="card_modal.AddCardModalOpen = false"
          >
            Cancel
          </button>
          <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click="saveCard">Save</button>
        </div>
      </div>
    </ModalBasic>
  </div>
</template>

<script>

import { mapFields } from 'vuex-map-fields';
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import OrderHistoryTable from '@/views/profile/partials/table/OrderHistoryTable.vue'
import PaginationOrderTable from '@/components/Pagination/PaginationOrderTable.vue'
// import { XIcon } from '@heroicons/vue/outline'

export default ({
  data: () => ({
    card_modal: {
      AddCardModalOpen: false,
    },
  }),
  components: {
    ModalBasic,
    OrderHistoryTable,
    PaginationOrderTable,
    // XIcon,
  },
  computed: {
    ...mapFields('BillingModule', {
      cards: 'all_cards.cards',
      transactions: 'transactions',
      id: 'new_card.id',
      card_number: 'new_card.card_number',
      expire_date: 'new_card.expire_date',
      cvc: 'new_card.cvc',
      cardholder: 'new_card.cardholder',
    }),
  },
  methods: {
    saveCard() {
      // this.id = cards.length + 1
      // this.$store.commit("BillingModule/commitAddCard")
    },
    keypressCardNumber(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      } else {
        if(value.length === 4 || value.length === 9 || value.length === 14) {
          this.card_number += " "
        }
      }
    },
    keypressExpireDate(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      } else {
        if(value.length === 2) {
          this.expire_date += "/"
        }
      }
    },
    keypressCvc(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      }
    },
    keypressCardholder(e, value) {
      if (!/^[A-Z a-z]+$/.test(e.key)) {
        return e.preventDefault();
      }
    }
  }
})
</script>

<style>

</style>