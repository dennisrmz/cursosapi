<template>
  <h1>{{course.title}}</h1>
  <p>{{course.description}}</p>
    <p>
        <b>Categoria:</b>
        {{ course.category.name }}
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
                category :{
                    name : ""
                },
                id: 0
                
            },
            
        }
    },
    mounted() {
       
    },
    created() {
        this.getCourse();
    },
    methods: {
        getCourse() {
            this.axios.get('http://127.0.0.1:8000/api/courses/' + this.$route.params.id + '?included=category')
                .then(response => {
                    this.course = response.data
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