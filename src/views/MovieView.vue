<template>
  <div v-if="!loading && movie">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <router-link to="/" style="margin-right: auto;">Volver a películas</router-link>
    </div>
    <div id="title">
        <h1>{{ movie.title }}</h1>
        <button @click="toggleFavorite(movie.href)" style="background: none; border: none; cursor: pointer;" :class="{ 'active': existFavorite(movie.href) }">
            <svg v-if="existFavorite(movie.href)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" width="50px" height="50px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" width="50px" height="50px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        </button>
    </div>
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
    const{toggleFavorite, existFavorite} = useFavoriteStore()

    const load = async () => {
        loading.value = true
        movie.value = await getMovie(movieId);
        loading.value = false
    }
    load()

</script>

<style scoped>

#title{
    display: flex;
    gap: 1rem;
    align-items: center;
}

button{
    font-size: 0;
    bottom: 0;
    outline: none;
    width: 50px;
    height: 50px;
}

button:hover{
    transition:0.2s;
    opacity: 80%;
}

button.active:hover{
    position: relative;
}

button.active:hover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background: black;
    transform: rotate(50deg);

}


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
