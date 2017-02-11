<template>
  <div>
    <h2 class="ui inverted center aligned header">채널 <i class="add square icon add_channel" @click="openChannelModal"></i></h2>
    <div class="ui raised padded segment">
      <ul>
        <li v-for="channel in channels"
            :key="channel.id"
            :class="{'is_active': setChannelActive(channel)}"
            @click="changeChannel(channel)">{{ channel.name }}</li>
      </ul>
    </div>

    <div class="ui basic modal" id="channelModal">
      <div class="ui icon header">
        채널추가
      </div>
      <div class="content">
        <div class="ui inverted form" :class="{'error': hasErrors}">
          <div class="field">
            <label for="new_channel">새채널</label>
            <input type="text" name="new_channel" v-model="new_channel" id="new_channel">
          </div>
          <div class="ui error message" v-if="hasErrors">
            <p v-for="error in errors">{{ error }}</p>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>취소
        </div>
        <div class="ui green inverted button" @click="addChannel">
          <i class="checkmark icon"></i>확인
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'channels',
  data () {
    return {
      channels: [],
      new_channel: '',
      channelsRef: firebase.database().ref('channels'),
      errors: [],
      firstLoad: true
    }
  },
  computed: {
    ...mapGetters(['currentChannel']),
    hasErrors () {
      return this.errors.length > 0
    }
  },
  mounted () {
    this.addListeners()
  },
  methods: {
    addListeners () {
      this.channelsRef.on('child_added', snap => {
        this.channels.push(snap.val())
        if(this.firstLoad && this.channels.length > 0){
          this.$store.dispatch("setCurrentChannel", this.channels[0])
        }
        this.firstLoad = false
      })
    },
    openChannelModal () {
      $("#channelModal").modal('show')
    },
    addChannel () {
      let key = this.channelsRef.push().key
      let newChannel = { id: key, name: this.new_channel }
      this.channelsRef.child(key).update(newChannel).then( () => {
        this.new_channel = ''
        $("#channelModal").modal('hide')

      }).catch( error => {
        this.errors.push(error.message)
      })
    },
    changeChannel(channel){
      this.$store.dispatch('setPrivate', false)
      this.$store.dispatch('setCurrentChannel', channel)
    },
    detachListeners () {
      this.channelsRef.off()
    },
    setChannelActive(channel){
      return channel.id === this.currentChannel.id
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style scoped>
.is_active{
  background-color: #d9e6f2;
}
</style>
