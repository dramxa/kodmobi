<template>
  <router-view />
</template>

<script>

import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { useToast } from 'vue-toastification'

const toast = useToast()

export default ({
  methods: {
    ...mapActions('ProfileModule', ['GET_PROFILE']),
    ...mapActions('ProjectsModule', ['GET_PROJECTS', 'GET_PROJECT']),
    ...mapActions('ChannelsModule', ['GET_CHANNELS']),
    ...mapActions('BalanceModule', ['GET_BALANCE']),
    ...mapActions('BillingModule', ['GET_BILLING']),
  },
  computed: {
    ...mapFields('ProfileModule', {
      id: 'id',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  watch: {
    // active_project: {
    //   handler(value){
    //     if(value.id) {
    //       window.Echo.channel(`messages.${value.id}`)
    //         .listen('.send', (message) => {
    //           console.log(message, message.data);
    //           this.$store.commit('BillingModule/commitNewMessage', message.data);
    //         });
    //       }
    //   }
    // }
  },
  async created() {
    if(cookies.get('access_token')) {
      await this.GET_PROFILE()
      this.GET_PROJECTS()
      //  this.GET_CHANNELS()
    }
    window.Echo.private(`notification.${this.id}`)
      .listen('.events', (message) => {
        console.log(message)
        // if (message.type == 'test_message') {
        //   this.GET_BILLING({ project_id: this.active_project.id })
        // }
      });
  }
})
</script>

<style lang="scss">
.Vue-Toastification__toast {
  padding: 9px 16px !important;
  min-height: unset !important;
  border-radius: 2px !important;
}
</style>
