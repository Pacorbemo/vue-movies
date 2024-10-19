<template>
  <div v-if="!loading">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <router-link to="/" style="margin-right: auto;">Volver a películas</router-link>
    </div>
    <h1>{{ movie?.title }}</h1>
    <div class="container">
        <img :src="movie?.thumbnail">
        <div>
            <div class="container genres">
                <h3 v-for="genre in movie?.genres">{{ genre }}</h3>
            </div>
            <p>{{ movie?.extract }}</p>
        </div>

    </div>
  </div>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { getMovie } from "../composables/GetMovie";
    import { ref, watchEffect } from "vue";
    import { Movie } from "../interfaces/MovieInterface";

    const route = useRoute();
    const { id } = route.params;
    const movie = ref<Movie>();
    const movieId = Array.isArray(id) ? id[0] : id;
    const error = ref<string>();
    const loading = ref(true);

    watchEffect(async () => {
        loading.value = true;
        error.value = '';
        try {
            movie.value = await getMovie(movieId);
            console.log(movie.value)
        } catch (err) {
            error.value = "Error al cargar la película";
            console.error(err);
        } finally {
            loading.value = false;
        }
    });
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
