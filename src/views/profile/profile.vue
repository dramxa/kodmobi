<template>
  <div class="">
    <h1 class="text-4xl font-bold mb-10 text-gray-800">Personal Setting</h1>
    <div class="bg-white shadow-lg rounded-sm border border-gray-200">
      <div class="flex flex-col md:flex-row md:-mr-px">
        <!-- <SettingsSidebar /> -->
        <!-- <AccountPanel /> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

// import SettingsSidebar from '@/views/profile/partials/SettingsSidebar.vue'
// import AccountPanel from '@/views/profile/partials/AccountPanel.vue'

export default ({
  components: {
    // SettingsSidebar,
    // AccountPanel,
  },
})
</script>

<style>

</style>