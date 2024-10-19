<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import { getMoviesByPag } from '../composables/GetMovies';
import { usePageStore } from '../stores/page';
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';

const loading = ref(true);
const { page } = storeToRefs(usePageStore());
const { data } = storeToRefs(useDataStore());
const { changePage } = usePageStore();

watchEffect(async () => {
  loading.value = true;
  data.value = await getMoviesByPag(page.value);
  loading.value = false;
});
</script>

<template>
  <div id="top">
    <h1>Peliculas</h1>
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
  flex-wrap: wrap; /* Mantener las cards dentro del contenedor */
  gap: 50px;
  align-items: flex-end;
  justify-content: center;
  margin: auto;
  overflow: hidden; /* Evitar que se desborde el contenido */
}


</style>