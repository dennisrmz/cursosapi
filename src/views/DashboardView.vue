<template>
  <h1 v-if="auth">
    Bienvenido {{ auth.user.name }}
  </h1>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
      ...mapState([
        'auth'
      ])
    },
}
</script>

<style>

</style>