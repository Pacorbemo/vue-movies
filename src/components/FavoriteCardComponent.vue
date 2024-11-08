<script setup>
import { useFavoriteStore } from '../stores/favorite';
import CardComponent from './CardComponent.vue';

import { defineProps, ref } from 'vue';
const {removeFavorite} = useFavoriteStore();

const props = defineProps({
    title: String,
    year: Number,
    thumbnail: String,
    href: String
});

const movie = {
    title: props.title,
    year: props.year,
    thumbnail: props.thumbnail,
    href: props.href
};

const emit = defineEmits(['deleted']);
const confirm = ref(false)
const deleteMovie = (href) => {
    setTimeout(() => confirm.value = false, 5000)
    if(confirm.value){
        removeFavorite(href)
        emit('deleted', href)
    }else{
        confirm.value = true
    }
}

</script>

<template>
    <div>
        <CardComponent
        :title="movie.title"
        :year="movie.year"
        :thumbnail="movie.thumbnail"
        :href="movie.href"
        ></CardComponent>
        <button 
            @click="deleteMovie(movie.href)" 
            :class="{'red' : confirm}"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2 0A.5.5 0 0 1 8 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
        
    </div>
</template>

<style scoped>
div{
    display: flex;
    align-items: center;
    flex-direction: column;
}
button{
    transition: 0.8s;
}
.red{
    transition: 0.2s;
    background-color: red;
}
</style>
    