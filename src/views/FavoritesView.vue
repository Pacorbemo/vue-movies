<script setup>
import { storeToRefs } from 'pinia';
import { useFavoriteStore } from '../stores/favorite';
import { getFavoriteMovies } from '../composables/GetMovies';
import { onMounted, ref } from 'vue';
import FavoriteCardComponent from '../components/FavoriteCardComponent.vue';

const {favorites} = storeToRefs(useFavoriteStore())

let data = ref(null);
let loading = ref(true)

onMounted(async () => {
    data.value = await getFavoriteMovies(favorites);
    loading.value = false
});

async function handleDeleted(href){
    // console.log(href)
    data.value = data.value.filter(movie => movie.href != href)
}
</script>

<template>
    <div id="top">
        <a>
            <h1>Favorites</h1>
        </a>
    </div>

    <div id="movies" v-if="!loading">
        <FavoriteCardComponent 
        v-for="movie in data"
        :key="movie.href"
        :title="movie.title"
        :year="movie.year"
        :thumbnail="movie.thumbnail"
        :href="movie.href"
        @deleted="handleDeleted"  
        ></FavoriteCardComponent>
    </div>
</template>