<template>
  <div class="">
    <div class="min-h-[272px] flex items-center justify-center" v-if="!channels.length">
      <div role="status">
        <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <transition-group name="flip-list" tag="div" v-else>
      <div class="text-sm mb-4 text-gray-800"  key="subtitle">You can change the priority of channels. Messages will be sent according to priority.</div>
      <div v-for="(channel, index) in channels" :key="channel.id" class="py-4 px-5 mb-[5px] border border-gray-200 rounded flex items-center space-x-4 relative" :class="channel.is_active ? 'bg-white' : 'bg-gray-50'">
        <svg v-if="channel.type == 'whatsapp'" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#25D366"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5931 28.0145H18.5887C16.7973 28.0139 15.0372 27.5644 13.4738 26.7117L7.7998 28.2001L9.31827 22.6537C8.3816 21.0305 7.88874 19.1892 7.88954 17.3028C7.89189 11.4014 12.6934 6.6001 18.593 6.6001C21.4563 6.60133 24.1437 7.716 26.1645 9.73916C28.1853 11.7622 29.2975 14.4513 29.2964 17.3112C29.294 23.2113 24.4944 28.0121 18.5931 28.0145ZM13.7367 24.774L14.0616 24.9668C15.4274 25.7774 16.9931 26.2062 18.5895 26.2069H18.5931C23.4964 26.2069 27.4872 22.216 27.4892 17.3106C27.4901 14.9335 26.5657 12.6984 24.8861 11.0168C23.2064 9.33527 20.9728 8.40875 18.5966 8.40792C13.6895 8.40792 9.69864 12.3984 9.69669 17.3034C9.696 18.9844 10.1663 20.6214 11.0569 22.0378L11.2684 22.3744L10.3697 25.6573L13.7367 24.774ZM23.6191 19.6156C23.8056 19.7058 23.9316 19.7667 23.9854 19.8564C24.0522 19.968 24.0522 20.5034 23.8295 21.1282C23.6065 21.7529 22.5381 22.3231 22.0242 22.3998C21.5635 22.4687 20.9804 22.4975 20.3398 22.2939C19.9513 22.1706 19.4532 22.0061 18.8151 21.7305C16.3079 20.6479 14.6136 18.2179 14.2933 17.7586C14.2709 17.7264 14.2552 17.7039 14.2465 17.6923L14.2443 17.6894C14.1028 17.5005 13.1544 16.2352 13.1544 14.9257C13.1544 13.6938 13.7596 13.0481 14.0381 12.7509C14.0572 12.7305 14.0747 12.7118 14.0905 12.6946C14.3356 12.4268 14.6254 12.3599 14.8036 12.3599C14.9819 12.3599 15.1604 12.3616 15.3162 12.3694C15.3354 12.3704 15.3554 12.3702 15.3761 12.3701C15.532 12.3692 15.7263 12.3681 15.9179 12.8285C15.9917 13.0057 16.0996 13.2683 16.2134 13.5454C16.4435 14.1056 16.6978 14.7247 16.7425 14.8143C16.8094 14.9481 16.8539 15.1042 16.7648 15.2828C16.7514 15.3096 16.739 15.3349 16.7272 15.359C16.6603 15.4957 16.611 15.5962 16.4974 15.7289C16.4527 15.7811 16.4065 15.8373 16.3603 15.8936C16.2683 16.0056 16.1763 16.1177 16.0962 16.1975C15.9623 16.3308 15.8229 16.4755 15.9789 16.7433C16.135 17.011 16.6717 17.8868 17.4667 18.596C18.3214 19.3583 19.0642 19.6805 19.4407 19.8438C19.5142 19.8757 19.5738 19.9015 19.6175 19.9234C19.8848 20.0573 20.0408 20.0349 20.1968 19.8564C20.3528 19.678 20.8654 19.0755 21.0436 18.8078C21.2219 18.5401 21.4003 18.5847 21.6454 18.6739C21.8906 18.7633 23.2054 19.4102 23.4729 19.544C23.5251 19.5702 23.5739 19.5938 23.6191 19.6156Z" fill="white"/>
        </svg>
        <svg v-if="channel.type == 'telegram'" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.0589 27.9411 0 18 0C8.0589 0 0 8.0589 0 18C0 27.9411 8.0589 36 18 36Z" fill="#37AEE2"/>
          <path d="M6.70323 18.8803C8.80742 17.7212 11.1563 16.7539 13.3509 15.7816C17.1266 14.189 20.9172 12.6241 24.7461 11.1671C25.4911 10.9189 26.8296 10.6761 26.9609 11.7801C26.889 13.3428 26.5934 14.8964 26.3906 16.4499C25.8758 19.8663 25.2809 23.271 24.7008 26.6762C24.5009 27.8104 23.0801 28.3976 22.1709 27.6717C19.986 26.1959 17.7843 24.7344 15.6273 23.2244C14.9207 22.5064 15.5759 21.4754 16.207 20.9627C18.0065 19.1892 19.915 17.6825 21.6205 15.8174C22.0805 14.7064 20.7212 15.6427 20.2729 15.9296C17.8093 17.6273 15.406 19.4286 12.8086 20.9207C11.4818 21.651 9.93549 21.0269 8.60934 20.6193C7.42028 20.127 5.67786 19.631 6.70311 18.8804L6.70323 18.8803Z" fill="white"/>
        </svg>
        <svg v-if="channel.type == 'sms'" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3407_83251)">
            <path d="M18 3.375C9.9225 3.375 3.375 9.9225 3.375 18C3.375 21.0216 4.29139 23.8288 5.86121 26.1595L4.5 32.625L11.5697 31.1364C13.5107 32.0883 15.6921 32.625 18 32.625C26.0775 32.625 32.625 26.0775 32.625 18C32.625 9.9225 26.0775 3.375 18 3.375ZM11.25 16.3125C12.1838 16.3125 12.9375 17.0662 12.9375 18C12.9375 18.9338 12.1838 19.6875 11.25 19.6875C10.3162 19.6875 9.5625 18.9338 9.5625 18C9.5625 17.0662 10.3162 16.3125 11.25 16.3125ZM18 16.3125C18.9338 16.3125 19.6875 17.0662 19.6875 18C19.6875 18.9338 18.9338 19.6875 18 19.6875C17.0662 19.6875 16.3125 18.9338 16.3125 18C16.3125 17.0662 17.0662 16.3125 18 16.3125ZM24.75 16.3125C25.6838 16.3125 26.4375 17.0662 26.4375 18C26.4375 18.9338 25.6838 19.6875 24.75 19.6875C23.8162 19.6875 23.0625 18.9338 23.0625 18C23.0625 17.0662 23.8162 16.3125 24.75 16.3125Z" fill="#6366F1"/>
          </g>
          <defs>
            <clipPath id="clip0_3407_83251">
              <rect width="36" height="36" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div class="grow">
          <div class="text-base text-gray-800 font-semibold flex items-center">
            <div class="flex">
              {{ channel.name }} &nbsp;<span v-if="channel.priority_provider && channel.is_active" class="font-normal italic text-sm">/ {{ channel.priority_provider.name }}</span>
            </div>
            <!-- <svg class="ml-2.5 cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$router.push(`/settings/${channel.id}/providers`)">
              <path d="M6.37329 9C6.37329 7.57881 7.52529 6.46875 9.00018 6.46875C10.4504 6.46875 11.6271 7.57881 11.6271 9C11.6271 10.3975 10.4504 11.5312 9.00018 11.5312C7.52529 11.5312 6.37329 10.3975 6.37329 9ZM9.00018 7.73438C8.27505 7.73438 7.68674 8.30127 7.68674 9C7.68674 9.69873 8.27505 10.2656 9.00018 10.2656C9.72532 10.2656 10.3136 9.69873 10.3136 9C10.3136 8.30127 9.72532 7.73438 9.00018 7.73438ZM10.0154 2.25001C10.6228 2.25001 11.151 2.65052 11.2932 3.21873L11.5067 4.07487C11.7393 4.1843 11.9609 4.30849 12.1716 4.44586L13.05 4.19669C13.6328 4.03137 14.2567 4.27157 14.5604 4.77782L15.5756 6.47139C15.8766 6.97764 15.7809 7.61836 15.343 8.02178L14.6781 8.60713C14.6863 8.75215 14.6918 8.87607 14.6918 9C14.6918 9.12393 14.6863 9.24785 14.6781 9.36914L15.343 9.97822C15.7809 10.3816 15.8766 11.0224 15.5756 11.5286L14.5604 13.2214C14.2567 13.7276 13.6328 13.9676 13.05 13.8041L12.1716 13.5536C11.9609 13.6907 11.7393 13.8146 11.5067 13.9254L11.2932 14.7823C11.151 15.3492 10.6228 15.75 10.0154 15.75H7.985C7.37753 15.75 6.84941 15.3492 6.70712 14.7823L6.49369 13.9254C6.2611 13.8146 6.03945 13.6907 5.82876 13.5536L4.92576 13.8041C4.36837 13.9676 3.74475 13.7276 3.44129 13.2214L2.42611 11.5286C2.12264 11.0224 2.21864 10.3816 2.65815 9.97822L3.32144 9.36914C3.31296 9.24785 3.30858 9.12393 3.30858 8.97627C3.30858 8.87607 3.31296 8.75215 3.32144 8.60713L2.65815 8.02178C2.21861 7.61836 2.12264 6.97764 2.42611 6.47139L3.44129 4.77782C3.74475 4.27157 4.36837 4.03137 4.92576 4.19669L5.82876 4.44586C6.03945 4.30849 6.2611 4.1843 6.49369 4.07487L6.70712 3.21873C6.84941 2.65025 7.37753 2.25 7.985 2.25L10.0154 2.25001ZM7.61833 4.98164L7.31186 5.10557C6.96434 5.24531 6.64145 5.42725 6.34866 5.64346L6.08324 5.83857L4.57879 5.41143L3.56333 7.1042L4.69892 8.1457L4.65705 8.46211C4.63407 8.63877 4.62203 8.81807 4.62203 9C4.62203 9.18193 4.63407 9.36123 4.65705 9.53789L4.69892 9.8543L3.56361 10.8958L4.57879 12.5886L6.08324 12.1614L6.34866 12.3565C6.64145 12.5728 6.96434 12.7547 7.31186 12.8944L7.61833 13.0184L7.985 14.4844H10.0154L10.382 13.0184L10.6885 12.8944C11.036 12.7547 11.3589 12.5728 11.6517 12.3565L11.9171 12.1614L13.4221 12.5886L14.4373 10.8958L13.3017 9.8543L13.3428 9.53789C13.3674 9.36123 13.3783 9.18193 13.3783 9C13.3783 8.81807 13.3674 8.63877 13.3428 8.46211L13.3017 8.1457L14.4373 7.1042L13.4221 5.41143L11.9171 5.83857L11.6517 5.64346C11.3589 5.42725 11.036 5.24531 10.6885 5.10557L10.382 4.98164L10.0154 3.51562H7.985L7.61833 4.98164Z" fill="#6366F1"/>
            </svg> -->
            <div v-if="channel.is_priority" class="py-0.5 px-2.5 bg-indigo-100 text-indigo-500 text-xs rounded-full ml-2">Priority</div>
          </div>
          <div v-if="channel.is_active" class="text-sm text-gray-600">
            <!-- <template v-if="!channel.is_active"> -->
              <span class="text-gray-800 font-medium">${{ channel.priority_provider.cost }}</span> / message
            <!-- </template>
            <template v-else>
              <span class="text-gray-800 font-medium">{{channel.amount}}</span>
              Credit / message
            </template> -->
          </div>
        </div>
        <button v-if="!channel.is_priority && channel.is_active" class="btn h-[38px] z-10 shadow-none text-gray-600 hover:text-gray-800 text-sm" @click.stop="setPriority(channel)">
          Set as priority
        </button>
        <button class="btn min-w-[110px] h-[38px] bg-white border-gray-200 hover:border-gray-300 text-indigo-500 text-sm ml-4" @click.stop="$router.push(`/settings/${channel.id}/providers`)">
          Providers
        </button>
        <div class="absolute top-0 left-0 bottom-0 right-[180px]"  @click="$router.push(`/settings/${channel.id}/providers`)"></div>
        <!-- <svg :class="this.channels[index - 1] ? 'fill-gray-400 cursor-pointer' : 'fill-gray-300 cursor-not-allowed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="sortUp(index)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43433 4.52533C7.74675 4.21291 8.25328 4.21291 8.5657 4.52533L14.3839 10.3435C14.6963 10.6559 14.6963 11.1625 14.3839 11.4749C14.0715 11.7873 13.5649 11.7873 13.2525 11.4749L8.00002 6.22239L2.74752 11.4749C2.4351 11.7873 1.92857 11.7873 1.61615 11.4749C1.30373 11.1625 1.30373 10.6559 1.61615 10.3435L7.43433 4.52533Z"/>
        </svg>
        <svg :class="this.channels[index + 1] ? 'fill-gray-400 cursor-pointer' : 'fill-gray-300 cursor-not-allowed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" @click="sortDown(index)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56567 11.4747C8.25325 11.7871 7.74672 11.7871 7.4343 11.4747L1.61611 5.65649C1.3037 5.34407 1.3037 4.83754 1.61611 4.52512C1.92853 4.2127 2.43507 4.2127 2.74749 4.52512L7.99998 9.77761L13.2525 4.52512C13.5649 4.2127 14.0714 4.2127 14.3838 4.52512C14.6963 4.83754 14.6963 5.34407 14.3838 5.65649L8.56567 11.4747Z"/>
        </svg> -->
        <div class="form-switch">
          <input :checked="channel.is_active" @click.prevent="toogleChannel(channel)" type="checkbox" :id="`channel${channel.id}`" class="sr-only" true-value="On" false-value="Off" />
          <label class="bg-gray-400" :for="`channel${channel.id}`">
            <span class="bg-white shadow-sm" aria-hidden="true"></span>
            <span class="sr-only">Toggle</span>
          </label>
        </div>
      </div>
      <!-- <button key="add-channel-btn" class="btn mt-4 border-gray-200 hover:border-gray-300 text-indigo-500 shadow" @click.stop="profile.tariff_plan.name == 'free' ? tariffPlanModalOpen = true : addChannelModalOpen = true">
        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.125 7.125H8.875V1.875C8.875 1.35 8.525 1 8 1C7.475 1 7.125 1.35 7.125 1.875V7.125H1.875C1.35 7.125 1 7.475 1 8C1 8.525 1.35 8.875 1.875 8.875H7.125V14.125C7.125 14.65 7.475 15 8 15C8.525 15 8.875 14.65 8.875 14.125V8.875H14.125C14.65 8.875 15 8.525 15 8C15 7.475 14.65 7.125 14.125 7.125Z" fill="#6366F1"/>
        </svg>
        Add Channel
      </button> -->
      <button key="add-channel-btn" class="btn mt-4 min-w-[150px] border-gray-200 text-gray-300 shadow cursor-not-allowed">
        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="fill-gray-300" d="M14.125 7.125H8.875V1.875C8.875 1.35 8.525 1 8 1C7.475 1 7.125 1.35 7.125 1.875V7.125H1.875C1.35 7.125 1 7.475 1 8C1 8.525 1.35 8.875 1.875 8.875H7.125V14.125C7.125 14.65 7.475 15 8 15C8.525 15 8.875 14.65 8.875 14.125V8.875H14.125C14.65 8.875 15 8.525 15 8C15 7.475 14.65 7.125 14.125 7.125Z"/>
        </svg>
        Add Channel
      </button>
      <!-- <div class="py-4 px-5 border rounded shadow-lg flex items-center space-x-4" :style="{borderColor: '#E9ECEF'}">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#25D366"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5931 28.0145H18.5887C16.7973 28.0139 15.0372 27.5644 13.4738 26.7117L7.7998 28.2001L9.31827 22.6537C8.3816 21.0305 7.88874 19.1892 7.88954 17.3028C7.89189 11.4014 12.6934 6.6001 18.593 6.6001C21.4563 6.60133 24.1437 7.716 26.1645 9.73916C28.1853 11.7622 29.2975 14.4513 29.2964 17.3112C29.294 23.2113 24.4944 28.0121 18.5931 28.0145ZM13.7367 24.774L14.0616 24.9668C15.4274 25.7774 16.9931 26.2062 18.5895 26.2069H18.5931C23.4964 26.2069 27.4872 22.216 27.4892 17.3106C27.4901 14.9335 26.5657 12.6984 24.8861 11.0168C23.2064 9.33527 20.9728 8.40875 18.5966 8.40792C13.6895 8.40792 9.69864 12.3984 9.69669 17.3034C9.696 18.9844 10.1663 20.6214 11.0569 22.0378L11.2684 22.3744L10.3697 25.6573L13.7367 24.774ZM23.6191 19.6156C23.8056 19.7058 23.9316 19.7667 23.9854 19.8564C24.0522 19.968 24.0522 20.5034 23.8295 21.1282C23.6065 21.7529 22.5381 22.3231 22.0242 22.3998C21.5635 22.4687 20.9804 22.4975 20.3398 22.2939C19.9513 22.1706 19.4532 22.0061 18.8151 21.7305C16.3079 20.6479 14.6136 18.2179 14.2933 17.7586C14.2709 17.7264 14.2552 17.7039 14.2465 17.6923L14.2443 17.6894C14.1028 17.5005 13.1544 16.2352 13.1544 14.9257C13.1544 13.6938 13.7596 13.0481 14.0381 12.7509C14.0572 12.7305 14.0747 12.7118 14.0905 12.6946C14.3356 12.4268 14.6254 12.3599 14.8036 12.3599C14.9819 12.3599 15.1604 12.3616 15.3162 12.3694C15.3354 12.3704 15.3554 12.3702 15.3761 12.3701C15.532 12.3692 15.7263 12.3681 15.9179 12.8285C15.9917 13.0057 16.0996 13.2683 16.2134 13.5454C16.4435 14.1056 16.6978 14.7247 16.7425 14.8143C16.8094 14.9481 16.8539 15.1042 16.7648 15.2828C16.7514 15.3096 16.739 15.3349 16.7272 15.359C16.6603 15.4957 16.611 15.5962 16.4974 15.7289C16.4527 15.7811 16.4065 15.8373 16.3603 15.8936C16.2683 16.0056 16.1763 16.1177 16.0962 16.1975C15.9623 16.3308 15.8229 16.4755 15.9789 16.7433C16.135 17.011 16.6717 17.8868 17.4667 18.596C18.3214 19.3583 19.0642 19.6805 19.4407 19.8438C19.5142 19.8757 19.5738 19.9015 19.6175 19.9234C19.8848 20.0573 20.0408 20.0349 20.1968 19.8564C20.3528 19.678 20.8654 19.0755 21.0436 18.8078C21.2219 18.5401 21.4003 18.5847 21.6454 18.6739C21.8906 18.7633 23.2054 19.4102 23.4729 19.544C23.5251 19.5702 23.5739 19.5938 23.6191 19.6156Z" fill="white"/>
        </svg>
        <div class="grow">
          <div class="text-gray-800 font-semibold">WhatsApp</div>
          <div class="text-sm text-gray-600">
            Cost per message: 
            <span class="text-gray-800 font-medium">0.1 Credit</span>
          </div>
        </div>
        <button class="btn bg-white border-gray-200 hover:border-gray-300 text-rose-500 w-[100px]">
          Disconnect
        </button>
      </div>
      <div class="py-4 px-5 border rounded shadow-lg flex items-center space-x-4" :style="{borderColor: '#E9ECEF'}">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.0589 27.9411 0 18 0C8.0589 0 0 8.0589 0 18C0 27.9411 8.0589 36 18 36Z" fill="#37AEE2"/>
          <path d="M6.70323 18.8803C8.80742 17.7212 11.1563 16.7539 13.3509 15.7816C17.1266 14.189 20.9172 12.6241 24.7461 11.1671C25.4911 10.9189 26.8296 10.6761 26.9609 11.7801C26.889 13.3428 26.5934 14.8964 26.3906 16.4499C25.8758 19.8663 25.2809 23.271 24.7008 26.6762C24.5009 27.8104 23.0801 28.3976 22.1709 27.6717C19.986 26.1959 17.7843 24.7344 15.6273 23.2244C14.9207 22.5064 15.5759 21.4754 16.207 20.9627C18.0065 19.1892 19.915 17.6825 21.6205 15.8174C22.0805 14.7064 20.7212 15.6427 20.2729 15.9296C17.8093 17.6273 15.406 19.4286 12.8086 20.9207C11.4818 21.651 9.93549 21.0269 8.60934 20.6193C7.42028 20.127 5.67786 19.631 6.70311 18.8804L6.70323 18.8803Z" fill="white"/>
        </svg>
        <div class="grow">
          <div class="text-gray-800 font-semibold">Telegram</div>
          <div class="text-sm text-gray-600">
            Cost per message: 
            <span class="text-gray-800 font-medium">0.1 Credit</span>
          </div>
        </div>
        <button class="btn bg-gray-100 border-gray-200 text-gray-400 w-[100px] cursor-default">
          Soon
        </button>
      </div>
      <div class="py-4 px-5 border rounded shadow-lg flex items-center space-x-4" :style="{borderColor: '#E9ECEF'}">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.6352 30.4883C31.1523 30.0053 31.0948 29.2232 31.5202 28.6711C33.9234 25.6347 35.3378 21.7816 35.2458 17.5951C35.0388 8.63533 27.7372 1.1708 18.8028 0.768249C8.9025 0.319688 0.75 8.19827 0.75 17.9976C0.75 26.5548 6.98224 33.6398 15.1462 34.997C15.5257 35.066 15.9281 35.1235 16.3536 35.1695C16.9515 35.227 17.4919 35.25 17.9979 35.25H33.9498C34.8524 35.25 35.3044 34.1585 34.6661 33.52L31.6352 30.4883Z" fill="#6366F1"/>
          <path d="M9.42736 21.4498C8.9297 21.4498 8.44741 21.3763 7.98047 21.2294C7.51968 21.0824 7.15412 20.8876 6.88379 20.6448L7.2985 19.6769C7.56269 19.8941 7.88524 20.073 8.26616 20.2136C8.65323 20.3477 9.04029 20.4148 9.42736 20.4148C9.90658 20.4148 10.2629 20.3349 10.4964 20.1752C10.736 20.0155 10.8558 19.8047 10.8558 19.5427C10.8558 19.3511 10.7882 19.1945 10.6531 19.0731C10.524 18.9454 10.3582 18.8463 10.1554 18.7761C9.95266 18.7058 9.67619 18.6259 9.32598 18.5365C8.83447 18.4151 8.43512 18.2937 8.12793 18.1723C7.82688 18.0509 7.56576 17.8624 7.34458 17.6069C7.12954 17.3449 7.02203 16.9936 7.02203 16.5527C7.02203 16.1822 7.11726 15.8467 7.30772 15.5465C7.50432 15.2398 7.79616 14.997 8.18322 14.8181C8.57643 14.6392 9.05565 14.5498 9.62089 14.5498C10.0141 14.5498 10.4012 14.6009 10.7821 14.7031C11.163 14.8054 11.4917 14.9523 11.7682 15.144L11.3903 16.1119C11.1077 15.9394 10.8128 15.8084 10.5056 15.719C10.1984 15.6295 9.90044 15.5848 9.61167 15.5848C9.1386 15.5848 8.78532 15.6679 8.55185 15.834C8.32453 16.0001 8.21087 16.2205 8.21087 16.4952C8.21087 16.6869 8.27538 16.8434 8.4044 16.9648C8.53957 17.0862 8.70852 17.182 8.91127 17.2523C9.11402 17.3226 9.39049 17.4024 9.7407 17.4919C10.2199 17.6069 10.6131 17.7283 10.9203 17.8561C11.2275 17.9774 11.4886 18.1659 11.7037 18.4215C11.9248 18.677 12.0354 19.022 12.0354 19.4565C12.0354 19.827 11.9371 20.1624 11.7405 20.4627C11.5501 20.763 11.2582 21.0026 10.865 21.1815C10.4718 21.3604 9.9926 21.4498 9.42736 21.4498Z" fill="white"/>
          <path d="M20.4302 14.5498C21.1859 14.5498 21.7757 14.7798 22.1996 15.2398C22.6236 15.6934 22.8355 16.3483 22.8355 17.2044V21.354H21.6375V17.2523C21.6375 16.722 21.5023 16.3227 21.232 16.0544C20.9678 15.7797 20.6207 15.6423 20.1906 15.6423C19.7114 15.6423 19.3274 15.7829 19.0386 16.064C18.756 16.3451 18.6147 16.7763 18.6147 17.3577V21.354H17.4166V17.2523C17.4166 16.7156 17.2907 16.3131 17.0388 16.0448C16.793 15.7765 16.4551 15.6423 16.025 15.6423C15.5397 15.6423 15.1495 15.7861 14.8546 16.0736C14.5659 16.3547 14.4215 16.7827 14.4215 17.3577V21.354H13.2234V14.6456H14.3846V15.5273C14.5812 15.2142 14.8485 14.9747 15.1864 14.8086C15.5243 14.6361 15.9144 14.5498 16.3568 14.5498C16.8114 14.5498 17.2077 14.6392 17.5456 14.8181C17.8836 14.997 18.1385 15.2494 18.3106 15.5752C18.5256 15.2494 18.8174 14.997 19.1861 14.8181C19.5608 14.6392 19.9755 14.5498 20.4302 14.5498Z" fill="white"/>
          <path d="M26.509 21.4498C26.0114 21.4498 25.5291 21.3763 25.0622 21.2294C24.6014 21.0824 24.2358 20.8876 23.9655 20.6448L24.3802 19.6769C24.6444 19.8941 24.9669 20.073 25.3478 20.2136C25.7349 20.3477 26.122 20.4148 26.509 20.4148C26.9883 20.4148 27.3446 20.3349 27.5781 20.1752C27.8177 20.0155 27.9375 19.8047 27.9375 19.5427C27.9375 19.3511 27.8699 19.1945 27.7347 19.0731C27.6057 18.9454 27.4398 18.8463 27.2371 18.7761C27.0343 18.7058 26.7579 18.6259 26.4077 18.5365C25.9162 18.4151 25.5168 18.2937 25.2096 18.1723C24.9086 18.0509 24.6474 17.8624 24.4263 17.6069C24.2112 17.3449 24.1037 16.9936 24.1037 16.5527C24.1037 16.1822 24.1989 15.8467 24.3894 15.5465C24.586 15.2398 24.8778 14.997 25.2649 14.8181C25.6581 14.6392 26.1373 14.5498 26.7026 14.5498C27.0958 14.5498 27.4828 14.6009 27.8638 14.7031C28.2447 14.8054 28.5734 14.9523 28.8499 15.144L28.472 16.1119C28.1894 15.9394 27.8945 15.8084 27.5873 15.719C27.2801 15.6295 26.9821 15.5848 26.6934 15.5848C26.2203 15.5848 25.867 15.6679 25.6335 15.834C25.4062 16.0001 25.2926 16.2205 25.2926 16.4952C25.2926 16.6869 25.3571 16.8434 25.4861 16.9648C25.6213 17.0862 25.7902 17.182 25.993 17.2523C26.1957 17.3226 26.4722 17.4024 26.8224 17.4919C27.3016 17.6069 27.6948 17.7283 28.002 17.8561C28.3092 17.9774 28.5703 18.1659 28.7854 18.4215C29.0065 18.677 29.1171 19.022 29.1171 19.4565C29.1171 19.827 29.0188 20.1624 28.8222 20.4627C28.6318 20.763 28.3399 21.0026 27.9467 21.1815C27.5535 21.3604 27.0743 21.4498 26.509 21.4498Z" fill="white"/>
        </svg>
        <div class="grow">
          <div class="text-gray-800 font-semibold">Kod.Mobi</div>
          <div class="text-sm text-gray-600">
            Cost per message: 
            <span class="text-gray-800 font-medium">5 Credit</span>
          </div>
        </div>
        <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white w-[100px]">
          Settings
        </button>
      </div> -->
    </transition-group>
    <ModalBlank id="provider-setting-modal" :modalOpen="addChannelModalOpen" :maxWidth="'460px'" @close-modal="addChannelModalOpen = false">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Add Channel</div>
        <XIcon @click.stop="addChannelModalOpen = false" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div class="space-y-3 px-5 py-4">
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="channelWebsite">Website <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="channelWebsite"
              id="channelWebsite"
              class="form-input w-full"
              :class="{'border-rose-500': error.channelWebsite}"
              type="text"
              placeholder="https://"
              required
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon v-if="channelWebsite != ''" @click.stop="channelWebsite = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
          <div v-if="error.channelWebsite" class="text-sm text-rose-500">Website is required</div>
        </div>
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="channelComment">Comment</label>
          <div class="relative">
            <textarea
              v-model="channelComment"
              id="channelComment"
              class="form-input w-full min-h-[80px]"
              type="text"
              required
            />
          </div>
        </div>
      </div>
      <div class="py-4 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="addChannelModalOpen = false">Cancel</button>
        <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="addChannel()">Send Request</button>
      </div>
    </ModalBlank>
  </div>
