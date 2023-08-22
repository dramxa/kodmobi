<template>
  <div class="">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">Channels</h1>
    <div class="bg-white">
      <!-- <div class="flex flex-col md:flex-row md:-mr-px">
        asdadad
      </div> -->
      <!-- <ChannelsTable @change-selection="updateSelectedItems($event)" /> -->
      <ChannelsTable />
    </div>
  </div>
</template>

<script>

import ChannelsTable from '@/views/channels/table/ChannelsTable.vue'
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields'

export default ({
  components: {
    ChannelsTable,
  },
  methods: {
    ...mapActions('ChannelsModule', ['GET_CHANNELS']),
  },
  computed: {
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
  },
  mounted() {
    this.GET_CHANNELS(this.active_project.id)
  }
})
</script>

<style>

</style>