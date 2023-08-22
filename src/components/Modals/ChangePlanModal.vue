<template>
  <ModalBlank id="provider-setting-modal" :modalOpen="show" :maxWidth="'798px'" @close-modal="close">
    <div class="py-3 mt-2 mx-3 px-5 flex items-center justify-between border-b border-gray-200">
      <div class="font-semibold text-gray-800">Choose your plan</div>
      <XIcon @click.stop="close" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
    </div>
    <div v-if="profile" class="px-5 pt-6 pb-5 flex space-x-6">
      <div class="grow">
        <div class="h-[107px] flex items-center text-gray-600 font-bold text-2xl mb-4">
          Tariff options
        </div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Kod.Mobi WhatsApp provider</div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Kod.Mobi Telegram provider</div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Kod.Mobi SMS provider</div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Custom WhatsApp provider</div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Custom Telegram provider</div>
        <div class="h-[40px] flex items-center text-gray-800 text-sm">Custom SMS provider</div>
      </div>
      <div class="w-[250px] border border-gray-200 rounded-[10px] shadow-[0_4px_6px_rgba(15,23,42,0.08)]">
        <div class="h-[108px] border-b border-gray-200 mb-[22px] px-5 py-4">
          <div class="text-gray-800 text-lg font-semibold mb-2.5">FREE</div>
          <div class="text-center">
            <span class="font-bold text-gray-800 text-base">$</span>
            <span class="font-bold text-gray-800 text-4xl">0</span>
            <span class="font-medium text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div class="px-5 pb-5">
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.07 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.01 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.07 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">-</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">-</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">-</div>
          <button v-if="profile.tariff_plan.name == 'free'" class="btn w-[100%] border-gray-200 text-gray-400 bg-gray-100 text-sm font-medium cursor-not-allowed">Current plan</button>
          <button v-else class="btn w-[100%] text-white bg-indigo-500 hover:bg-indigo-600" @click="selectPlan(1)">Select</button>
        </div>
      </div>
      <div class="w-[250px] border border-indigo-300 rounded-[10px] shadow-[0_0_10px_#A2B1F7]">
        <div class="h-[108px] border-b border-gray-200 mb-[22px] px-5 py-4">
          <div class="flex items-center justify-between">
            <div class="text-gray-800 text-lg font-semibold">PRO</div>
            <div class="h-[26px] w-[90px] flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 text-sm font-medium">Popular 🤩</div>
          </div>
          <div class="text-center mt-2.5">
            <span class="font-bold text-gray-800 text-base">$</span>
            <span class="font-bold text-gray-800 text-4xl">99</span>
            <span class="font-medium text-gray-500 text-sm">/mo</span>
          </div>
        </div>
        <div class="px-5 pb-5">
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.07 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.01 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.07 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.01 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.01 / message</div>
          <div class="text-sm text-gray-500 leading-6 mb-4 text-center">$0.01 / message</div>
          <button v-if="profile.tariff_plan.name == 'free'" class="btn w-[100%] text-white bg-indigo-500 hover:bg-indigo-600" @click="selectPlan(2)">Select</button>
          <button v-else class="btn w-[100%] border-gray-200 text-gray-400 bg-gray-100 text-sm font-medium cursor-not-allowed">Current plan</button>
        </div>
      </div>
    </div>
  </ModalBlank>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { XIcon } from '@heroicons/vue/outline'
import ModalBlank from '@/components/Modals/ModalBlank.vue'

export default {
  name: "ChangePlanModal",
  props: {
    show: Boolean,
  },
  emits: ['close-modal'],
  components: {
    XIcon,
    ModalBlank,
  },
  data: () => ({
    tariffs: null,
  }),
  methods: {
    ...mapActions('ProfileModule', ['GET_TARIFF_PLANS', 'UPGRADE_TARIF_PLAN']),
    close() {
      this.$emit('close-modal')
    },
    async selectPlan(id){
      const res = await this.UPGRADE_TARIF_PLAN(id)
      console.log(res)
      if(res.data && res.data.link) {
        location.href = res.data.link;
        // window.open(res.data.link, '_blank');
      }
    }
  },
  computed: {
    ...mapFields('ProfileModule', {
      profile: 'profile',
    }),
  },
  async mounted() {
    this.tariffs = await this.GET_TARIFF_PLANS()
  },
}
</script>

<style>

</style>