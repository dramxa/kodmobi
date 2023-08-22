<template>
<div class="flex flex-col h-full">
    <div class="mb-8 flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800">Channels</h1>
    </div>
    <section class="flex-auto">
        <div class="bg-white shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
                <!-- <SettingSidebar /> -->
                <div class="grow p-8">
                    <Channels />
                </div>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import SettingSidebar from "@/views/settings/sidebar.vue"
import Channels from '@/views/settings/components/channels.vue'

export default {
  name: 'SettingChannels',
  components: {
    SettingSidebar,
    Channels
  },
}
</script>