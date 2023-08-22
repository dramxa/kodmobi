<template>
  <EyeOffIcon v-if="!showPassword && !showConfirmPassword" @click.stop="ToggleTypePass" class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-all absolute transform-translate-y top-1/2 right-2"/>
  <EyeIcon v-else @click.stop="ToggleTypePass" class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-all absolute transform-translate-y top-1/2 right-2"/>
</template>

<script>

import { EyeOffIcon, EyeIcon } from '@heroicons/vue/outline'

export default {
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    typePass: 'password'
  }),
  components: {
    EyeIcon,
    EyeOffIcon,
  },
  methods: {
    ToggleTypePass(e) {
      const input = e.target.parentNode.firstChild.tagName === 'path' ? 
        e.target.parentNode.firstChild.parentNode.previousSibling :
        e.target.parentNode.firstChild

      this.showPass(input)
    },
    showPass(el) {
      if(el.id === 'password') {
        el.type = el.type === 'password' ? '' : 'password'
        this.showPassword = !this.showPassword
      } else {
        el.type = el.type === 'password' ? '' : 'password'
        this.showConfirmPassword = !this.showConfirmPassword
      }
    }
  }
}
</script>

<style scoped>

</style>