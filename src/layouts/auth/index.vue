<template>
  <main class="relative">
    <div v-if="backgroundLoading" class="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity">
      <div class="fixed top-1/2 left-1/2 transform-translate-xy">
        <svg class="animate-spin w-8 h-8 fill-indigo-500 shrink-0" viewBox="0 0 16 16">
          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      </div>
    </div>
    <div class="relative flex">
      <div class="w-full">
        <div class="w-full md:w-1/2">
          <div class="min-h-screen h-full flex justify-center items-center">
            <router-view />
          </div>
        </div>
        <div class="md:block absolute top-0 bottom-0 right-0 md:w-1/2" >
          <img class="object-cover object-center w-full h-full" src="@/assets/images/auth.png" width="760" height="1024" alt="Authentication" />
          <img class="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block" src="@/assets/images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
          <!-- <img class="absolute top-1/2 transform translate-x-[35%] -translate-y-1/2 ml-8 hidden lg:block" src="@/assets/images/logo.png" width="410" height="206" /> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import { mapFields } from 'vuex-map-fields';

export default ({
  computed: {
    ...mapFields('LoadingModule', {
      backgroundLoading: 'backgroundLoading'
    }),
  },
})
</script>
<style lang="scss">
// .route-enter-form {
//   opacity: 0;
//   transform: translateX(100px);
// }
// .route-enter-active {
//   transition: all 0.3s ease-out;
// }
// .route-leave-to {
//   opacity: 0;
//   transform: translateX(-100px);
// }
// .route-leave-active {
//   transform: all 0.3s ease-in;
// }
</style>
