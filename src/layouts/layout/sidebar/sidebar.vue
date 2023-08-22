<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true">
    </div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >

      <!-- Sidebar header -->
      <div class="flex justify-between mb-3 pr-3">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-gray-500 hover:text-gray-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="flex items-center self-center flex-auto" to="/settings">
          <img src="@/assets/sidebar-logo-full.svg" alt="logo">
          <!-- <img v-if="sidebarExpanded" src="@/assets/sidebar-logo-full.svg" alt="logo"> -->
          <!-- <img v-else src="@/assets/sidebar-logo-short.svg" alt="logo"> -->
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8 flex flex-col flex-auto">
        <!-- <div>
          <ul> 
            <div class="border-b border-gray-700">
              <DropdownProjects v-if="active_project" @showAddProjectModal="showAddProjectModal" />
              <div v-if="!active_project && !successfully" role="status" class="max-w-sm animate-pulse">
                <div class="h-[24px] bg-gray-900 rounded-md dark:bg-gray-300 mx-3 my-2" />
              </div>
            </div>
          </ul>
        </div> -->
        <!-- Pages group -->
        <div>
          <!-- <h3 class="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span v-if="projectName" class="lg:hidden lg:sidebar-expanded:block 2xl:block">{{projectName}}</span>
            <div v-if="!projectName && !successfully" role="status" class="max-w-sm animate-pulse">
              <div class="h-[18px] bg-gray-900 rounded-md dark:bg-gray-300 w-16" />
            </div>
          </h3> -->
          <ul class=""> 
            <!-- Inbox -->
            <!-- <router-link to="/channels" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-gray-900'">
                <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150" :class="isExactActive && 'hover:text-gray-200'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-gray-600" :class="isExactActive && 'text-indigo-600'" d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                      <path class="fill-current text-gray-400" :class="isExactActive && 'text-indigo-300'" d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      :class="isExactActive && 'text-indigo-500'"
                    >
                      Channels
                    </span>
                  </div>
                </a>
              </li>
            </router-link> -->
            <router-link to="/messages" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-gray-900'">
                <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150" :class="isExactActive && 'hover:text-gray-200'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <!-- <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-gray-400" :class="isExactActive && 'text-indigo-300'" d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z" />
                      <path class="fill-current text-gray-700" :class="isExactActive && '!text-indigo-500'" d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z" />
                      <path class="fill-current text-gray-600" :class="isExactActive && 'text-indigo-600'" d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z" />                      
                    </svg> -->
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path :class="isExactActive ? 'fill-indigo-600': 'fill-gray-600'" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                        <path :class="isExactActive ? 'fill-indigo-300': 'fill-gray-400'" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                      </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      :class="isExactActive && 'text-indigo-500'"
                    >
                      Messages
                    </span>
                  </div>
                </a>
              </li>
            </router-link> 
            <router-link to="/channels" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-gray-900'">
                <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150" :class="isExactActive && 'hover:text-gray-200'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <!-- <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-gray-600" :class="isExactActive && 'text-indigo-500'" d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z" />
                      <path class="fill-current text-gray-400" :class="isExactActive && 'text-indigo-300'" d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                    </svg> -->
                    <svg class="shrink-0 h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path :class="isExactActive ? 'fill-indigo-600' : 'fill-gray-600'" d="M1 9.5C1 8.12109 2.1751 7 3.625 7H9V20.75C9 21.4414 8.28848 22 7.5625 22H4.9375C4.21275 22 3.625 21.4414 3.625 20.75V15.75C2.1751 15.75 1 14.6289 1 13.25V9.5ZM22.3125 11.3594C22.3125 12.4492 21.7629 13.375 21 13.7188V9C21.7629 9.34375 22.3125 10.2695 22.3125 11.3594Z"/>
                      <path :class="isExactActive ? 'fill-indigo-300' : 'fill-gray-400'" d="M21 19.7331C21 20.2437 20.675 20.7068 20.175 20.9047C19.6792 21.0987 19.1042 20.9918 18.725 20.6276L16.9042 18.8662C14.9042 16.9662 12.1917 15.9331 9.3625 15.9331H9V7.06658H9.3625C12.1917 7.06658 14.9042 5.99785 16.9042 4.09867L18.725 2.371C19.1042 2.00876 19.6792 1.90041 20.175 2.09646C20.675 2.29251 21 2.75444 21 3.26664V19.7331Z"/>
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      :class="isExactActive && 'text-indigo-500'"
                    >
                      Channels
                    </span>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/settings" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-gray-900'">
                <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150" :class="isExactActive && 'hover:text-gray-200'" :href="href" @click="navigate">
                  <div class="flex items-center">
                    <!-- <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path class="fill-current text-gray-600" :class="isExactActive && 'text-indigo-500'" d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z" />
                      <path class="fill-current text-gray-400" :class="isExactActive && 'text-indigo-300'" d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                    </svg> -->
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path :class="isExactActive ? 'fill-indigo-600' : 'fill-gray-600'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                      <path :class="isExactActive ? 'fill-indigo-300' : 'fill-gray-400'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                      <path :class="isExactActive ? 'fill-indigo-600' : 'fill-gray-600'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                      <path :class="isExactActive ? 'fill-indigo-300' : 'fill-gray-400'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      :class="isExactActive && 'text-indigo-500'"
                    >
                      Settings
                    </span>
                  </div>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
        <!-- More group -->
        <div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Tutorials</span>
          </h3>
          <ul class="mt-3">
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150 hover:text-gray-200" target="_blank" href="https://kod.mobi/api/">
                <div class="flex items-center">
                  <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <circle class="fill-gray-400" cx="18.5" cy="5.5" r="4.5" />
                    <circle class="fill-gray-600" cx="5.5" cy="5.5" r="4.5" />
                    <circle class="fill-gray-600" cx="18.5" cy="18.5" r="4.5" />
                    <circle class="fill-gray-400" cx="5.5" cy="18.5" r="4.5" />                    
                  </svg>
                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    API Reference
                  </span>
                </div>
              </a>
            </li>
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150 hover:text-gray-200" href="#">
                <div class="flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0001 20C19.4183 20 23.0001 16.4183 23.0001 12C23.0001 7.58172 19.4183 4 15.0001 4C12.0389 4 9.45355 5.60879 8.07031 8H10.0001V16H8.07031C9.45355 18.3912 12.0389 20 15.0001 20Z" fill="#616975"/>
                    <path d="M15 12L8 6V11H0V13H8V18L15 12Z" fill="#ADB3BC"/>
                  </svg>
                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Integration
                  </span>
                </div>
              </a>
            </li>
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <a class="block text-gray-200 hover:text-indigo-300 truncate transition duration-150 hover:text-gray-200" href="#">
                <div class="flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3502_66512)">
                      <path d="M12 15.75C11.1562 15.75 10.5 16.4062 10.5 17.25C10.5 18.0938 11.1141 18.75 12 18.75C12.8016 18.75 13.5 18.1359 13.5 17.25C13.5 16.4062 12.8016 15.75 12 15.75ZM13.5516 6H11.1562C9.28594 6 7.875 7.41094 7.875 9.28125C7.875 9.84844 8.39062 10.4062 9 10.4062C9.60938 10.4062 10.125 9.89062 10.125 9.28125C10.125 8.71875 10.5516 8.25 11.1141 8.25H13.5094C14.1141 8.25 14.625 8.71875 14.625 9.28125C14.625 9.65625 14.4375 9.94219 14.1094 10.1297L11.4375 11.7656C11.0625 12 10.875 12.375 10.875 12.75V13.5C10.875 14.1094 11.3906 14.625 12 14.625C12.6094 14.625 13.125 14.1094 13.125 13.5V13.4062L15.2391 12.0938C16.2234 11.4844 16.8328 10.4062 16.8328 9.28125C16.875 7.41094 15.3797 6 13.5516 6Z" fill="#ADB3BC"/>
                      <path d="M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM12 18.75C11.1562 18.75 10.5 18.0938 10.5 17.25C10.5 16.4062 11.1141 15.75 12 15.75C12.8016 15.75 13.5 16.4062 13.5 17.25C13.5 18.0938 12.8016 18.75 12 18.75ZM15.2391 12.0938L13.125 13.4062V13.5C13.125 14.1094 12.6094 14.625 12 14.625C11.3906 14.625 10.875 14.1094 10.875 13.5V12.75C10.875 12.375 11.0625 12 11.4375 11.7656L14.1094 10.1719C14.4375 9.98438 14.625 9.65625 14.625 9.28125C14.625 8.71875 14.1141 8.25 13.5516 8.25H11.1562C10.5516 8.25 10.125 8.71875 10.125 9.28125C10.125 9.89062 9.60938 10.4062 9 10.4062C8.39062 10.4062 7.875 9.89062 7.875 9.28125C7.875 7.45312 9.32812 6 11.1141 6H13.5094C15.4219 6 16.875 7.45312 16.875 9.28125C16.875 10.4062 16.2656 11.4844 15.2391 12.0938Z" fill="#212C39"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3502_66512">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    How to start?
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="grow" />
        <div v-if="profile" class="border-t border-gray-700">
          <div class="text-gray-200 font-medium mt-2 uppercase">{{ profile.tariff_plan.name }}</div>
          <div class="text-gray-400 text-[10px]">Cost per month {{ profile.tariff_plan.cost }} credits</div>
          <button class="btn w-[100%] border-gray-200 text-gray-300 cursor-not-allowed mt-3" disabled>
            In Development
          </button>
          <button class="btn w-[100%] bg-indigo-500 hover:bg-indigo-600 text-white mt-3" @click.stop="changePlanModalOpen = true">
            <svg v-if="profile.tariff_plan.name == 'free'" class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0631 5.35422C12.0631 5.8933 11.6435 6.29175 11.1255 6.29175C10.6075 6.29175 10.188 5.8933 10.188 5.35422C10.188 4.85734 10.6075 4.4167 11.1255 4.4167C11.6435 4.4167 12.0631 4.85734 12.0631 5.35422ZM11.5006 9.31526V11.2395C11.5006 11.8372 11.1865 12.388 10.6732 12.6927L8.59881 13.9208C8.42537 14.024 8.20973 14.0263 8.03394 13.9279C7.85814 13.8271 7.75032 13.6396 7.75032 13.438V10.7497C7.75032 10.2176 7.53937 9.69027 7.16435 9.31526C6.78933 8.94025 6.28305 8.7504 5.75098 8.7504H3.06253C2.86049 8.7504 2.67377 8.64259 2.57374 8.4668C2.47368 8.29101 2.47557 8.07538 2.57868 7.90194L3.8086 5.82767C4.11236 5.31438 4.66412 4.97921 5.26111 4.97921H7.18545C9.10275 1.91122 12.0818 1.79993 13.8421 2.1238C14.1163 2.17393 14.3273 2.38579 14.3765 2.65814C14.7 4.41904 14.5898 7.39802 11.5006 9.31526ZM7.13857 7.95116C7.44093 8.09882 7.71751 8.29805 7.94018 8.53946C8.2027 8.78321 8.40193 9.05978 8.54959 9.36213C11.0294 8.65899 12.2225 7.49646 12.8061 6.40659C13.3921 5.31203 13.4249 4.12068 13.3218 3.17987C12.3795 3.05542 11.1888 3.10979 10.0731 3.69551C9.00431 4.27748 7.84174 5.47141 7.13857 7.95116ZM3.48397 10.0981C4.29003 9.29182 5.59628 9.29182 6.40258 10.0981C7.20888 10.9044 7.20888 12.2099 6.40258 13.0161C5.24236 14.1763 2.51117 13.9888 2.51117 13.9888C2.51117 13.9888 2.32383 11.2372 3.48397 10.0981ZM4.01369 12.4864C4.01369 12.4864 4.92124 12.5497 5.30799 12.163C5.57519 11.8958 5.57519 11.4598 5.30799 11.1926C5.03844 10.9255 4.60505 10.9255 4.33714 11.1926C3.95134 11.5794 4.01369 12.4864 4.01369 12.4864Z" fill="#E9ECEF"/>
            </svg>
            {{ profile.tariff_plan.name == 'free' ? 'Upgrade' : 'Change Plan' }}
          </button>
        </div> -->
      </div>

      <!-- Expand / collapse button -->
      <!-- <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path class="text-gray-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path class="text-gray-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div> -->
      <!-- <button
        @click.stop="showAddProjectModal"
        class="btn bg-gray-900 text-gray-200 hover:text-indigo-400 duration-300 transition-all mt-5"
      >
        <PlusIcon class="h-5 w-5" />
        <span class="ml-2">New project</span>
      </button> -->

    </div>
    <ModalBasic id="basic-modal" :modalOpen="addProjectModal" @close-modal="closeAddProjectModal" :customPadding="true" title="New project">
      <!-- Modal content -->
      <div class="px-5 pt-4 pb-1">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600" for="email">Name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="create_project.name"
              id="name"
              class="form-input w-full"
              type="text"
              placeholder="Project name"
              maxlength="11"
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon @click="create_project.name = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
          <span class="text-gray-600 text-xs mt-2.5">You can use up to 11 characters</span>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600 font-medium" @click.stop="closeAddProjectModal">Cancel</button>
          <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white" @click="addNewProject">Save</button>
        </div>
      </div>
    </ModalBasic>
    <ChangePlanModal
      :show="changePlanModalOpen"
      @close-modal="changePlanModalOpen = false"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, XIcon } from '@heroicons/vue/outline'
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import ChangePlanModal from "@/components/Modals/ChangePlanModal.vue"
// import DropdownClassic from '@/components/Dropdown/DropdownClassic'
import DropdownProjects from '@/components/Dropdown/DropdownProjects'

