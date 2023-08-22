<template>
<div class="flex flex-col h-full">
    <div v-if="channel" class="mb-6 flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800">{{channel.name}}</h1>
    </div>
    <section class="flex-auto">
      <div v-if="channel" class="bg-white shadow-lg rounded-sm mb-8 p-8">
        <div class="text-sm text-gray-500 mb-4">
          <span class="text-indigo-500 pointer cursor-pointer" @click="goToChannels">Channels</span>&nbsp;&nbsp;/&nbsp;&nbsp;{{channel.name}}
        </div>
        <!-- <div class="text-sm text-gray-600 mb-4">You can change the priority of channels by swapping them. Messages will be sent according to priority.</div> -->
        <div>
          <div v-for="(provider, index) in providers" :key="provider.id" class="flex items-center justify-between border border-gray-200 px-5 py-4" :class="{'border-t-0': index != 0, 'rounded-t-sm': index == 0, 'rounded-b-sm': index == providers.length - 1 && channelId != 3}" >
            <svg v-if="channelId == 1" class="mr-4" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#25D366"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5931 28.0145H18.5887C16.7973 28.0139 15.0372 27.5644 13.4738 26.7117L7.7998 28.2001L9.31827 22.6537C8.3816 21.0305 7.88874 19.1892 7.88954 17.3028C7.89189 11.4014 12.6934 6.6001 18.593 6.6001C21.4563 6.60133 24.1437 7.716 26.1645 9.73916C28.1853 11.7622 29.2975 14.4513 29.2964 17.3112C29.294 23.2113 24.4944 28.0121 18.5931 28.0145ZM13.7367 24.774L14.0616 24.9668C15.4274 25.7774 16.9931 26.2062 18.5895 26.2069H18.5931C23.4964 26.2069 27.4872 22.216 27.4892 17.3106C27.4901 14.9335 26.5657 12.6984 24.8861 11.0168C23.2064 9.33527 20.9728 8.40875 18.5966 8.40792C13.6895 8.40792 9.69864 12.3984 9.69669 17.3034C9.696 18.9844 10.1663 20.6214 11.0569 22.0378L11.2684 22.3744L10.3697 25.6573L13.7367 24.774ZM23.6191 19.6156C23.8056 19.7058 23.9316 19.7667 23.9854 19.8564C24.0522 19.968 24.0522 20.5034 23.8295 21.1282C23.6065 21.7529 22.5381 22.3231 22.0242 22.3998C21.5635 22.4687 20.9804 22.4975 20.3398 22.2939C19.9513 22.1706 19.4532 22.0061 18.8151 21.7305C16.3079 20.6479 14.6136 18.2179 14.2933 17.7586C14.2709 17.7264 14.2552 17.7039 14.2465 17.6923L14.2443 17.6894C14.1028 17.5005 13.1544 16.2352 13.1544 14.9257C13.1544 13.6938 13.7596 13.0481 14.0381 12.7509C14.0572 12.7305 14.0747 12.7118 14.0905 12.6946C14.3356 12.4268 14.6254 12.3599 14.8036 12.3599C14.9819 12.3599 15.1604 12.3616 15.3162 12.3694C15.3354 12.3704 15.3554 12.3702 15.3761 12.3701C15.532 12.3692 15.7263 12.3681 15.9179 12.8285C15.9917 13.0057 16.0996 13.2683 16.2134 13.5454C16.4435 14.1056 16.6978 14.7247 16.7425 14.8143C16.8094 14.9481 16.8539 15.1042 16.7648 15.2828C16.7514 15.3096 16.739 15.3349 16.7272 15.359C16.6603 15.4957 16.611 15.5962 16.4974 15.7289C16.4527 15.7811 16.4065 15.8373 16.3603 15.8936C16.2683 16.0056 16.1763 16.1177 16.0962 16.1975C15.9623 16.3308 15.8229 16.4755 15.9789 16.7433C16.135 17.011 16.6717 17.8868 17.4667 18.596C18.3214 19.3583 19.0642 19.6805 19.4407 19.8438C19.5142 19.8757 19.5738 19.9015 19.6175 19.9234C19.8848 20.0573 20.0408 20.0349 20.1968 19.8564C20.3528 19.678 20.8654 19.0755 21.0436 18.8078C21.2219 18.5401 21.4003 18.5847 21.6454 18.6739C21.8906 18.7633 23.2054 19.4102 23.4729 19.544C23.5251 19.5702 23.5739 19.5938 23.6191 19.6156Z" fill="white"/>
            </svg>
            <svg v-if="channelId == 2" class="mr-4" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.0589 27.9411 0 18 0C8.0589 0 0 8.0589 0 18C0 27.9411 8.0589 36 18 36Z" fill="#37AEE2"/>
              <path d="M6.70323 18.8803C8.80742 17.7212 11.1563 16.7539 13.3509 15.7816C17.1266 14.189 20.9172 12.6241 24.7461 11.1671C25.4911 10.9189 26.8296 10.6761 26.9609 11.7801C26.889 13.3428 26.5934 14.8964 26.3906 16.4499C25.8758 19.8663 25.2809 23.271 24.7008 26.6762C24.5009 27.8104 23.0801 28.3976 22.1709 27.6717C19.986 26.1959 17.7843 24.7344 15.6273 23.2244C14.9207 22.5064 15.5759 21.4754 16.207 20.9627C18.0065 19.1892 19.915 17.6825 21.6205 15.8174C22.0805 14.7064 20.7212 15.6427 20.2729 15.9296C17.8093 17.6273 15.406 19.4286 12.8086 20.9207C11.4818 21.651 9.93549 21.0269 8.60934 20.6193C7.42028 20.127 5.67786 19.631 6.70311 18.8804L6.70323 18.8803Z" fill="white"/>
            </svg>
            <svg v-if="channelId == 3" class="mr-4" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3653_97572)">
                <path d="M18 3.375C9.9225 3.375 3.375 9.9225 3.375 18C3.375 21.0216 4.29139 23.8288 5.86121 26.1595L4.5 32.625L11.5697 31.1364C13.5107 32.0883 15.6921 32.625 18 32.625C26.0775 32.625 32.625 26.0775 32.625 18C32.625 9.9225 26.0775 3.375 18 3.375ZM11.25 16.3125C12.1838 16.3125 12.9375 17.0662 12.9375 18C12.9375 18.9338 12.1838 19.6875 11.25 19.6875C10.3162 19.6875 9.5625 18.9338 9.5625 18C9.5625 17.0662 10.3162 16.3125 11.25 16.3125ZM18 16.3125C18.9338 16.3125 19.6875 17.0662 19.6875 18C19.6875 18.9338 18.9338 19.6875 18 19.6875C17.0662 19.6875 16.3125 18.9338 16.3125 18C16.3125 17.0662 17.0662 16.3125 18 16.3125ZM24.75 16.3125C25.6838 16.3125 26.4375 17.0662 26.4375 18C26.4375 18.9338 25.6838 19.6875 24.75 19.6875C23.8162 19.6875 23.0625 18.9338 23.0625 18C23.0625 17.0662 23.8162 16.3125 24.75 16.3125Z" fill="#6366F1"/>
              </g>
              <defs>
                <clipPath id="clip0_3653_97572">
                  <rect width="36" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <div class="grow">
              <div class="flex items-center">
                <div class="text-gray-800 font-semibold">{{provider.name}}</div>
                <div v-if="provider.is_priority" class="h-[24px] w-[62px] bg-indigo-100 text-indigo-500 flex items-center justify-center ml-4 rounded-full text-xs">Priority</div>
              </div>
              <div class="mt-0.5 text-gray-600 text-sm"><span class="text-gray-800 font-medium">{{provider.amount}}</span> Credit per message</div>
            </div>
            <button v-if="!provider.is_priority && provider.is_active" class="btn h-[38px] shadow-none text-gray-600 hover:text-gray-800 text-sm" @click="setPriorityProvider(provider.id)">
              Set as priority
            </button>
            <button v-if="provider.is_system" class="btn h-[38px] border-gray-200 text-gray-300 cursor-not-allowed text-sm mx-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                <path d="M5.66515 8C5.66515 6.73672 6.68915 5.75 8.00016 5.75C9.28929 5.75 10.3352 6.73672 10.3352 8C10.3352 9.24219 9.28929 10.25 8.00016 10.25C6.68915 10.25 5.66515 9.24219 5.66515 8ZM8.00016 6.875C7.3556 6.875 6.83266 7.37891 6.83266 8C6.83266 8.62109 7.3556 9.125 8.00016 9.125C8.64473 9.125 9.16767 8.62109 9.16767 8C9.16767 7.37891 8.64473 6.875 8.00016 6.875ZM8.90255 2.00001C9.44252 2.00001 9.91196 2.35602 10.0384 2.86109L10.2282 3.62211C10.4349 3.71937 10.6319 3.82977 10.8192 3.95187L11.6 3.73039C12.1181 3.58344 12.6726 3.79695 12.9426 4.24695L13.845 5.75234C14.1126 6.20234 14.0274 6.77187 13.6383 7.13047L13.0472 7.65078C13.0545 7.77969 13.0594 7.88984 13.0594 8C13.0594 8.11016 13.0545 8.22031 13.0472 8.32812L13.6383 8.86953C14.0274 9.22813 14.1126 9.79766 13.845 10.2477L12.9426 11.7523C12.6726 12.2023 12.1181 12.4156 11.6 12.2703L10.8192 12.0477C10.6319 12.1695 10.4349 12.2797 10.2282 12.3781L10.0384 13.1398C9.91196 13.6437 9.44252 14 8.90255 14H7.09778C6.5578 14 6.08837 13.6437 5.96189 13.1398L5.77217 12.3781C5.56542 12.2797 5.3684 12.1695 5.18112 12.0477L4.37845 12.2703C3.88299 12.4156 3.32867 12.2023 3.05893 11.7523L2.15654 10.2477C1.88679 9.79766 1.97212 9.22813 2.3628 8.86953L2.95239 8.32812C2.94485 8.22031 2.94096 8.11016 2.94096 7.97891C2.94096 7.88984 2.94485 7.77969 2.95239 7.65078L2.3628 7.13047C1.9721 6.77187 1.88679 6.20234 2.15654 5.75234L3.05893 4.24695C3.32867 3.79695 3.88299 3.58344 4.37845 3.73039L5.18112 3.95187C5.3684 3.82977 5.56542 3.71937 5.77217 3.62211L5.96189 2.86109C6.08837 2.35578 6.5578 2 7.09778 2L8.90255 2.00001ZM6.77185 4.42812L6.49943 4.53828C6.19053 4.6625 5.90351 4.82422 5.64326 5.01641L5.40732 5.18984L4.07004 4.81016L3.16741 6.31484L4.17681 7.24063L4.1396 7.52188C4.11917 7.67891 4.10847 7.83828 4.10847 8C4.10847 8.16172 4.11917 8.32109 4.1396 8.47812L4.17681 8.75937L3.16765 9.68516L4.07004 11.1898L5.40732 10.8102L5.64326 10.9836C5.90351 11.1758 6.19053 11.3375 6.49943 11.4617L6.77185 11.5719L7.09778 12.875H8.90255L9.22848 11.5719L9.5009 11.4617C9.8098 11.3375 10.0968 11.1758 10.3571 10.9836L10.593 10.8102L11.9308 11.1898L12.8332 9.68516L11.8238 8.75937L11.8602 8.47812C11.8821 8.32109 11.8919 8.16172 11.8919 8C11.8919 7.83828 11.8821 7.67891 11.8602 7.52188L11.8238 7.24063L12.8332 6.31484L11.9308 4.81016L10.593 5.18984L10.3571 5.01641C10.0968 4.82422 9.8098 4.6625 9.5009 4.53828L9.22848 4.42812L8.90255 3.125H7.09778L6.77185 4.42812Z" fill="#CFD4DA"/>
              </svg>
              Settings
            </button>
            <template v-else>
              <button v-if="channelId == 1" class="btn min-w-[110px] h-[38px] border-gray-200 hover:border-gray-300 text-indigo-500 text-sm mx-4" @click.stop="whatsappSettingModal.open = true, whatsappSettingModal.provider = JSON.parse(JSON.stringify(provider))">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                  <path d="M5.66515 8C5.66515 6.73672 6.68915 5.75 8.00016 5.75C9.28929 5.75 10.3352 6.73672 10.3352 8C10.3352 9.24219 9.28929 10.25 8.00016 10.25C6.68915 10.25 5.66515 9.24219 5.66515 8ZM8.00016 6.875C7.3556 6.875 6.83266 7.37891 6.83266 8C6.83266 8.62109 7.3556 9.125 8.00016 9.125C8.64473 9.125 9.16767 8.62109 9.16767 8C9.16767 7.37891 8.64473 6.875 8.00016 6.875ZM8.90255 2.00001C9.44252 2.00001 9.91196 2.35602 10.0384 2.86109L10.2282 3.62211C10.4349 3.71937 10.6319 3.82977 10.8192 3.95187L11.6 3.73039C12.1181 3.58344 12.6726 3.79695 12.9426 4.24695L13.845 5.75234C14.1126 6.20234 14.0274 6.77187 13.6383 7.13047L13.0472 7.65078C13.0545 7.77969 13.0594 7.88984 13.0594 8C13.0594 8.11016 13.0545 8.22031 13.0472 8.32812L13.6383 8.86953C14.0274 9.22813 14.1126 9.79766 13.845 10.2477L12.9426 11.7523C12.6726 12.2023 12.1181 12.4156 11.6 12.2703L10.8192 12.0477C10.6319 12.1695 10.4349 12.2797 10.2282 12.3781L10.0384 13.1398C9.91196 13.6437 9.44252 14 8.90255 14H7.09778C6.5578 14 6.08837 13.6437 5.96189 13.1398L5.77217 12.3781C5.56542 12.2797 5.3684 12.1695 5.18112 12.0477L4.37845 12.2703C3.88299 12.4156 3.32867 12.2023 3.05893 11.7523L2.15654 10.2477C1.88679 9.79766 1.97212 9.22813 2.3628 8.86953L2.95239 8.32812C2.94485 8.22031 2.94096 8.11016 2.94096 7.97891C2.94096 7.88984 2.94485 7.77969 2.95239 7.65078L2.3628 7.13047C1.9721 6.77187 1.88679 6.20234 2.15654 5.75234L3.05893 4.24695C3.32867 3.79695 3.88299 3.58344 4.37845 3.73039L5.18112 3.95187C5.3684 3.82977 5.56542 3.71937 5.77217 3.62211L5.96189 2.86109C6.08837 2.35578 6.5578 2 7.09778 2L8.90255 2.00001ZM6.77185 4.42812L6.49943 4.53828C6.19053 4.6625 5.90351 4.82422 5.64326 5.01641L5.40732 5.18984L4.07004 4.81016L3.16741 6.31484L4.17681 7.24063L4.1396 7.52188C4.11917 7.67891 4.10847 7.83828 4.10847 8C4.10847 8.16172 4.11917 8.32109 4.1396 8.47812L4.17681 8.75937L3.16765 9.68516L4.07004 11.1898L5.40732 10.8102L5.64326 10.9836C5.90351 11.1758 6.19053 11.3375 6.49943 11.4617L6.77185 11.5719L7.09778 12.875H8.90255L9.22848 11.5719L9.5009 11.4617C9.8098 11.3375 10.0968 11.1758 10.3571 10.9836L10.593 10.8102L11.9308 11.1898L12.8332 9.68516L11.8238 8.75937L11.8602 8.47812C11.8821 8.32109 11.8919 8.16172 11.8919 8C11.8919 7.83828 11.8821 7.67891 11.8602 7.52188L11.8238 7.24063L12.8332 6.31484L11.9308 4.81016L10.593 5.18984L10.3571 5.01641C10.0968 4.82422 9.8098 4.6625 9.5009 4.53828L9.22848 4.42812L8.90255 3.125H7.09778L6.77185 4.42812Z" fill="#6366F1"/>
                </svg>
                Settings
              </button>
              <button v-else class="btn min-w-[110px] h-[38px] border-gray-200 hover:border-gray-300 text-indigo-500 text-sm mx-4" @click.stop="openSettings(provider)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                  <path d="M5.66515 8C5.66515 6.73672 6.68915 5.75 8.00016 5.75C9.28929 5.75 10.3352 6.73672 10.3352 8C10.3352 9.24219 9.28929 10.25 8.00016 10.25C6.68915 10.25 5.66515 9.24219 5.66515 8ZM8.00016 6.875C7.3556 6.875 6.83266 7.37891 6.83266 8C6.83266 8.62109 7.3556 9.125 8.00016 9.125C8.64473 9.125 9.16767 8.62109 9.16767 8C9.16767 7.37891 8.64473 6.875 8.00016 6.875ZM8.90255 2.00001C9.44252 2.00001 9.91196 2.35602 10.0384 2.86109L10.2282 3.62211C10.4349 3.71937 10.6319 3.82977 10.8192 3.95187L11.6 3.73039C12.1181 3.58344 12.6726 3.79695 12.9426 4.24695L13.845 5.75234C14.1126 6.20234 14.0274 6.77187 13.6383 7.13047L13.0472 7.65078C13.0545 7.77969 13.0594 7.88984 13.0594 8C13.0594 8.11016 13.0545 8.22031 13.0472 8.32812L13.6383 8.86953C14.0274 9.22813 14.1126 9.79766 13.845 10.2477L12.9426 11.7523C12.6726 12.2023 12.1181 12.4156 11.6 12.2703L10.8192 12.0477C10.6319 12.1695 10.4349 12.2797 10.2282 12.3781L10.0384 13.1398C9.91196 13.6437 9.44252 14 8.90255 14H7.09778C6.5578 14 6.08837 13.6437 5.96189 13.1398L5.77217 12.3781C5.56542 12.2797 5.3684 12.1695 5.18112 12.0477L4.37845 12.2703C3.88299 12.4156 3.32867 12.2023 3.05893 11.7523L2.15654 10.2477C1.88679 9.79766 1.97212 9.22813 2.3628 8.86953L2.95239 8.32812C2.94485 8.22031 2.94096 8.11016 2.94096 7.97891C2.94096 7.88984 2.94485 7.77969 2.95239 7.65078L2.3628 7.13047C1.9721 6.77187 1.88679 6.20234 2.15654 5.75234L3.05893 4.24695C3.32867 3.79695 3.88299 3.58344 4.37845 3.73039L5.18112 3.95187C5.3684 3.82977 5.56542 3.71937 5.77217 3.62211L5.96189 2.86109C6.08837 2.35578 6.5578 2 7.09778 2L8.90255 2.00001ZM6.77185 4.42812L6.49943 4.53828C6.19053 4.6625 5.90351 4.82422 5.64326 5.01641L5.40732 5.18984L4.07004 4.81016L3.16741 6.31484L4.17681 7.24063L4.1396 7.52188C4.11917 7.67891 4.10847 7.83828 4.10847 8C4.10847 8.16172 4.11917 8.32109 4.1396 8.47812L4.17681 8.75937L3.16765 9.68516L4.07004 11.1898L5.40732 10.8102L5.64326 10.9836C5.90351 11.1758 6.19053 11.3375 6.49943 11.4617L6.77185 11.5719L7.09778 12.875H8.90255L9.22848 11.5719L9.5009 11.4617C9.8098 11.3375 10.0968 11.1758 10.3571 10.9836L10.593 10.8102L11.9308 11.1898L12.8332 9.68516L11.8238 8.75937L11.8602 8.47812C11.8821 8.32109 11.8919 8.16172 11.8919 8C11.8919 7.83828 11.8821 7.67891 11.8602 7.52188L11.8238 7.24063L12.8332 6.31484L11.9308 4.81016L10.593 5.18984L10.3571 5.01641C10.0968 4.82422 9.8098 4.6625 9.5009 4.53828L9.22848 4.42812L8.90255 3.125H7.09778L6.77185 4.42812Z" fill="#6366F1"/>
                </svg>
                Settings
              </button>
            </template>
            <div class="form-switch">
              <input v-model="provider.is_active" @click="toogleProvider(provider)" type="checkbox" :id="`provider${provider.id}`" class="sr-only" />
              <label class="bg-gray-400" :for="`provider${provider.id}`">
                <span class="bg-white shadow-sm" aria-hidden="true"></span>
                <span class="sr-only">Toggle</span>
              </label>
            </div>
          </div>
          <div v-if="channelId == 3" class="flex items-center justify-between border border-gray-200 px-5 py-4 border-t-0 rounded-b-sm">
            <div>
              <div class="text-gray-800 font-semibold mb-0.5">Other gate</div>
              <div class="text-gray-700">If the desired gate is not in the list, send a request for connection</div>
            </div>
            <!-- <button class="btn min-w-[164px] h-[38px] border-gray-200 hover:border-gray-300 text-indigo-500 text-sm ml-4" @click="profile.tariff_plan.name == 'free' ? tariffPlanModalOpen = true : addProvider()">
              Send Request
            </button> -->
            <button class="btn min-w-[164px] h-[38px] border-gray-200 hover:border-gray-300 text-indigo-500 text-sm ml-4" @click="addProvider()">
              Send Request
            </button>
          </div>
        </div>
        <!-- <button v-if="profile.tariff_plan.name != 'free'" class="btn mt-4 border-gray-200 hover:border-gray-300 text-indigo-500 shadow" @click.stop="profile.tariff_plan.name == 'free' ? tariffPlanModalOpen = true : addNewProviderModalOpen = true">
          <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.125 7.125H8.875V1.875C8.875 1.35 8.525 1 8 1C7.475 1 7.125 1.35 7.125 1.875V7.125H1.875C1.35 7.125 1 7.475 1 8C1 8.525 1.35 8.875 1.875 8.875H7.125V14.125C7.125 14.65 7.475 15 8 15C8.525 15 8.875 14.65 8.875 14.125V8.875H14.125C14.65 8.875 15 8.525 15 8C15 7.475 14.65 7.125 14.125 7.125Z" fill="#6366F1"/>
          </svg>
          Add Provider
        </button> -->
        <button class="btn mt-4 min-w-[150px] border-gray-200 text-gray-300 shadow cursor-not-allowed">
          <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-gray-300" d="M14.125 7.125H8.875V1.875C8.875 1.35 8.525 1 8 1C7.475 1 7.125 1.35 7.125 1.875V7.125H1.875C1.35 7.125 1 7.475 1 8C1 8.525 1.35 8.875 1.875 8.875H7.125V14.125C7.125 14.65 7.475 15 8 15C8.525 15 8.875 14.65 8.875 14.125V8.875H14.125C14.65 8.875 15 8.525 15 8C15 7.475 14.65 7.125 14.125 7.125Z"/>
          </svg>
          Add Provider
        </button>
      </div>
    </section>
    <ModalBlank id="provider-setting-modal" :modalOpen="providerSettingModalOpen" :maxWidth="'450px'" @close-modal="providerSettingModalOpen = false">
      <div v-if="activeProvider" class="p-6">
        <div class="text-gray-800 text-2xl font-bold mb-1">{{activeProvider.name}}</div>
        <div class="text-gray-600 text-sm mb-4">{{activeProvider.url}}</div>
        <div class="text-gray-600 mb-8">
          <span class="text-gray-800 font-medium">{{channel.amount}}</span> / message
        </div>
        <div class="sm:flex space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
          <div class="sm:w-1/2">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="providerLogin">Login <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="activeProvider.setting.login"
                id="providerLogin"
                class="form-input w-full"
                :class="{'border-rose-500': error.login}"
                type="text"
                autoComplete="new-login"
                placeholder="Login"
                required
              />
              <div v-if="activeProvider.setting.login != ''" class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click.stop="activeProvider.setting.login = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.login" class="text-sm text-rose-500">Login is required</div>
          </div>
          <div class="sm:w-1/2">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="providerPassword">Password <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="activeProvider.setting.password"
                id="providerPassword"
                class="form-input w-full"
                :class="{'border-rose-500': error.password}"
                :type="typePass"
                autoComplete="new-password"
                placeholder="Password"
                required
              />
              <EyeChangeIcon
                v-if="activeProvider.setting.password != ''"
                class="text-gray-400 hover:text-gray-600"
              />
            </div>
            <div v-if="error.password" class="text-sm text-rose-500">Password is required</div>
          </div>
        </div>
        <div class="sm:flex space-y-4 sm:space-y-0 sm:space-x-6 mt-5">
          <div class="sm:w-[100%]">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="sender">Sender's name <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="activeProvider.setting.sender"
                id="sender"
                class="form-input w-full"
                :class="{'border-rose-500': error.sender}"
                type="text"
                placeholder="Name"
                required
              />
              <div v-if="activeProvider.setting.sender != ''" class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click.stop="activeProvider.setting.sender = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.sender" class="text-sm text-rose-500">Sender's name is required</div>
          </div>
          <!-- <div class="sm:w-1/2">
            <label class="block text-sm font-medium mb-1 text-gray-600" for="url">Url <span class="text-rose-500">*</span></label>
            <div class="relative">
              <input
                v-model="activeProvider.setting.url"
                id="url"
                class="form-input w-full"
                :class="{'border-rose-500': error.url || error.urlValidation}"
                type="text"
                placeholder="https://"
                required
              />
              <div v-if="activeProvider.setting.url != ''" class="absolute transform-translate-y top-1/2 right-2 transition-all">
                <XIcon @click.stop="activeProvider.setting.url = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
              </div>
            </div>
            <div v-if="error.url" class="text-sm text-rose-500">Url is required</div>
            <div v-if="error.urlValidation" class="text-sm text-rose-500">Invalid url</div>
          </div> -->
        </div>
      </div>
      <div class="pt-5 pb-6 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="providerSettingModalOpen = false">Cancel</button>
        <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click.stop="saveSetting()">Save</button>
      </div>
    </ModalBlank>
    <ModalBlank id="provider-setting-modal" :modalOpen="addProviderModalOpen" :maxWidth="'460px'" @close-modal="addProviderModalOpen = false">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Add Provider</div>
        <XIcon @click.stop="addProviderModalOpen = false" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div class="space-y-3 px-5 py-4">
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="providerName">Provider Name <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="providerName"
              id="providerName"
              class="form-input w-full"
              :class="{'border-rose-500': error.providerName}"
              type="text"
              placeholder="Name"
              required
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon v-if="providerName != ''" @click.stop="providerName = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
          <div v-if="error.providerName" class="text-sm text-rose-500">Provider name is required</div>
        </div>
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="providerWebsite">Website <span class="text-rose-500">*</span></label>
          <div class="relative">
            <input
              v-model="providerWebsite"
              id="providerWebsite"
              class="form-input w-full"
              :class="{'border-rose-500': error.providerWebsite || error.providerWebsiteValidation}"
              type="text"
              placeholder="https://"
              required
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon v-if="providerWebsite != ''" @click.stop="providerWebsite = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
          <div v-if="error.providerWebsite" class="text-sm text-rose-500">Website is required</div>
          <div v-if="error.providerWebsiteValidation" class="text-sm text-rose-500">Invalid website</div>
        </div>
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="providerComment">Comment</label>
          <div class="relative">
            <textarea
              v-model="providerComment"
              id="providerComment"
              class="form-input w-full min-h-[80px]"
              type="text"
              required
            />
          </div>
        </div>
      </div>
      <div class="py-4 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="addProviderModalOpen = false">Cancel</button>
        <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="sendRequest()">Send Request</button>
      </div>
    </ModalBlank>
    <ModalBlank id="provider-setting-modal" :modalOpen="addNewProviderModalOpen" :maxWidth="'450px'" @close-modal="addNewProviderModalOpen = false">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Add Provider</div>
        <XIcon @click.stop="addNewProviderModalOpen = false" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div class="space-y-3 px-5 py-4">
        <div class="">
          <label class="block text-sm font-medium mb-1 text-gray-600" for="providerName">Name <span class="text-rose-500">*</span></label>
          <div class="relative mb-2">
            <input
              v-model="newProvider.name"
              id="providerName"
              class="form-input w-full"
              type="text"
              placeholder="Name"
              required
            />
            <div class="absolute transform-translate-y top-1/2 right-2 transition-all">
              <XIcon v-if="newProvider.name != ''" @click.stop="newProvider.name = ''" class="h-5 w-5 text-gray-400 hover:text-gray-600"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="whatsappStep == 1" class="py-4 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="addNewProviderModalOpen = false">Cancel</button>
        <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="addNewProvider()">Next</button>
      </div>
    </ModalBlank>
    <ModalBlank id="provider-setting-modal" :modalOpen="providerSettingsOpen" :maxWidth="'450px'" @close-modal="providerSettingsOpen = false">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Provider settings</div>
        <XIcon @click.stop="providerSettingsOpen = false" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div class="space-y-3 px-5 py-4">
        <div class="" v-for="(setting, index) in providerSettings.settings" :key="index" >
          <label class="block text-sm font-medium mb-1 text-gray-600 capitalize" for="providerName">{{ setting.key.replace('_', ' ') }} <span class="text-rose-500">*</span></label>
          <div class="relative mb-2">
            <input
              v-model="setting.value"
              :id="setting.key"
              class="form-input w-full"
              type="text"
              :placeholder="setting.key.replace('_', ' ')"
              required
            />
          </div>
        </div>
      </div>
      <div class="py-4 px-5 flex items-center justify-between border-t border-gray-200">
        <button class="btn min-w-[80px] bg-rose-500 hover:bg-rose-600 text-white" @click="deleteProvider()">Delete</button>
        <div class="flex items-center">
          <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="providerSettingsOpen = false">Cancel</button>
          <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="saveProviderSettings()">Save</button>
        </div>
      </div>
    </ModalBlank>
    <ModalBlank id="provider-setting-modal" :modalOpen="whatsappQrModalOpen" :maxWidth="'625px'" @close-modal="closeWhatsappQrModal()">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Add Provider</div>
        <XIcon @click.stop="closeWhatsappQrModal()" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div v-if="whatsappQrModalData.step == 1" class="px-5 py-4">
        <div class="mb-4 text-xl font-semibold">To send and receive messages, you have to authorize the instance.</div>
        <div class="flex">
          <div class="grow mr-3">
            <div class="mb-1.5 text-gray-800 text-sm">Instanse name:&nbsp;&nbsp;<span class="text-gray-600">{{ whatsappQrModalData.name }}</span></div>
            <div class="mb-4 text-gray-800 text-sm">Phone number:&nbsp;&nbsp;<span class="text-gray-600">{{ whatsappQrModalData.phone }}</span></div>
            <ul class="text-sm mb-4">
              <li>1. Open <span class="font-medium">WhatsApp</span> on your phone</li>
              <li>2. Tap <span class="font-medium">Menu</span> or <span class="font-medium">Settings</span> and select <span class="font-medium">Linked Devices</span></li>
              <li>3. Point your phone to this screen to capture the code</li>
            </ul>
            <div class="text-sm">A QR code is valid only for 45 seconds. Message sending will be available right after authorization.</div>
          </div>
          <div v-if="whatsappQrModalData.expired" class="flex items-center justify-center w-[203px] h-[203px] min-w-[203px]">
            <div class="flex items-center cursor-pointer" @click="getQr(whatsappQrModalData.activeProviderId)">
              <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4999 1.98882V6.35765C14.4999 6.72081 14.2078 7.01298 13.8447 7.01298H9.47693C9.11659 7.01298 8.82176 6.72081 8.82176 6.35765C8.82176 5.99449 9.11522 5.70233 9.47693 5.70233H12.2205C11.4097 4.12682 9.76357 3.08103 7.94819 3.08103C5.27564 3.08103 3.1436 5.21357 3.1436 7.88675C3.1436 10.5599 5.29939 12.6925 7.94819 12.6925C9.0699 12.6925 10.1619 12.2974 11.022 11.5798C11.2994 11.3477 11.713 11.3844 11.945 11.6634C12.1771 11.9416 12.1395 12.3545 11.8614 12.5866C10.7651 13.4997 9.37259 14.0002 7.94405 14.0002C4.57406 14.0004 1.83325 11.2589 1.83325 7.88675C1.83325 4.51455 4.57406 1.77311 7.94546 1.77311C10.1253 1.77311 12.1058 2.95979 13.1896 4.75211V1.98882C13.1896 1.62703 13.483 1.3335 13.8447 1.3335C14.2065 1.3335 14.4999 1.62703 14.4999 1.98882Z" fill="#6366F1"/>
              </svg>
              <span class="text-sm text-indigo-500">Update QR-code</span>
            </div>
          </div>
          <template v-else>
            <div v-if="whatsappQrModalData.qrLoading" class="flex items-center justify-center w-[203px] h-[203px] min-w-[203px]" role="status">
              <svg aria-hidden="true" class="mr-2 w-[70px] h-[70px] text-white animate-spin dark:text-white fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else class="min-w-[203px]">
              <img v-if="whatsappQrModalData.qrCode" :src="whatsappQrModalData.qrCode" class="w-[203px] h-[203px]" alt="">
            </div>
          </template>

        </div>
      </div>
      <div v-if="whatsappQrModalData.step == 2" class="px-5 py-4">
        <div class="flex justify-center mt-10" role="status">
          <svg aria-hidden="true" class="mr-2 w-[70px] h-[70px] text-white animate-spin dark:text-white fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <div class="text-center text-gray-700 text-xl font-semibold mt-8 mb-12">Waiting for the WhatsApp finish loading</div>
      </div>
      <div v-if="whatsappQrModalData.step == 3" class="px-5 py-12">
        <div class="text-center text-gray-700 text-xl font-semibold mb-4">
          Instance WhatsApp #12345 is not authorized<br />
          and sent on standby
        </div>
        <div class="flex justify-center">
          <button class="btn min-w-[130px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Authorize again</button>
        </div>
      </div>
      <div v-if="whatsappQrModalData.step == 4" class="px-5 py-12">
        <div class="flex justify-center mb-8">
          <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="70" height="70" rx="35" fill="#D8FFDE"/>
            <path d="M16.3335 35.4997C16.3335 24.9131 24.9136 16.333 35.5002 16.333C46.0867 16.333 54.6668 24.9131 54.6668 35.4997C54.6668 46.0863 46.0867 54.6663 35.5002 54.6663C24.9136 54.6663 16.3335 46.0863 16.3335 35.4997ZM44.1701 32.1904C44.9862 31.3743 44.9862 30.0417 44.1701 29.2256C43.354 28.4095 42.0213 28.4095 41.2052 29.2256L33.1043 37.3265L29.7951 34.0173C28.979 33.2012 27.6463 33.2012 26.8302 34.0173C26.0142 34.8333 26.0142 36.166 26.8302 36.9821L31.6219 41.7738C32.438 42.5898 33.7707 42.5898 34.5868 41.7738L44.1701 32.1904Z" fill="#44C157"/>
          </svg>
        </div>
        <div class="text-center text-gray-700 text-xl font-semibold">Provider was connected</div>
        <div class="flex justify-center mt-[30px]">
          <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="closeWhatsappQrModal()">Next</button>
        </div>
      </div>
      <div v-if="whatsappQrModalData.step == 1" class="py-4 px-5 flex items-center justify-end border-t border-gray-200">
        <button class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600" @click.stop="closeWhatsappQrModal()">Cancel</button>
        <button class="btn min-w-[80px] bg-indigo-500 hover:bg-indigo-600 text-white ml-3" @click="checkProviderStatus(whatsappQrModalData.activeProviderId)">Check status</button>
      </div>
    </ModalBlank>
    <ModalBlank id="whatsapp-setting-modal" :modalOpen="whatsappSettingModal.open" :maxWidth="'413px'" @close-modal="closeWhatsappSettingModal()">
      <div class="py-3 px-5 flex items-center justify-between border-b border-gray-200">
        <div class="font-semibold text-gray-800">Provider</div>
        <XIcon @click.stop="closeWhatsappSettingModal()" class="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"/>
      </div>
      <div v-if="whatsappSettingModal.provider" class="px-5 py-4">
        <div class="mb-4 text-gray-600 text-xs">Your linked apps will be disabled if you don't use your phone for more than 14 days</div>
        <div class="text-sm flex items-center mb-4">
          <div class="font-medium text-gray-800 min-w-[103px] mr-4">Instanse name:</div>
          <div v-if="whatsappSettingModal.editName" class="relative grow">
            <input
              v-model="whatsappSettingModal.provider.name"
              class="form-input w-full h-[30px] pr-7"
              type="text"
              placeholder="Name"
              required
            />
            <CheckIcon class="absolute right-[6px] top-[5px] h-5 w-5 cursor-pointer text-indigo-400 hover:text-indigo-600" @click="saveProviderName()" />
          </div>
          <div v-else class="text-gray-600 flex items-center">
            {{ whatsappSettingModal.provider.name }}
            <svg class="ml-1.5 cursor-pointer" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" @click="whatsappSettingModal.editName = true">
              <path d="M2 10.0002H4L9.25 4.75015C9.51522 4.48493 9.66421 4.12522 9.66421 3.75015C9.66421 3.37508 9.51522 3.01537 9.25 2.75015C8.98478 2.48493 8.62507 2.33594 8.25 2.33594C7.87493 2.33594 7.51522 2.48493 7.25 2.75015L2 8.00015V10.0002Z" stroke="#616975" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.75 3.25L8.75 5.25" stroke="#616975" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="text-sm flex items-center mb-4">
          <div class="font-medium text-gray-800 min-w-[103px] mr-4">Status:</div>
          <div v-if="whatsappSettingModal.provider.is_active" class="text-green-500">Connected</div>
          <div v-else class="text-rose-500">Disconnected</div>
        </div>
        <div class="flex space-x-2">
          <button class="btn w-1/2 border-gray-200 hover:border-gray-300 text-rose-500" @click.stop="logoutProvider()">
            <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5473 9.49906C13.8431 9.49906 14.083 9.75106 14.083 10.0617V11.7495C14.083 12.9924 13.1236 14 11.9402 14H6.22587C5.04238 14 4.08301 12.9924 4.08301 11.7495V10.0617C4.08301 9.74989 4.32274 9.49906 4.61872 9.49906C4.91448 9.49906 5.15444 9.75106 5.15444 10.0617V11.7495C5.15444 12.3684 5.63658 12.8748 6.22587 12.8748H11.9402C12.5294 12.8748 13.0116 12.3684 13.0116 11.7495V10.0617C13.0116 9.74989 13.2504 9.49906 13.5473 9.49906ZM8.71694 2.15078L5.68122 5.13031C5.46426 5.36382 5.45444 5.72014 5.65734 5.94519C5.85961 6.17155 6.19863 6.18243 6.41426 5.96936L8.54729 3.86257V9.68566C8.54729 9.99838 8.78837 10.2492 9.08301 10.2492C9.37765 10.2492 9.61872 9.99721 9.61872 9.7077V3.86257L11.7518 5.97051C11.9673 6.18369 12.3062 6.1727 12.5087 5.94634C12.6053 5.83736 12.6544 5.69905 12.6544 5.56074C12.6544 5.41129 12.5979 5.26184 12.4856 5.1512L9.44993 2.17167C9.24372 1.94639 8.92229 1.94639 8.71694 2.15078Z" fill="#DC3545"/>
            </svg>
            Log Out
          </button>
          <button class="btn w-1/2 border-gray-200 hover:border-gray-300 text-indigo-500" @click.stop="restartProvider()">
            <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2497 1.98882V6.35765C14.2497 6.72081 13.9576 7.01298 13.5945 7.01298H9.22669C8.86634 7.01298 8.57151 6.72081 8.57151 6.35765C8.57151 5.99449 8.86498 5.70233 9.22669 5.70233H11.9702C11.1594 4.12682 9.51332 3.08103 7.69795 3.08103C5.02539 3.08103 2.89335 5.21357 2.89335 7.88675C2.89335 10.5599 5.04914 12.6925 7.69795 12.6925C8.81966 12.6925 9.91161 12.2974 10.7718 11.5798C11.0492 11.3477 11.4627 11.3844 11.6948 11.6634C11.9268 11.9416 11.8893 12.3545 11.6112 12.5866C10.5149 13.4997 9.12235 14.0002 7.6938 14.0002C4.32381 14.0004 1.58301 11.2589 1.58301 7.88675C1.58301 4.51455 4.32381 1.77311 7.69522 1.77311C9.87503 1.77311 11.8556 2.95979 12.9393 4.75211V1.98882C12.9393 1.62703 13.2328 1.3335 13.5945 1.3335C13.9562 1.3335 14.2497 1.62703 14.2497 1.98882Z" fill="#6366F1"/>
            </svg>
            Restart
          </button>
        </div>
      </div>
      <div v-if="whatsappSettingModal.provider" class="py-4 px-5 flex items-center justify-between border-t border-gray-200">
        <div class="flex items-center">
          <div class="form-switch">
            <input
              v-model="whatsappSettingModal.provider.is_active"
              :id="`whatsappProvider${whatsappSettingModal.provider.id}`"
              type="checkbox"
              class="sr-only"
              @click="toogleProvider(whatsappSettingModal.provider)"
            />
            <label class="bg-gray-400" :for="`whatsappProvider${whatsappSettingModal.provider.id}`">
              <span class="bg-white shadow-sm" aria-hidden="true"></span>
              <span class="sr-only">Toggle</span>
            </label>
          </div>
          <div class="text-sm text-gray-400 italic ml-2">Activity</div>
        </div>
        <button
          v-if="!whatsappSettingModal.provider.is_priority"
          class="btn min-w-[80px] border-gray-200 hover:border-gray-300 text-gray-600"
          @click.stop="setPriorityProvider(whatsappSettingModal.provider.id), whatsappSettingModal.provider.is_priority = true"
        >
          Set as priority
        </button>
        <button v-else class="btn min-w-[80px] cursor-not-allowed border-gray-200 text-gray-300">Priority</button>
      </div>
    </ModalBlank>
