import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoriteStore = defineStore('favorite', () => {

    const favorites = ref<string[]>([]);
    favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]")

    function addFavorite(href: string){
        favorites.value.push(href)
        localStorage.setItem("favorites", JSON.stringify(favorites.value))
    }

    function removeFavorite(href: string){
        favorites.value = favorites.value.filter( (movie: string) => movie != href)
        localStorage.setItem("favorites", JSON.stringify(favorites.value))
    }

    function toggleFavorite(href: string){
        if (existFavorite(href)) {
            removeFavorite(href);
        } else {
            addFavorite(href);
        }
    }

    function existFavorite(href: string): boolean {
        return favorites.value.includes(href);
    }

    return{favorites, toggleFavorite, existFavorite, removeFavorite}
})