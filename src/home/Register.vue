<template>
  <div>
    <md-toolbar>
      <h1 class="md-title">회원가입</h1>
    </md-toolbar>

    <div class="main-content">
      <p>
        <form>
          <md-input-container>
            <label>이름</label>
            <md-input type="text" name="name" v-model.trim="name" required></md-input>
          </md-input-container>

          <md-input-container>
            <label>이메일</label>
            <md-input type="email" name="email" v-model.trim="email" required></md-input>
          </md-input-container>

          <md-input-container>
            <label>패스워드</label>
            <md-input type="password" name="password" v-model.trim="password" required></md-input>
          </md-input-container>

          <md-input-container md-has-password>
            <label>패스워드확인</label>
            <md-input type="password" name="password_confirmation" v-model.trim="password_confirmation" required></md-input>
          </md-input-container>

          <div align="center" v-if="hasErrors">
            <md-chip v-for="error in errors">{{ error }}</md-chip>
          </div>

          <div align="center">
            <md-spinner :class="{'md-indeterminate': isLoading}"></md-spinner>
          </div>

          <md-toolbar>
            <md-button class="md-fab md-primary md-fab-bottom-center" @click.native="register">가입하기</md-button>
            <router-link to="/login"><md-button class="md-fab md-fab-bottom-right">로그인</md-button></router-link>
          </md-toolbar>
        </form>
      </p>
    </div>

  </div>
</template>
<script>
import md5 from 'md5'

export default {
  name: 'register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      usersRef: firebase.database().ref('users'),
      isLoading: false
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
    register() {
      this.errors = []

      if (this.isFormValid()) {
        this.isLoading = true
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            user.updateProfile({
              displayName: this.name,
              photoURL: "https://www.gravatar.com/avatar/" + md5(user.email) + "?d=identicon"
            }).then(() => {
              //아바타 적용
              this.saveUserToUsersRef(user).then(() => {
                this.$store.dispatch("setUser", user)
                this.$router.push('/')
              })
            }, error => {
              this.errors.push(error.message)
              this.isLoading = false
            })
          }).catch(error => {
            this.errors.push(error.message);
            this.isLoading = false
          })
      }
    },
    saveUserToUsersRef (user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      })
    },
    isEmpty() {
      if (this.name.length == 0 || this.email.length == 0 || this.password.length == 0 || this.password_confirmation.length == 0) {
        return true;
      }
      return false;
    },
    passwordValid() {
      if (this.password.length < 6 || this.password_confirmation.length < 6) {
        return false;
      }
      if (this.password !== this.password_confirmation) {
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
        this.errors.push('패스워드불일치 혹은 최소6자 이상이어야 합니다!')
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>
