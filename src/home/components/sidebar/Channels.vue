<template>
<div>
  <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
    <md-dialog-title>채널추가</md-dialog-title>

    <md-dialog-content>
      <form>
        <md-input-container>
          <label>채널이름</label>
          <md-input type="text" name="new_channel" v-model="new_channel" id="new_channel" required></md-input>
        </md-input-container>

        <div align="center" v-if="hasErrors">
          <md-chip v-for="error in errors">{{ error }}</md-chip>
        </div>

        <div align="center">
          <md-spinner :class="{'md-indeterminate': isLoading}"></md-spinner>
        </div>

      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeDialog('dialog2')">취소</md-button>
      <md-button class="md-primary" @click.native="addChannel">추가하기</md-button>
    </md-dialog-actions>
  </md-dialog>

  <md-button id="fab" @click.native="openDialog('dialog2')">
    <md-icon>add</md-icon>
  </md-button>

  <div class="phone-viewport">
    <md-list>
      <md-list-item
        v-for="channel in channels"
        :key="channel.id"
        :class="{'is_active': setChannelActive(channel)}"
        @click.native="changeChannel(channel)">
        <md-icon>move_to_inbox</md-icon> <span>{{ channel.name }}</span>
      </md-list-item>
    </md-list>
  </div>

</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'channels',
  data() {
    return {
      channels: [],
      new_channel: '',
      channelsRef: firebase.database().ref('channels'),
      errors: [],
      firstLoad: true,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentChannel']),
    hasErrors() {
      return this.errors.length > 0
    }
  },
  mounted() {
    this.addListeners()
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    addListeners() {
      this.channelsRef.on('child_added', snap => {
        this.channels.push(snap.val())
        if (this.firstLoad && this.channels.length > 0) {
          this.$store.dispatch("setCurrentChannel", this.channels[0])
        }
        this.firstLoad = false
      })
    },
    addChannel() {
      this.isLoading = true
      let key = this.channelsRef.push().key
      let newChannel = {
        id: key,
        name: this.new_channel
      }
      this.channelsRef.child(key).update(newChannel).then(() => {
        this.new_channel = ''
        this.isLoading = false
        this.closeDialog('dialog2')

      }).catch(error => {
        this.isLoading = false
        this.errors.push(error.message)
      })
    },
    changeChannel(channel) {
      this.$store.dispatch('setPrivate', false)
      this.$store.dispatch('setCurrentChannel', channel)
    },
    detachListeners() {
      this.channelsRef.off()
    },
    setChannelActive(channel) {
      return channel.id === this.currentChannel.id
    }
  },
  beforeDestroy() {
    this.detachListeners()
  }
}
</script>

<style scoped>
.is_active {
  background-color: #d9e6f2;
}
</style>
