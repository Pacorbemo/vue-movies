<script setup lang="ts">
import CardComponent from '../components/CardComponent.vue';
import { usePageStore } from '../stores/page';
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '../stores/loading';
import { useSearchStore } from '../stores/search';
import PageSelectorComponent from '../components/PageSelectorComponent.vue';

const { loading } = storeToRefs(useLoadingStore())
const { search } = storeToRefs(useSearchStore())
const { page, maxPag } = storeToRefs(usePageStore());
const { data } = storeToRefs(useDataStore());
const { changePage } = usePageStore();
const { callSearch } = useSearchStore();
const { firstDataLoad } = useDataStore();

firstDataLoad();

</script>

<template>
  <div id="top">
    <a @click="page = 1">
        <h1>Movies</h1>
      </a>
    <input v-model="search" @keyup="callSearch" placeholder="Search movie">
    <div style="margin-top: 1vw;">
      <button @click=changePage(-1) :disabled="page<=1 ">
        -
      </button>
      <button @click=changePage(1) :disabled="page>=maxPag">
        +
      </button>
      <h3 style="margin-bottom: 0;">Page: {{ page }}</h3>
      <PageSelectorComponent />
    </div>
  </div>

  <div v-if="!loading" id="movies">
    <CardComponent 
      v-for="(movie, i) in data"
      :key="i"
      :title="movie.title"
      :year="movie.year"
      :thumbnail="movie.thumbnail"
      :href="movie.href"  
    ></CardComponent>
    <div v-if="data.length == 0">No matches found</div>
  </div>

</template>


<style scoped>
#top {
  width: 100%;
  min-width: 100%;
  text-align:center;
  box-sizing: border-box;
}

#movies {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 0 50px; 
  justify-items: center; 
  align-items: flex-end; 
  margin: auto;
  overflow: hidden;
}


a{
  cursor: pointer;
}

</style>