<template>
  <div>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
          <md-icon>close</md-icon>
        </md-button>
        <connected-user></connected-user>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>

      <p>사이드내용</p>
    </md-sidenav>

    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>apps</md-icon>
      </md-button>
      <h1 class="md-title">열린채팅</h1>
    </md-toolbar>

    <div class="main-content">
      <p>본문내용</p>
    </div>
  </div>
</template>

<script>
import ConnectedUser from './components/sidebar/ConnectedUser'

export default {
  name: 'home',
  components: {ConnectedUser},
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