</template>

<script>

import ChannelsTable from '@/views/settings/components/table/ChannelsTable.vue'
import ModalBasic from '@/components/Modals/ModalBasic.vue'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import DropdownChannels from '@/components/Dropdown/DropdownChannels.vue'
import { XIcon } from '@heroicons/vue/outline'
import { useCookies } from "vue3-cookies";
import { useToast } from 'vue-toastification'
const { cookies } = useCookies();

const toast = useToast()

export default ({
  data: () => ({
    checkbox: true,
    messageModal: {
      show: false,
      title: 'Send Test Message',
      number: '',
      placeholderInput: 'Phone number',
      placeholderNumber: false,
      error: false
    },
    channelWebsite: '',
    channelComment: '',
    addChannelModalOpen: false,
    error: {
      channelWebsite: false,
    },
  }),
  components: {
    ChannelsTable,
    DropdownChannels,
    ModalBasic,
    ModalBlank,
    XIcon,
  },
  methods: {
    ...mapActions('ChannelsModule', ['GET_CHANNELS', 'TOGGLE_CHANNEL', 'SET_PRIORITY_CHANNEL', 'SORT_CHANNEL']),
    ...mapActions('BillingModule', ['SEND_TEST_MESSAGE']),
    addChannel() {
      this.error.channelWebsite = false;
      if (!this.channelWebsite.length) {
        this.error.channelWebsite = true;
        return;
      }
      this.addChannelModalOpen = false;
      this.channelWebsite = '';
      this.channelComment = '';
      toast.success('The request was successfully sent');
    },
    showMessageModal() {
      this.messageModal.show = true
    },
    async sortUp(i){
      if(this.channels[i - 1]) {
        const channels = JSON.parse(JSON.stringify(this.channels));
        [channels[i - 1], channels[i]] = [channels[i], channels[i - 1]];
        const resortChannels = channels.map((channel, i) => {
          return {
            channel_id: channel.id,
            order: i
          }
        })
        const data = {
          active_project_id: this.active_project.id,
          channels: resortChannels,
        };
        await this.SORT_CHANNEL(data);
        this.GET_CHANNELS(this.active_project.id);
      }
    },
    async sortDown(i){
      if(this.channels[i + 1]) {
        const channels = JSON.parse(JSON.stringify(this.channels));
        [channels[i], channels[i + 1]] = [channels[i + 1], channels[i]];
        const resortChannels = channels.map((channel, i) => {
          return {
            channel_id: channel.id,
            order: i
          }
        })
        const data = {
          active_project_id: this.active_project.id,
          channels: resortChannels,
        };
        await this.SORT_CHANNEL(data);
        this.GET_CHANNELS(this.active_project.id);
      }
    },
    async toogleChannel(channel) {
      console.log(channel)
      const data = {
        channel: channel,
        active_project_id: this.active_project.id
      }
      const res = await this.TOGGLE_CHANNEL(data);
      if(!res.success){ 
        toast.error(res.error.message)
      } else {
        this.GET_CHANNELS(this.active_project.id);
      }
    },
    async setPriority(channel) {
      const data = {
        channel: channel,
        active_project_id: this.active_project.id
      }
      const res = await this.SET_PRIORITY_CHANNEL(data);
      if(!res.success){ 
        toast.error(res.error.message)
      } else {
        toast.success(`${channel.name} set as priority`)
        this.GET_CHANNELS(this.active_project.id);
      }
    },
    closeMessageModal() {
      this.messageModal.show = false
      if(this.activeChannels.length > 1) {
        this.$refs.dropdownChannels.changeChannel(this.activeChannels[0]?.id || 0);
      }
    },
    sendMessage () {
      if(this.messageModal.number.length === 15) {
        const phoneNumber = this.phoneNumberConversion(this.messageModal.number)
        const data = {
          type: this.activeChannels.length > 1 ? this.$refs?.dropdownChannels?.selectedChannelName.toLowerCase() : this.activeChannels[0]?.name.toLowerCase(),
          phone: Number(phoneNumber),
          api_token: this.active_project.api_key
        }
        this.SEND_TEST_MESSAGE(data)
        this.closeMessageModal()
      } else {
        this.messageModal.error = true
      }
    },
    phoneNumberConversion (number) {
      let num = number.split('')
      num.splice(0, 1)
      num.splice(3, 2)
      num.splice(6, 1)
      num.splice(8, 1)
      num.unshift('7')
      const result = num.join('')
      return result
    },
    focusPhoneNumber(str) {
      this.messageModal.error = false
      if(str === 'focus') {
        this.messageModal.placeholderNumber = true
        this.messageModal.placeholderInput = ''
      } else if(str === 'blur' && this.messageModal.number === '') {
        this.messageModal.placeholderNumber = false
        this.messageModal.placeholderInput = 'Phone number'
      }
    },
    clearPhoneNumber() {
      this.messageModal.placeholderNumber = false
      this.messageModal.number = ''
      this.messageModal.placeholderInput = 'Phone number'
    },
    keypressPhoneNumber(e, value) {
      if (!/^\d+$/.test(e.key)) {
        return e.preventDefault();
      } else if(value.length === 0) {
        this.messageModal.number += '('
      } else if(value.length === 4) {
        this.messageModal.number += ') '
      } else if(value.length === 9 ||value.length === 12) {
        this.messageModal.number += ' '
      }
    },
  },
  watch: {
    active_project(val){
      this.GET_CHANNELS(val.id)
    }
  },
  computed: {
    ...mapFields('ChannelsModule', {
      channels: 'channels',
    }),
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
    ...mapFields('ProfileModule', {
      profile: 'profile',
      tariffPlanModalOpen: 'tariffPlanModalOpen'
    }),
    activeChannels() {
      const activeChannels = this.channels.filter(el => {
        return el.attach === true
      })
      return activeChannels || []
    },
  },
  mounted() {
    if(this.channels.length == 0 && this.active_project) {
      this.GET_CHANNELS(this.active_project.id)
    }
  }
})
</script>

<style>
.form-switch input[type=checkbox]:checked + label {
  background-color: #44C157 !important;
}
.flip-list-move {
  transition: transform .7s;
}
</style>