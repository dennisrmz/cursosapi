<template>
  <h1>login</h1>
  <div class="container">
    <div class="card mx-auto">
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="mb-1">Email</label>
            <input type="email" name="email" v-model="email" placeholder="Ingresa tu Email" class="form-control">
          </div>
          <div class="mb-3">
            <label for="password" class="mb-1">Password</label>
            <input type="password" name="password" v-model="password" placeholder="Ingresa tu password"
              class="form-control">
          </div>

          <button class="btn btn-primary" v-bind:class="{
            'disabled': disabled
          }">
            Inicie Sesión
          </button>
        </form>

      </div>
    </div>
  </div>
</template>
  
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      email: 'orellanadennis12@gmail.com',
      password: '12345678',
      disabled: false,
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapMutations(['setAuth']),


    login() {

      this.disabled = true;
      this.axios.post('/oauth/token', {
        grant_type: 'password',
        client_id: '98da6220-7052-4f52-bf83-f1181d97e420',
        client_secret: 'sPjVpqo0lluyVRbAgwcKClQQgv797Oj13SrXWGbG',
        username: this.email,
        password: this.password

      }).then(response => {
        // console.log(response.data);
        // this.axios.post('/login', {
        this.axios.post('/api/login', {
          username: this.email,
          password: this.password
        }).then(user => {

          // console.log(user.data);
          localStorage.setItem('auth', JSON.stringify({ user: user.data.user, token: response.data }));
          this.disabled = false;
          this.setAuth({ user: user.data.user, token: response.data })

          this.$router.push({
            name: 'dashboard'
          });

        }).catch(function (error) {
          console.log('error');
          console.log(error);
        });


      }).catch(function (error) {
        console.log('error');
        console.log(error);
      });
    }
  }
}
</script>
  
<style scoped>
.card {
  max-width: 32rem;
}
</style>