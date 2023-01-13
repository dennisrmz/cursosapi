<template>

    <form >
        <div>
            <label for="title">Titulo</label> <br>
            <input type="text" placeholder="Ingrese el titulo del curo">
        </div>

    </form>
    <h1>Courses</h1>
    <ul>
        <li v-for="(course, index) in courses" :key="index">
            <router-link :to="{ name: 'CoursesDetails', params: { id: course.id } }">
                {{ course.title }}
            </router-link>
        </li>
    </ul>
</template>

<script>

export default {
    data() {
        return {
            courses: [],
        }
    },
    mounted() {

    },
    created() {
        this.getCourses();
    },
    methods: {
        getCourses() {
            this.axios.get('http://127.0.0.1:8000/api/courses')
                .then(response => {
                    this.courses = response.data
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