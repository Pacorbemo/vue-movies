import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getMoviesByPag } from '../composables/GetMovies'
import { useDataStore } from './data'

export const usePageStore = defineStore('page', () => {
  const page = ref(1)

  const changePage = async (up: boolean) =>{

    console.log(1)

    const { data } = storeToRefs(useDataStore());

    if(up == true){
      page.value ++
      data.value = await getMoviesByPag(page.value);
    }else{
      page.value --
      data.value = await getMoviesByPag(page.value)
    }
  }

  return { page, changePage }
})
