<template>

    <form @submit.prevent="saveCourse">
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

    <h1>Courses</h1>
    <ul>
        <li v-for="(course) in courses" :key="'course-' + course.id">
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
            categories: [],
            course: {
                title: '',
                description: '',
                category_id: '',
            }
        }
    },
    mounted() {

    },
    created() {
        this.getCourses();
        this.getCategories();
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
        },
        getCategories() {
            this.axios.get('http://127.0.0.1:8000/api/categories')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        saveCourse() {
            this.axios.post('http://127.0.0.1:8000/api/courses', this.course)
                .then(response => {
                    let course = response.data;

                    this.courses.push(course);
                    this.course = {
                        title       : '',
                        description : '',
                        category_id : ''
                    }
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