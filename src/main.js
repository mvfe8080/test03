// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import firebase from 'firebase'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Tchat from './pages/Tchat'
import store from './store'
import Test from './pages/Test'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Tchat,
    beforeEnter: (to, from, next) => {
      if(!firebase.auth().currentUser){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({routes})

// Initialize Firebase
let config = {
  apiKey: "AIzaSyAWe6Yrnj2hI7z1MJ-tR8Xiy8HDj9Wj5Mw",
  authDomain: "test02-14539.firebaseapp.com",
  databaseURL: "https://test02-14539.firebaseio.com",
  storageBucket: "test02-14539.appspot.com",
  messagingSenderId: "1081252964564"
};
firebase.initializeApp(config);

window.firebase = firebase

const unsuscribe = firebase.auth().onAuthStateChanged(user => {

  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
  })

  unsuscribe()

})
