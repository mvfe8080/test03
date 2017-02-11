<template>
  <div>
    <div class="ui inverted form">
      <div class="two fields">
        <div class="field">
          <textarea name="message" id="message" v-model.trim="message" rows="3" placeholder="메세지"></textarea>
        </div>
        <div class="field">
          <button class="ui green button" @click.prevent="sendMessage">보내기</button>
          <button class="ui labeled icon button"><i class="cloud upload icon"></i>업로드</button>
        </div>
      </div>
    </div>
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
