<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import CardComponent from '../components/CardComponent.vue';
import { getMovies } from '../composables/GetMovies';
import { Movie } from '../interfaces/MovieInterface';

const data = ref<Movie[]>([]);
const loading = ref(true);

watchEffect(async () => {
  loading.value = true;
  data.value = await getMovies();
  loading.value = false;
});

// console.log(data);
</script>

<template>
  <h1>Peliculas</h1>
  <div v-if="loading">Cargando...</div>
  <div v-else id="movies">
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
#movies{
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  align-items: flex-end;
  justify-content: center;
  margin: auto;
}


</style>