import { defineStore } from "pinia";
import { ref } from "vue";
import { Movie } from "../interfaces/MovieInterface";

export const useDataStore = defineStore('data', () => {
    const data = ref<Movie[]>([]);

    return{data}
})
