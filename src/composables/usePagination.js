import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default function usePagination() {
  const pagination = ref({});
  const route = useRoute();
  const router = useRouter();

  watch(pagination, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });

  //Propiedades computadas
  const page = computed(() => {
    let page = route.query.page ?? 1;
    if (page > pagination.value.last_page) {
      router.replace({
        query: {
          page: pagination.value.last_page,
        },
      });
      return pagination.value.last_page;
    }
    return page;
  });

  //Metodos
  const setPagination = (response) => {
    pagination.value = {
      links: response.links,
      last_page: response.last_page,
    };
  };
  const changePage = (url) => {
    router.replace({
      query: {
        page: url.split("page=")[1],
      },
    });
  };

  return {
    pagination,
    setPagination,
    page,
    changePage,
  };
}
