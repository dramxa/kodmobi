<template>
<div class="flex flex-col h-full">
    <section class="flex-auto">
      <div class="flex flex-col bg-white shadow-lg rounded-sm mb-8 h-full p-8">
        <div class="mb-1 flex justify-between">
          <h1 class="text-2xl font-bold text-gray-800">SMS Sint</h1>
        </div>
        <div class="mb-4 text-sm text-gray-600">www.smssint.com</div>
        <div class="mb-8 text-sm text-gray-600">The connection of the channel is free, payment for sent SMS messages is charged according to the operator's tariff. You can view all the prices on the SMS service website.</div>
        <div class="mb-2 text-indigo-500 font-medium text-sm">Operator's tariff</div>
        <div class="mb-8 text-sm text-gray-600">Cost per message</div>
        <div v-if="provider" class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Login</label>
            <div class="relative">
              <input
                v-model="provider.setting.login"
                id="login"
                class="form-input w-full"
                type="text"
                placeholder="Login"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click="provider.setting.login = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Password</label>
            <div class="relative">
              <input
                v-model="provider.setting.password"
                id="password"
                class="form-input w-full"
                type="text"
                placeholder="Password"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click="provider.setting.password = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
          </div>
        </div>
        <div v-if="provider" class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Sender</label>
            <div class="relative">
              <input
                v-model="provider.setting.sender"
                id="sender"
                class="form-input w-full"
                type="text"
                placeholder="Sender"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click="provider.setting.sender = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="name">Url</label>
            <div class="relative">
              <input
                v-model="provider.setting.url"
                id="url"
                class="form-input w-full"
                type="text"
                placeholder="Url"
                required
              />
              <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click="provider.setting.url = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
          </div>
        </div>
        <div class="grow" />
        <div class="flex flex-col px-6 py-5 border-t border-gray-200 -mr-8 -ml-8 -mb-8">
          <div class="flex">
            <button v-if="provider.is_connect" class="btn bg-rose-500 hover:bg-rose-600 text-white mr-3" @click="disconnect()">Disconnect</button>
            <div class="grow" />
            <button class="btn border-gray-200 hover:border-gray-300 text-gray-600" @click="$router.push('/settings/channels')">Cancel</button>
            <button v-if="provider.is_connect" class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="connect()">Save</button>
            <button v-else class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="connect()">Connect</button>
          </div>
        </div>
      </div>
    </section>
</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import { XIcon } from '@heroicons/vue/outline'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  name: 'Provider',
  components: {
    XIcon
  },
  data: () => ({
    provider: null,
  }),
  methods: {
    ...mapActions('ChannelsModule', ['GET_CHANNEL_PROVIDER', 'TOGGLE_PROVIDER', 'UPDATE_CHANNEL_PROVIDER']),
    async disconnect() {
      const data = {
        provider_id: this.provider.id,
        channel_id: 3,
        active_project_id: this.active_project.id
      }
      const res = await this.TOGGLE_PROVIDER(data);
      if(!res.success){
        toast.error(res.error.message);
      }
    },
    async connect(){
      const data = {
        provider_id: this.provider.id,
        channel_id: 3,
        active_project_id: this.active_project.id,
        providerData: {
          type: "sms",
          provider_type: this.provider.type,
          url: this.provider.setting.url,
          login: this.provider.setting.login,
          password: this.provider.setting.password,
          sender: this.provider.setting.sender,
          key: "",
          instance_id: "",
          token: "",
          is_connected: true,
        },
      }
      const res = await this.UPDATE_CHANNEL_PROVIDER(data);
      if(!res.success){
        toast.error(res.error.message);
      } else {
        toast.succsess('Successful connect provider');
        this.$router.push('/settings/channels');
      }
    },
  },
  computed: {
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  async beforeMount(){
    const data = {
      projectId: this.$route.params.projectId,
      channelId: this.$route.params.channelId,
      providerId: this.$route.params.providerId
    }
    this.provider = await this.GET_CHANNEL_PROVIDER(data);
  }
}
</script>