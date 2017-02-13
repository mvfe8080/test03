<template>
  <div>
    <md-avatar class="md-large">
      <img :src="currentUser.photoURL" alt="아바타">
    </md-avatar>
    <span class="md-title">
      {{ currentUser.displayName }}
    </span>
    <md-button class="md-icon-button" @click.native="logout">
      <md-icon class="md-size-2x">settings_power</md-icon>
    </md-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'connected-user',
  data () {
    return {
      presenceRef: firebase.database().ref('presence')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    logout () {
      this.presenceRef.child(this.currentUser.uid).remove()
      firebase.auth().signOut()
      this.$store.dispatch("setUser", null)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
