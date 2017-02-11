<template>
<div class="ui middle aligned center aligned grid login__container">
  <div class="column">
    <h2 class="ui teal header">
          <div class="content">
            로그인
          </div>
        </h2>
    <form class="ui large form" :class="{'error': hasErrors}">
      <div class="ui stacked segment">

        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="email" name="email" placeholder="이메일" v-model.trim="email" required>
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="패스워드" v-model.trim="password" required>
          </div>
        </div>

        <div class="ui fluid large teal button" @click.prevent="login" :class="{'loading': isLoading}">로그인</div>
      </div>

      <div class="ui error message" v-if="hasErrors">
        <p v-for="error in errors">{{ error }}</p>
      </div>

    </form>

    <div class="ui message">
      <router-link to="/register">
        <md-button class="md-primary">회원가입</md-button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      errors: [],
      isLoading: false
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
    login () {
      this.errors = []
      if(this.isFormValid()){
        this.isLoading = true
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
          this.$store.dispatch('setUser', user)
          this.$router.push('/')
        }).catch(error => {
          this.errors.push(error.message)
          this.isLoading = false
        })
      }
    },
    isEmpty() {
      if (this.email.length == 0 || this.password.length == 0) {
        return true;
      }
      return false;
    },
    passwordValid() {
      if (this.password.length < 6) {
        return false;
      }
      return true;
    },
    isFormValid() {
      if (this.isEmpty()) {
        this.errors.push('내용을 입력해 주세요!')
        return false;
      }
      if (!this.passwordValid()) {
        this.errors.push('패스워드는 최소6자 이상이어야 합니다!')
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
.login__container {
  margin-top: 40px;
}

.column {
  max-width: 450px;
}
</style>
