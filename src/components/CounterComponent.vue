<script setup lang="ts">
import {ref, computed} from "vue"
const counter = ref(0)

const increment = () => {
    counter.value++
}

const decrement = () => {counter.value--}

const style = computed(() => counter.value > 0 ? "color:lightgreen" : "color:red")

</script>

<template>
    <h1 :style="style">{{ counter }}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
</template>