<template>
  <div>
    <md-avatar>
      <img :src="message.user.avatar" alt="아바타">
    </md-avatar>
    <span class="md-body-1" :class="{'self_message': selfMessage(message.user)}">
      {{ message.user.name }}
      {{ message.timestamp | fromNow }}
      {{ message.content }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'single-message',
  props: ['message'],
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    selfMessage(user) {
      return user.id  === this.currentUser.uid
    }
  },
  filters: {
    fromNow (value) {
      return moment(value).fromNow()
    }
  }
}
</script>

<style scoped>
.self_message{
  color: blue;
}
</style>
