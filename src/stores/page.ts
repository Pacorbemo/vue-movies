import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getMoviesByPag, getMoviesBySearchPage } from '../composables/GetMovies'
import { useDataStore } from './data'
import { useSearchStore } from './search'

export const usePageStore = defineStore('page', () => {
  const page = ref(1)

  const changePage = async (up: boolean) =>{
    const { data } = storeToRefs(useDataStore());
    const { search } = storeToRefs(useSearchStore());

    if(up == true){
      page.value ++
    }else{
      page.value --
    }

    if(search.value){
      data.value = await getMoviesBySearchPage(search.value, page.value)
    }else{
      data.value = await getMoviesByPag(page.value)
    }

  }

  return { page, changePage }
})
