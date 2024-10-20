import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getMoviesByPag, getMoviesBySearchPage } from '../composables/GetMovies'
import { useDataStore } from './data'
import { useSearchStore } from './search'
import { getMaxPag } from '../composables/GetMaxPag'

export const usePageStore = defineStore('page', () => {
	const page = ref(1)

	const maxPag = ref();

	(async() => {
		maxPag.value = await getMaxPag()
	})()

    const changePage = async (up?: number) =>{
		const { data } = storeToRefs(useDataStore());
		const { search } = storeToRefs(useSearchStore());

		if(up) up == 1 ? page.value ++ : page.value --

		if(search.value){
			data.value = await getMoviesBySearchPage(search.value, page.value)
		}else{
			data.value = await getMoviesByPag(page.value)
		}

  }

  return { page, maxPag, changePage }
})
