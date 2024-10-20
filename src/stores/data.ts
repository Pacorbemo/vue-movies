import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { Movie } from "../interfaces/MovieInterface";
import { useLoadingStore } from "./loading";
import { getMoviesBySearchPage } from "../composables/GetMovies";
import { usePageStore } from "./page";
import { useSearchStore } from "./search";

export const useDataStore = defineStore('data', () => {
    const data = ref<Movie[]>([]);
    const {page} = storeToRefs(usePageStore())
    const {search} = storeToRefs(useSearchStore())
    const {loading} = storeToRefs(useLoadingStore())

    const firstDataLoad = async () => {
        loading.value = true;
        data.value = await getMoviesBySearchPage(search.value, page.value);
        loading.value = false;
    }

    return{data, firstDataLoad}
})
