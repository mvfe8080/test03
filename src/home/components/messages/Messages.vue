<template>
  <div>
    <h1 class="md-title">{{ channelName }}</h1>
    <single-message :message="message" v-for="message in messages" :key="message.id"></single-message>
    <message-form></message-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageForm from './MessageForm'
import SingleMessage from './SingleMessage'

export default {
  name: 'messages',
  components: { MessageForm, SingleMessage },
  data () {
    return {
      messagesRef: firebase.database().ref('messages'),
      privateMessagesRef: firebase.database().ref('privateMessages'),
      messages: [],
      channel: null,
      listeners: []
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
    channelName(){
      if(this.channel !== null){
        return this.isPrivate ? '[개인]' + this.channel.name : '[공개]' + this.channel.name
      }
    }
  },
  watch: {
    currentChannel () {
      this.detachListeners()
      this.addListeners()
      this.channel = this.currentChannel
    }
  },
  methods: {
    addListeners () {
      let ref = this.getMessageRef()
      ref.child(this.currentChannel.id).on('child_added', snap => {
        let message = snap.val()
        message['id'] = snap.key
        this.messages.push(message)

        //this.$nextTick( () => {
          //$('html, body').scrollTop($(document).height())
        //})
      })
    },
    addToListeners(id, ref, event){
      let index = this.listeners.findIndex( el => {
        return el.id === id && el.ref === ref && el.event === event
      })
      if(index === -1){
        this.listeners.push({id: id, ref: ref, event: event})
      }
    },
    detachListeners () {
      this.listeners.forEach( listener => {
        listener.ref.child(listener.id).off(listener.event)
      })
      this.listeners = []
      this.messages = []
    },
    getMessageRef () {
      if(this.isPrivate){
        return this.privateMessagesRef
      }else{
        return this.messagesRef
      }
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style scoped>

</style>
