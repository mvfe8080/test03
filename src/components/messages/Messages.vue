<template>
  <div class="messages__container">
    <div class="messages__content">
      <h2 class="ui inverted center aligned header">{{ channelName }}</h2>
      <div class="ui segment">
        <div class="ui comments">
          <!--단일메세지-->
          <transition-group tag="div" name="list">
            <single-message :message="message" v-for="message in messages" :key="message.id"></single-message>
          </transition-group>
        </div>
      </div>
    </div>
    <!--메세지폼-->
    <message-form></message-form>
  </div>
</template>

<script>
import MessageForm from './MessageForm'
import { mapGetters } from 'vuex'
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

        this.$nextTick( () => {
          $('html, body').scrollTop($(document).height())
        })      
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
.messages__container{
  position: relative;
  background-color: #d9e6f2;
  padding: 10px 30px 210px 30px;
  margin-left: 300px;
  min-height: 100%;
}

.messages__container .comments{
  font-size: 1.2em;
}
</style>
