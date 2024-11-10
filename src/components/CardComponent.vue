<script setup>
    import { useRouter } from 'vue-router';
    defineProps(["title", "year", "thumbnail", "href"])

    const router = useRouter()

    const push = (where) =>{
        router.push(`/${where}`)
    }
</script>

<template>
    <div class="card">
        <h1>{{title}}</h1>
        <h2>{{ year }}</h2>
        <img v-if="thumbnail" @click="push(href)" :src="thumbnail" class="clickableImg">
        <img v-else src="../assets/notFound.jpg" @click="push(href)">
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    padding: 1em;
}

h1 {
    font-size: 4vh;
    max-width: 100%;
    word-wrap: break-word;
    text-align: center;
    margin-bottom: 0.5vw;
    box-sizing: border-box;
}

h2{
    margin: 0.5vw
}

img{
    height: 40vh;
    box-sizing: border-box;
    object-fit: cover;
    max-width: 100%;
}


</style>
