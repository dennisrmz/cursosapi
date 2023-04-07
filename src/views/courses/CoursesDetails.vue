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
    <router-link :to="{ name: 'CourseEdit', params: { id: course.id }}">
        Editar curso
    </router-link>
</template>

<script>
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