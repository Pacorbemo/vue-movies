import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getMoviesByPag, getMoviesBySearchPage } from '../composables/GetMovies'
import { useDataStore } from './data'
import { useSearchStore } from './search'
import { getMaxPag } from '../composables/GetMaxPag'
import { watch } from 'vue'

export const usePageStore = defineStore('page', () => {
	const page = ref(1)

	const maxPag = ref();
	const firstMaxPag = ref();

	(async() => {
		maxPag.value = await getMaxPag()
		firstMaxPag.value = maxPag.value;
	})()

	watch(page, () => {
		refreshPage()
	})

    const refreshPage = async () =>{
		const { data } = storeToRefs(useDataStore());
		const { search } = storeToRefs(useSearchStore());

		if(search.value){
			data.value = await getMoviesBySearchPage(search.value, page.value)
		}else{
			data.value = await getMoviesByPag(page.value)
		}
  	}

	const changePage = (up?: number) => {
		if(up) up == 1 ? page.value ++ : page.value --
	}

  return { page, maxPag, firstMaxPag, changePage }
})