</div>
</template>

<script>
import QRCode from 'qrcode'
import ModalBlank from '@/components/Modals/ModalBlank.vue'
import SettingSidebar from "@/views/settings/sidebar.vue"
import Channels from '@/views/settings/components/channels.vue'
import EyeChangeIcon from '@/components/Icon/EyeChangeIcon.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';
import { XIcon, CheckIcon } from '@heroicons/vue/outline'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {
  name: 'SettingChannels',
  components: {
    ModalBlank,
    SettingSidebar,
    Channels,
    XIcon,
    CheckIcon,
    EyeChangeIcon
  },
  data: () => ({
    providers: [],
    avilableProviders: [],
    newProvider: {
      name: '',
      phone: '',
      link: '',
    },
    whatsappSettingModal: {
      open: false,
      provider: null,
      editName: false,
    },
    whatsappSettingModalOpen: false,
    whatsappSettingModalProvider: null,
    whatsappQrModalOpen: false,
    whatsappQrModalData: {
      step: 1,
      activeProviderId: null,
      qrLoading: false,
      qrCode: null,
      name: null,
      phone: null,
      timeout: null,
      expired: false,
    },
    providerSettingsOpen: false,
    providerSettings: {
      activeProvider: null,
      settings: [],
    },
    channelId: null,
    providerSettingModalOpen: false,
    addProviderModalOpen: false,
    addProviderWhatsappModalOpen: false,
    whatsappStep: 1,
    addProviderTelegramModalOpen: false,
    addNewProviderModalOpen: false,
    telegramStep: 1,
    activeProvider: null,
    typePass: 'password',
    channel: null,
    providerName: '',
    providerWebsite: '',
    providerComment: '',
    saveSettingLoading: false,
    error: {
      login: false,
      password: false,
      sender: false,
      url: false,
      urlValidation: false,
      providerName: false,
      providerWebsite: false,
      providerWebsiteValidation: false,
    }
  }),
  watch: {
    active_project: {
      async handler(){
        await this.getProviders();
        window.Echo.private(`project.${this.active_project.id}.provider`)
          .listen('.wa-auth', (message) => {
            console.log(message)
            if (message.status == 'loading') this.whatsappQrModalData.step = 2
            if (message.is_auth) this.whatsappQrModalData.step = 4
          });
      }
    }
  },
  methods: {
    ...mapActions('ChannelsModule', ['GET_CHANNELS', 'GET_CHANNEL', 'GET_CHANNEL_PROVIDERS', 'GET_CHANNEL_PROVIDER', 'GET_CUSTOM_AVAILABLE_PROVIDERS', 'TOGGLE_CHANNEL', 'TOGGLE_PROVIDER', 'UPDATE_CHANNEL_PROVIDER', 'NEW_CHANNEL_PROVIDER', 'ADD_NEW_PROVIDER', 'GET_QR', 'GET_PROVIDER_STATUS', 'SAVE_PROVIDER_SETTINGS', 'DELETE_PROVIDER_SETTINGS', 'SET_PRIORITY_PROVIDER', 'PROVIDER_LOGOUT', 'PROVIDER_RESTART']),
    closeWhatsappSettingModal() {
      this.whatsappSettingModal.open = false
      this.whatsappSettingModal.provider = null
    },
    goToChannels() {
      this.GET_CHANNELS(this.active_project.id)
      this.$router.push('/channels')
    },
    async logoutProvider() {
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: this.whatsappSettingModal.provider.id,
      }
      const res = await this.PROVIDER_LOGOUT(data)
      console.log(res)
      if (res.success) {
        this.whatsappSettingModal.open = false
        this.getProviders()
        toast.success("Logout success")
      } else {
        toast.error(res.error)
      }
    },
    async restartProvider() {
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: this.whatsappSettingModal.provider.id,
      }
      const res = await this.PROVIDER_RESTART(data)
      console.log(res)
      if (res.success) {
        toast.success("Provider was successfuly restart")
      } else {
        toast.error(res.error)
      }
    },
    async saveProviderName() {
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: this.whatsappSettingModal.provider.id,
        providerData: {
          name: this.whatsappSettingModal.provider.name,
        },
      }

      const res = await this.SAVE_PROVIDER_SETTINGS(data)
      console.log(res)
      if(res.success) {
        toast.success('Provider name have been saved');
        this.whatsappSettingModal.editName = false
        this.getProviders()
      } else {
        toast.error('Something went wrong')
      }
    },
    async setPriorityProvider(id) {
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: id,
      }
      const res = await this.SET_PRIORITY_PROVIDER(data);
      if (res.success) {
        this.getProviders()
      } else {
        toast.error('Something went wrong')
      }
    },
    async openSettings(provider) {
      this.providerSettings.settings = []
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: provider.id,
      }
      const res = await this.GET_CHANNEL_PROVIDER(data);
      console.log(res)
      if (res.setting) {
        for (const [key, value] of Object.entries(res.setting)) {
          this.providerSettings.settings.push({
            key,
            value,
          })
        }
      }
      this.providerSettings.activeProvider = provider;
      this.providerSettingsOpen = true;
    },
    async deleteProvider() {
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: this.providerSettings.activeProvider.id,
      }

      const res = await this.DELETE_PROVIDER_SETTINGS(data)
      console.log(res)
      if(res.success) {
        toast.success('Provider have been deleted');
        this.providerSettingsOpen = false;
        this.providerSettings.activeProvider = null;
        this.providerSettings.settings = [];
        this.getProviders()
      } else {
        toast.error('Something went wrong')
      }
    },
    async saveProviderSettings() {
      const settings = {}
      this.providerSettings.settings.forEach(e => settings[e.key] = e.value)
      if (this.providerSettings.settings.find(e => !e.value)) {
        toast.error('Fill all required fields')
        return;
      }
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: this.providerSettings.activeProvider.id,
        providerData: settings,
      }

      const res = await this.SAVE_PROVIDER_SETTINGS(data)
      console.log(res)
      if(res.success) {
        toast.success('Settings have been saved');
        this.providerSettingsOpen = false;
        this.providerSettings.activeProvider = null;
        this.providerSettings.settings = [];
        this.getProviders()
      } else {
        toast.error(res.error)
      }
    },
    openProvider(provider){
      this.activeProvider = provider;
      this.providerSettingModalOpen = true;
    },
    closeWhatsappQrModal() {
      clearTimeout(this.whatsappQrModalData.timeout)
      this.whatsappQrModalOpen = false
      this.whatsappQrModalData = {
        step: 1,
        activeProviderId: null,
        qrLoading: false,
        qrCode: null,
        name: null,
        phone: null,
        timeout: null,
        expired: false,
      }
      this.getProviders();
    },
    async checkProviderStatus(id){
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: id,
      }
      const res = await this.GET_PROVIDER_STATUS(data);
      console.log(res);
      // status == 'qr'
      // status == 'authenticated'
      // An error occurred, scan the qr code again
      if (res.data.status == 'authenticated') {
        this.whatsappQrModalData.step = 4;
      } else {
        toast.error('An error occurred, scan the qr code again')
      }
    },
    async getQr(id){
      if (this.whatsappQrModalData.timeout) {
        clearTimeout(this.whatsappQrModalData.timeout)
      }
      this.whatsappQrModalData.qrLoading = true;
      this.whatsappQrModalData.expired = false;
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: id,
      }
      const res = await this.GET_QR(data);
      console.log(res);
      QRCode.toDataURL(res.data.qr)
        .then(url => {
          // console.log(url)
          this.whatsappQrModalData.qrCode = url
          this.whatsappQrModalData.qrLoading = false;
          const self = this;
          this.whatsappQrModalData.timeout = setTimeout( () => {
            self.whatsappQrModalData.expired = true;
          }, 44000);
        })
        .catch(err => {
          console.error(err)
        })
    },
    async getProvider(id){
      const data = {
        projectId: this.active_project.id,
        channelId: this.channelId,
        providerId: id,
      }
      const res = await this.GET_CHANNEL_PROVIDER(data);
      console.log(res);
    },
    async addNewProvider(){
      // const data = {
      //   channel_id: this.channelId,
      //   active_project_id: this.active_project.id,
      //   providerData: {
      //     provider_name: this.newProvider.name,
      //     link: this.newProvider.link,
      //     comment: ''
      //   }
      // }
      // const res = await this.NEW_CHANNEL_PROVIDER(data);
      const data = {
        provider_id: this.avilableProviders[0].id,
        channel_id: this.channelId,
        project_id: this.active_project.id,
        providerData: {
          name: this.newProvider.name
        }
      }
      const res = await this.ADD_NEW_PROVIDER(data);
      if(res.success) {
        this.addNewProviderModalOpen = false;
        this.newProvider.name = ''
        toast.success('Provider was successfuly added')
        this.getProviders()
      } else {
        toast.error(res.error)
      }
      console.log(res)
    },
    addProvider(){
      console.log(parseInt(this.channelId))
      switch(parseInt(this.channelId)) {
        case 1: this.addProviderWhatsappModalOpen = true; break;
        case 2: this.addProviderTelegramModalOpen = true; break;
        case 3: this.addProviderModalOpen = true; break;
      }
    },
    async sendRequest(){
      if(this.sendRequestLoading == true) return;
      this.error.providerName = false;
      this.error.providerWebsite = false;
      this.error.providerWebsiteValidation = false;
      if(this.providerName == '') this.error.providerName = true;
      if(this.providerWebsite == '') this.error.providerWebsite = true;
      // if(!/(^https?:\/\/)[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i.test(this.providerWebsite)) this.error.providerWebsiteValidation = true;
      if(!/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(this.providerWebsite)) this.error.providerWebsiteValidation = true;
      if(this.providerName == '' || this.providerWebsite == '' || !/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(this.providerWebsite)) return;
      this.sendRequestLoading = true;
      const data = {
        channel_id: this.channelId,
        active_project_id: this.active_project.id,
        providerData: {
          provider_name: this.providerName,
          link: this.providerWebsite,
          comment: this.providerComment
        }
      }
      const res = await this.NEW_CHANNEL_PROVIDER(data);
      if(res.success) {
        this.addProviderModalOpen = false;
        toast.success('Request successful send');
      }else{
        toast.error(res.error);
      }
      this.sendRequestLoading = false;
    },
    // async disconnect(){
    //   const data = {
    //     channel: {
    //       id: this.channelId
    //     },
    //     active_project_id: this.active_project.id
    //   }
    //   const res = await this.TOGGLE_CHANNEL(data);
    //   if(!res.success){ 
    //     toast.error(res.error.message)
    //   } else {
    //     await this.GET_CHANNELS(this.active_project.id);
    //     this.$router.push('/channels')
    //   }
    // },
    async toogleProvider(provider) {
      const providerData = {
        provider_id: provider.id,
        channel_id: this.$route.params.channelId,
        active_project_id: this.active_project.id
      }
      const is_active = provider.is_active
      console.log(provider)
      const res = await this.TOGGLE_PROVIDER(providerData);
      console.log(res)
      if(!res.success){
        if (res.sys_message == "ERROR_PROVIDER_INSTANCE_DISCONNECTED") {
          this.getQr(provider.id);
          this.whatsappQrModalOpen = true;
          this.whatsappQrModalData.activeProviderId = provider.id;
          this.whatsappQrModalData.name = provider.name;
          this.whatsappQrModalData.phone = '+79191141889';
        } else {
          toast.error(res.error);
        }
      } else {
        toast.success(`You have successfully ${is_active ? 'disconnected' : 'connected'} a gate`);
      }
      const data = {
        projectId: this.active_project.id,
        channelId: this.$route.params.channelId,
      }
      this.providers = await this.GET_CHANNEL_PROVIDERS(data);
    },
    async saveSetting(){
      if(this.saveSettingLoading == true) return;
      this.error.login = false;
      this.error.password = false;
      this.error.sender = false;
      this.error.url = false;
      this.error.urlValidation = false;
      if(this.activeProvider.setting.login == '') this.error.login = true;
      if(this.activeProvider.setting.password == '') this.error.password = true;
      if(this.activeProvider.setting.sender == '') this.error.sender = true;
      if(this.activeProvider.setting.url == '') this.error.url = true;
      if(!/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(this.activeProvider.setting.url)) this.error.urlValidation = true;
      if(this.activeProvider.setting.login == '' || this.activeProvider.setting.password == '' || this.activeProvider.setting.sender == '' || this.activeProvider.setting.url == '' || !/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(this.activeProvider.setting.url)) return;
      this.saveSettingLoading = true;
      const data = {
        provider_id: this.activeProvider.id,
        channel_id: this.$route.params.channelId,
        active_project_id: this.active_project.id,
        providerData: {
          type: 'sms',
          provider_type: this.activeProvider.type,
          url: this.activeProvider.setting.url,
          login: this.activeProvider.setting.login,
          password: this.activeProvider.setting.password,
          sender: this.activeProvider.setting.sender,
          is_connected: true,
        },
      }
      this.providerSettingModalOpen = false;
      const res = await this.UPDATE_CHANNEL_PROVIDER(data);
      if(!res.success){
        toast.error(res.error.message);
      } else {
        toast.success('You have successfully connected a gate');
        this.toogleProvider(this.activeProvider);
      }
      this.saveSettingLoading = false;
      this.providerSettingModalOpen = false;
    },
    async getProviders(){
      if(!this.active_project) return;
      const data = {
        projectId: this.active_project.id,
        channelId: this.$route.params.channelId,
      }
      const channel = await this.GET_CHANNEL(data);
      this.channel = channel;
      this.channelId = this.$route.params.channelId;
      this.providers = await this.GET_CHANNEL_PROVIDERS(data);
      this.getCustomProviders()
    },
    async getCustomProviders(){
      const data = {
        channelId: this.channelId,
        projectId: this.active_project.id,
      }
      const res = await this.GET_CUSTOM_AVAILABLE_PROVIDERS(data);
      console.log(res)
      if (res.data) {
        for (const [key, value] of Object.entries(res.data[0].fields)) {
          this.providerSettings.settings.push({
            key,
            value,
          })
        }
      }
      this.avilableProviders = res.data
    }
  },
  computed: {
    ...mapFields('ProjectsModule', {
      active_project: 'active_project.project',
    }),
    ...mapFields('ProfileModule', {
      userId: 'id',
      profile: 'profile',
      tariffPlanModalOpen: 'tariffPlanModalOpen'
    }),
  },
  async beforeMount(){
    await this.getProviders();
  },
}
</script>

<style>
.form-switch input[type=checkbox]:checked + label {
  background-color: #44C157 !important;
}
</style>