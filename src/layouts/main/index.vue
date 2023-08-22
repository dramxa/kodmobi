<template>
  <!-- <Header />
  <SideBar /> -->
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <!-- <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" v-if="$route.fullPath !== '/all-projects' && $route.fullPath !== '/api-key'" /> -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" v-if="$route.fullPath !== '/all-projects'" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="bg-gray-100 flex-auto relative">
      <!-- <main class="bg-gray-100 min-h-screen relative"> -->
      <!-- <transition name="notification">
        <Notification :type="typeNotification" :open="showNotification">
          {{ textNotification }}
        </Notification>
      </transition> -->
      <!-- <button @click="showNotification = true">asd</button> -->
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto h-full">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import Header from '@/layouts/layout/header/header.vue'
import Sidebar from '@/layouts/layout/sidebar/sidebar.vue'
import { ref } from 'vue'
// import Notification from '@/components/Notification/Notification.vue'
// import { mapFields } from 'vuex-map-fields';

export default ({
  components: {
    Header,
    Sidebar,
    // Notification,
  },
  data: () => ({
  }),
  computed: {
    // ...mapFields('NotificationModule', {
    //   showNotification: 'showNotification',
    //   textNotification: 'textNotification',
    //   typeNotification: 'typeNotification',
    // }),
  },
  setup() {
    const sidebarOpen = ref(false)
    return {
      sidebarOpen,
    }  
  }
})
</script>

<style lang="scss">
// .notification-enter-from {
//   opacity: 0;
//   transform: translateX(320px);
// }
// .notification-enter-to {
//   opacity: 1;
//   transform: translateX(0);
// }
// .notification-enter-active {
//   transition: all .3s ease;
// }

// .notification-leave-from {
//   opacity: 1;
//   transform: translateX(0);
// }
// .notification-leave-to {
//   opacity: 0;
//   transform: translateX(320px);
// }
// .notification-leave-active {
//   transition: all .3s ease;
// }

</style>
