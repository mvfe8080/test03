<template>
  <div>
    <form>
      <md-input-container>
        <label>메세지</label>
        <md-textarea name="message" id="message" v-model.trim="message"></md-textarea>
      </md-input-container>
      <md-toolbar>
        <md-button class="md-fab md-primary md-fab-bottom-center" @click.native="sendMessage">보내기</md-button>
        <md-button class="md-fab md-fab-bottom-right">이미지</md-button>
      </md-toolbar>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'message-form',
  data () {
    return {
      message: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'currentUser'])
  },
  methods: {
    sendMessage () {
      if(this.currentChannel !== null){
        if(this.message.length > 0){
          this.$parent.getMessageRef().child(this.currentChannel.id).push().set(this.createMessage()).then( () => {

          }).catch( error => {
            this.errors.push(error.message)
          })
          this.message = ""
        }
      }
    },
    createMessage () {
      return {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
