<template>
    <div id="little-movies">
      <div v-for="movie in data.slice(0,5)" v-if="!loading">
        <img 
            :src="movie.thumbnail" 
            :alt="movie.title" 
            @click="router.push(`/${movie.href}`)"
            class="clickableImg">
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getFavoriteMovies } from '../composables/GetMovies';
import { storeToRefs } from 'pinia';
import { useFavoriteStore } from '../stores/favorite';
import { useRouter } from 'vue-router';

const router = useRouter()
const {favorites} = storeToRefs(useFavoriteStore())

let data = ref(null);
let loading= ref(true)

onMounted(async () => {
  data.value = await getFavoriteMovies(favorites);
  loading.value = false;
});
</script>

<style scoped>
#little-movies {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;

  display: flex;
  gap:5px;
}

img{
  height: 9vh;
  box-sizing: border-box;
  object-fit: cover;
  max-width: 100%;
}
</style>

