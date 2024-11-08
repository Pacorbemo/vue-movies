<script setup>
import { storeToRefs } from 'pinia';
import { useFavoriteStore } from '../stores/favorite';
import { getFavoriteMovies } from '../composables/GetMovies';
import { onMounted, ref } from 'vue';
import FavoriteCardComponent from '../components/FavoriteCardComponent.vue';

const {favorites} = storeToRefs(useFavoriteStore())

let data = ref(null);

onMounted(async () => {
  data.value = await getFavoriteMovies(favorites);
  console.log(data.value)
});

function handleDeleted(href){
    data.value = data.value.filter(movie => movie.href != href)
}

</script>

<template>
    <div id="top">
        <h1>Favorites</h1>
    </div>

    <div id="movies">
        <FavoriteCardComponent 
        v-for="(movie, i) in data"
        :key="i"
        :title="movie.title"
        :year="movie.year"
        :thumbnail="movie.thumbnail"
        :href="movie.href"
        @deleted="handleDeleted"  
        ></FavoriteCardComponent>
    </div>
</template>