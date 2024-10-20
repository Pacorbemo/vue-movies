<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import { getMovies, getMoviesByPag, getMoviesBySearch } from '../composables/GetMovies';
import { usePageStore } from '../stores/page';
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';
import { isArrayBufferView } from 'util/types';

const loading = ref(true);
const search = ref('');
const { page } = storeToRefs(usePageStore());
const { data } = storeToRefs(useDataStore());
const { changePage } = usePageStore();

watchEffect(async () => {
  loading.value = true;
  data.value = await getMoviesByPag(page.value);
  loading.value = false;
});

const call = async () => {
  data.value = []
  if(search.value == ""){
    data.value = await getMoviesByPag(1);
    return
  }
  if(!loading.value){
    loading.value = true
    data.value = await getMoviesBySearch(search.value)
    loading.value = false
  }
}


</script>

<template>
  <div id="top">
    <h1>Movies</h1>
    <input v-model="search" @input="call" placeholder="Search movie">
    <div>
      <button @click=changePage(false) :disabled="page<=1 ">
        -
      </button>
      <button @click=changePage(true)>
        +
      </button>
    </div>
  </div>
  <div v-if="!loading" id="movies">
    <CardComponent 
      v-for="movie in data"
      :key="movie.thumbnail"
      :title="movie.title"
      :year="movie.year"
      :thumbnail="movie.thumbnail"
      :href = "movie.href"  
    ></CardComponent>
  </div>
</template>

<style scoped>
#top {
  width: 100%;
  min-width: 100%;
  text-align:center;
  box-sizing: border-box;
}

#movies{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  align-items: flex-end;
  justify-content: center;
  margin: auto;
  overflow: hidden;
}


</style>