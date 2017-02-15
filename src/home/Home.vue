<template>
  <div>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
          <md-icon>close</md-icon>
        </md-button>
        <connected-user></connected-user>
        <div class="md-toolbar-container">
          <h3 class="md-title">열린 채팅</h3>
        </div>
      </md-toolbar>

      <p>
        <channels></channels>
      </p>
      <p>
        <users></users>
      </p>
    </md-sidenav>

    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>apps</md-icon>
      </md-button>
      <h1 class="md-title">열린채팅</h1>
    </md-toolbar>

    <div class="main-content">
      <p>
        <messages></messages>
      </p>
    </div>
  </div>
</template>

<script>
import ConnectedUser from './components/sidebar/ConnectedUser'
import Channels from './components/sidebar/Channels'
import Messages from './components/messages/Messages'
import Users from './components/sidebar/Users'


export default {
  name: 'home',
  components: { ConnectedUser, Channels, Messages, Users },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle()
    }
  }
}
</script>

<style>
.main-content {
  padding: 16px;
}
</style>
