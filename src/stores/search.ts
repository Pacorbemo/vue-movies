import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useDataStore } from "./data";
import { getMoviesByPag, getMoviesBySearch } from "../composables/GetMovies";
import { useLoadingStore } from "./loading";
import { usePageStore } from "./page";

export const useSearchStore = defineStore("search", () => {
	const search = ref("");

	const callSearch = async () => {
			const { data } = storeToRefs(useDataStore());
			const { loading } = storeToRefs(useLoadingStore());
			const { page, maxPag, firstMaxPag } = storeToRefs(usePageStore())

			page.value = 1;

			if (search.value == "") {
				data.value = await getMoviesByPag(1);
				maxPag.value = firstMaxPag;
			} else if (!loading.value) {
				loading.value = true;
				const response = await getMoviesBySearch(search.value);
				data.value = response.filteredMovies
				maxPag.value = response.maxPages
				loading.value = false;
			}
		};	

	return { search, callSearch };
});
