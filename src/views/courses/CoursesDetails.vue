<template>
  <h1>{{course.title}}</h1>
  <p>{{course.description}}</p>
    <p>
        <b>Categoria:</b>
        {{ course.category.name }}
    </p>

    <p>
        <b>Autor:</b>
        {{ user.name }}
    </p>
    <div v-if="auth && user.id == auth.user.id">
        <router-link :to="{ name: 'CourseEdit', params: { id: course.id }}">
            Editar curso
        </router-link>
    </div>
    
</template>

<script>
import { mapState } from 'vuex';
export default {
    
    data() {
        return {
            course: {
                title : "",
                description: "",
                category : { name : "" },
                id: 0,
            },
            user: {}
        }
    },
    mounted() {
       
    },
    created() {
        this.getCourse();
    },
    computed: {
        ...mapState(['auth']), 
    },
    methods: {
        getCourse() {
            this.axios.get('/api/v2/courses/' + this.$route.params.id + '?included=category,user')
                .then(response => {
                    this.course = response.data
                    this.user = response.data.user
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>