<template>
  <div class="phone-viewport">
    <md-list class="md-dense">
      <md-list-item v-for="user in users" :key="user.uid" @click.native="changeChannel(user)">
        <md-avatar class="md-avatar-icon">
          <img :src="user.avatar" alt="아바타">
        </md-avatar>

        <span :class="{'is_active': isActive(user)}">{{ user.name }}</span>

        <md-button class="md-icon-button md-list-action">
          <md-icon :class="{'md-primary': isOnline(user)}">chat_bubble</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'users',
  data () {
    return {
      users: [],
      usersRef: firebase.database().ref('users'),
      connectedRef: firebase.database().ref('.info/connected'),
      presenceRef: firebase.database().ref('presence')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentChannel'])
  },
  mounted () {
    this.addListeners()
  },
  methods: {
    addListeners() {
      this.usersRef.on('child_added', snap => {
        if(this.currentUser.uid !== snap.key){
          let user = snap.val()
          user['uid'] = snap.key
          user['status'] = 'offline'
          this.users.push(user)
          }
      })
      this.presenceRef.on('child_added', snap => {
        if(this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key)
        }
      })
      this.presenceRef.on('child_removed', snap => {
        if(this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key, false)
        }
      })
      this.connectedRef.on('value', snap => {
        if(snap.val() === true){
          let ref = this.presenceRef.child(this.currentUser.uid)
          ref.set(true)
          ref.onDisconnect().remove( err => {
            if(err !== null) console.log(err)
          })
        }
      })
    },
    addStatusToUser (userId, connected = true) {
      let index = this.users.findIndex( user => user.uid === userId )
      if(index !== -1){
        connected === true ? this.users[index].status = 'online' : this.users[index].status = 'offline'
      }
    },
    isOnline(user){
      return user.status == 'online'
    },
    changeChannel(user){
      let channelId = this.getChannelId(user.uid)
      let channel = { id: channelId, name: user.name }
      this.$store.dispatch('setPrivate', true)
      this.$store.dispatch('setCurrentChannel', channel)
    },
    isActive(user){
      let channelId = this.getChannelId(user.uid)
      return this.currentChannel.id === channelId
    },
    getChannelId(userId){
      return userId < this.currentUser.uid ? userId + '/' + this.currentUser.uid : this.currentUser.uid + '/' + userId
    },
    detachListeners () {
      this.usersRef.off()
      this.presenceRef.off()
      this.connectedRef.off()
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style scoped>
.is_active{
  color: blue;
}
</style>
