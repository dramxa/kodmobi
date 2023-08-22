<template>
  <!-- <Header />
  <SideBar /> -->
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" v-if="$route.fullpath !== '/all-projects'" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main>
        <div class="relative flex">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import Header from '@/layouts/layout/header/header.vue'
import Sidebar from '@/layouts/layout/sidebar/sidebar.vue'

export default ({
  components: {
    Header,
    Sidebar,
  },
  mounted() {
  }
})
</script>
