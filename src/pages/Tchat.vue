<template>
  <div class="tchat__container">
    <sidebar></sidebar>
    <messages></messages>
</template>

<script>
import Sidebar from './../components/sidebar/Sidebar'
import Messages from './../components/messages/Messages'

export default {
  name: 'tchat',
  components: {Sidebar, Messages}
}
</script>

<style scoped>
.tchat_container{
  height: 100%;
}
</style>
