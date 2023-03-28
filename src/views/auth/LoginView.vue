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
            <input type="password" name="password" v-model="password" placeholder="Ingresa tu password" class="form-control">
          </div>

          <button class="btn btn-primary">
            Inicie Sesión
          </button>
        </form>

      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data(){
    return{
      email: 'a',
      password: 'b'
    }
  },
  methods:{
    login(){
      console.log('login')
    }
  }
}
</script>
  
<style scoped>
.card {
  max-width: 32rem;
}
</style>