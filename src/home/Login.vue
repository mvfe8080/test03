<template>
  <div>
    <md-toolbar>
      <h1 class="md-title">로그인</h1>
    </md-toolbar>

    <div class="main-content">
      <p>
        <form>
          <md-input-container>
            <label>이메일</label>
            <md-input type="email" name="email" v-model.trim="email" required></md-input>
          </md-input-container>

          <md-input-container>
            <label>패스워드</label>
            <md-input type="password" name="password" v-model.trim="password" required></md-input>
          </md-input-container>

          <div align="center" v-if="hasErrors">
            <md-chip v-for="error in errors">{{ error }}</md-chip>
          </div>

          <div align="center">
            <md-spinner :class="{'md-indeterminate': isLoading}"></md-spinner>
          </div>

          <md-toolbar>
            <md-button class="md-fab md-primary md-fab-bottom-center" @click.native="login">로그인</md-button>
            <router-link to="/register"><md-button class="md-fab md-fab-bottom-right">회원가입</md-button></router-link>
          </md-toolbar>
        </form>
      </p>
    </div>

  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
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

</style>
