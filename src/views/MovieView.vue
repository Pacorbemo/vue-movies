<template>
  <div v-if="!loading && movie">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <router-link to="/" style="margin-right: auto;">Volver a películas</router-link>
    </div>
    <h1>{{ movie.title }} 
        <button @click="toggleFavorite(movie.href)">
            {{ existFavorite(movie.href) ? 'Remove' : 'Add' }}
        </button>
    </h1>
    <div class="container">
        <img :src="movie.thumbnail">
        <div>
            <div class="container genres">
                <h3 v-for="genre in movie.genres">{{ genre }}</h3>
            </div>
            <p>{{ movie.extract }}</p>
        </div>

    </div>
  </div>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { getMovie } from "../composables/GetMovie";
    import { ref } from "vue";
    import { Movie } from "../interfaces/MovieInterface";
    import { storeToRefs } from "pinia";
    import { useLoadingStore } from "../stores/loading";
    import { useFavoriteStore } from '../stores/favorite';

    const route = useRoute();
    const { id } = route.params;
    const movie = ref<Movie>();
    const movieId = Array.isArray(id) ? id[0] : id;
    const {loading} = storeToRefs(useLoadingStore());
    const{toggleFavorite, existFavorite, getFavorites} = useFavoriteStore()

    // getFavorites();

    const load = async () => {
        loading.value = true
        movie.value = await getMovie(movieId);
        loading.value = false
    }
    load()

</script>

<style scoped>
img{
    width: 400px;
}

.container{
    display: flex;
    flex-direction: row;
    gap: 5vw;
}

.genres{
    width: 100%;
    align-items: center;
    justify-content: center;
    cursor: context-menu;
    gap: 3vw;
    height: fit-content;
    color: lightgray;
    font-style: italic;
}

.genres h3:hover{
    transition: 0.2s;
    color: hsl(0, 0%, 70%);
}

p{
    font-weight: bold;
    max-width: 60vw;
    font-size: 1vw;
}
</style>
