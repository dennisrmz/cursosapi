<template>
  <nav class="navigation">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'CoursesList' }">Cursos</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
  </nav>

  <div v-if="auth" class="mb-3">
    <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>

  </div>

  <nav class="navigation" v-else>
    <router-link :to="{ name: 'login' }">Login</router-link> |
    <router-link :to="{ name: 'register' }">Register</router-link>
  </nav>
  <router-view />
</template>
<script>
import { mapActions, mapState } from "vuex";


export default {
  created() {
    this.setAuth();
  },
  computed:{
    ...mapState([
      'auth'
    ])
  },
  methods: {
    ...mapActions([
      'setAuth',
      'logout'
    ]),
  
  },
  watch: {
    auth(newValue){
      if(newValue){
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + newValue.token.access_token;
      }
      
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
