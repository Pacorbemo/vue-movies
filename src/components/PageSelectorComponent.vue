<template>
    <div>
        <button
            v-for="number in calcPages"
            :key="number"
            @click="buttonAction(number)"
            :class="focused(number)"
        >{{ number }}</button>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { usePageStore } from '../stores/page';
    import { computed } from 'vue';
    const { page, maxPag } = storeToRefs(usePageStore())
    const { changePage } = usePageStore()

    const focused = ((n: number) => {
        return n == page.value ? 'focused' : '';
    })

    const calcPages = computed(() => {
        let numbers = []

        if(page.value >= maxPag.value -5){
            for(let i = maxPag.value - 8; i <= maxPag.value; i++){
                numbers.push(i)
            }
        }
        else if(page.value > 4){
            for(let i = page.value - 3; i < page.value - 3 + 9; i++){
                numbers.push(i)
            }
        }else{
            for(let i = 1; i < 10; i++){
                numbers.push(i)
            }
        }

        return numbers  
    }) 

    const buttonAction = (number: number) => {
        page.value = number
        changePage()
    }

</script>

<style scoped>
.focused{
    outline: 4px auto -webkit-focus-ring-color;
}
</style>
