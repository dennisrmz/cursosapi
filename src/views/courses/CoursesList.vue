<template>
    <div class="container">
        <h1>Listado de cursos</h1>
        <ul v-if="errors.length > 0">
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>

        <div v-if="auth" class="card mb-4">
            <form @submit.prevent="saveCourse" class=" card-body">
                <div class="mb-2">
                    <label for="title">Titulo</label> <br>
                    <input class="form-control" id="title" type="text" placeholder="Ingrese el titulo del curso"
                        v-model="course.title">
                </div>
                <div class="mb-2">
                    <label for="description">Descripcion</label> <br>
                    <textarea class="form-control" id="description" type="text"
                        placeholder="Ingrese la descripcion del curso" v-model="course.description"></textarea>
                </div>
                <div class="mb-2">
                    <label for="category">Categoria</label> <br>
                    <select class="form-control" name="category" id="category" v-model="course.category_id">
                        <option value="" selected disabled>Seleccione una categoria</option>
                        <option v-for="category in categories" :value="category.id" :key="'category-' + category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <br>

                <button class="btn btn-primary btn-sm" type="submit">Guardar</button>

            </form>
        </div>

        <div class="mb-4">
            <h2>Buscador</h2>
            <input type="text" v-model="search" name="" id="" placeholder="Ingrese una palabra para filtrar"
                class="form-control">
        </div>
        <ul>
            <li v-for="(course) in courses" :key="'course-' + course.id" class="mb-2">
                <router-link :to="{ name: 'CoursesDetails', params: { id: course.id } }">
                    {{ course.title }}
                </router-link>

                -

                <button v-if="auth && auth.user.id === course.user.id" @click="deleteCourse(course.id)" class="btn btn-danger btn-sm">
                    Eliminar
                </button>
            </li>
        </ul>

        <!-- Paginacion -->
        <div class="d-flex justify-content-center">
            <nav aria-label="...">
                <ul class="pagination">
                    <li v-for="pagination_link in pagination.links" class="page-item"
                        :key="'pagination_link' + pagination_link.label" :class="{
                            'disabled': pagination_link.url == null,
                            'active': pagination_link.active
                        }">
                        <a @click="changePage(pagination_link.url)" class="page-link" v-html="pagination_link.label"
                            style="cursor:pointer;"></a>
                    </li>
                    <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active" aria-current="page">
                            <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li> -->
                </ul>
            </nav>
        </div>

    </div>
</template>

<script>
import usePagination from '@/composables/usePagination';
import { mapState } from 'vuex';

export default {
    setup() {
        const { pagination, page, setPagination, changePage } = usePagination();

        return {
            pagination,
            setPagination,
            page,
            changePage,
        };
    },

    data() {
        return {
            courses: [],
            categories: [],
            course: {
                title: '',
                description: '',
                category_id: '',
            },
            errors: [],
            search: '',

        }
    },
    mounted() {

    },
    computed: {
        ...mapState(['auth']),

    },
    watch: {
        page() {
            this.getCourses();
        },
        search() {
            this.getCourses();
        }
    },
    created() {
        this.getCourses();
        this.getCategories();
    },
    methods: {

        getCourses() {
            // this.axios.get('/api/v2/courses?sort=-id&per_page=10&page=' + this.page + '&filter[title]=' + this.search)

            this.axios.get('/api/v2/courses', {
                params: {
                    included: 'user',
                    sort: '-id',
                    per_page: 10,
                    page: this.page,
                    'filter[title]': this.search
                }
            })
                .then(response => {
                    let res = response.data;
                    this.courses = res.data;

                    this.setPagination(res);
                    // this.pagination = {
                    //     links: res.links,
                    //     last_page: res.last_page
                    // }


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
        saveCourse() {
            this.axios.post('/api/v2/courses', this.course)
                .then(() => {

                    // let course = response.data;
                    // this.courses.push(course);
                    this.getCourses();

                    this.course = {
                        title: '',
                        description: '',
                        category_id: ''
                    }
                    this.errors = []
                })
                .catch(error => {
                    console.log(error.response.data)
                    let errors = Object.values(error.response.data.errors).flat();

                    this.errors = errors;

                })
        },
        deleteCourse(id) {
            this.axios.delete('/api/v2/courses/' + id)
                .then(() => {
                    this.getCourses();
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}
</script>

<style></style>