<template>
    <h1>Aqui podras editar un curso</h1>

    <form @submit.prevent="updateCourse" >
        <div>
            <label for="title">Titulo</label> <br>
            <input id="title" type="text" placeholder="Ingrese el titulo del curso" v-model="course.title">
        </div>
        <br>
        <br>
        <div>
            <label for="description">Descripcion</label> <br>
            <textarea id="description" type="text" placeholder="Ingrese la descripcion del curso"
                v-model="course.description"></textarea>
        </div>
        <br>
        <br>
        <div>
            <label for="category">Categoria</label> <br>
            <select name="category" id="category" v-model="course.category_id">
                <option value="" selected disabled>Seleccione una categoria</option>
                <option v-for="category in categories" :value="category.id" :key="'category-' + category.id">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <br>

        <button type="submit">Guardar</button>

    </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            categories: [],
            course: {
                title: "",
                description: "",
                category: {
                    name: ""
                }

            },
            user: {}
        }
    },
    created() {
        this.getCourse();
        this.getCategories();
    },
    computed:{
        ...mapState(['auth']),
    },
    methods: {
        getCourse() {
            this.axios.get('/api/v2/courses/' + this.$route.params.id + '?included=category,user')
                .then(response => {
                    this.course = response.data
                    this.user = response.data.user

                    if(this.user.id != this.auth.user.id){
                        this.$router.push('/courses')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCategories() {
            this.axios.get('/api/v2/categories')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateCourse() {
            this.axios.put('/api/v2/courses/' + this.$route.params.id, this.course)
                .then(() => {

                    this.$router.push({ name: 'CoursesDetails', params: { id: this.$route.params.id } });
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>

<style>

</style>