import SidebarLinkGroup from '@/layouts/layout/sidebar/SidebarLinkGroup.vue'

export default {
  name: 'Sidebar',
  props: ['sidebarOpen'],
  data: () => ({
    // modal: {
    //   basicModalOpen: false
    // },
    create_project: {
      name: ''
    },
    changePlanModalOpen: false,

  }),
  components: {
    SidebarLinkGroup,
    ModalBasic,
    ModalBlank,
    ChangePlanModal,
    // DropdownClassic,
    DropdownProjects,
    PlusIcon,
    XIcon
  },
  methods: {
    ...mapActions('ProjectsModule', ['ADD_PROJECT']),
    // openModal() {
    //   this.modal.basicModalOpen = true
    // },
    showAddProjectModal () {
      this.$store.commit('ProjectsModule/commitToggleAddProjectModal', true)
    },
    closeAddProjectModal() {
      this.$store.commit('ProjectsModule/commitToggleAddProjectModal', false)
    },
    addNewProject() {
      this.ADD_PROJECT(this.create_project.name)
    },
  },
  computed: {
    ...mapFields('ProjectsModule', {
      addProjectModal: 'modals.addProjectModal.show',
      active_project: 'active_project.project',
    }),
    ...mapFields('AuthModule', {
      successfully: 'register.successfully'
    }),
    ...mapFields('ProfileModule', {
      profile: 'profile',
    }),
    projectName() {
      return this.active_project?.name || ''
    }
  },
  setup(props, { emit }) {

    const trigger = ref(null)
    const sidebar = ref(null)

    // const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    // const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
    const currentRoute = useRouter().currentRoute.value

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      ) return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    } 

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    // watch(sidebarExpanded, () => {
    //   localStorage.setItem('sidebar-expanded', sidebarExpanded.value)
    //   if (sidebarExpanded.value) {
        // document.querySelector('body').classList.add('sidebar-expanded')
    //   } else {
    //     document.querySelector('body').classList.remove('sidebar-expanded')
    //   }
    // })
    document.querySelector('body').classList.add('sidebar-expanded')

    return {
      trigger,
      sidebar,
      // sidebarExpanded,
      currentRoute,
    }
  },
}
</script>