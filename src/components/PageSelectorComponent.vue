<template>
    <h3 style="margin-bottom: 0;" @click="clicked = true">Page: 
        <span v-if="!clicked"
        >{{ page }}</span>
        <input v-else 
            type="text"  
            id="pageInput"
            :value="page"
            @input="inputFunction($event.target.value)" 
            @blur="clicked = false; checkCorrectPage($event.target.value)"
            @keyup.enter="clicked = false"
            ref="autoFocusInput"
        </h3>
    <div>
        <button
            v-for="number in calcPages"
            :key="number"
            @click="page = number"
            :class="focused(number)"
        >{{ number }}</button>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { usePageStore } from '../stores/page';
    import { computed, Ref, ref, watch, nextTick } from 'vue';
    const { page, maxPag } = storeToRefs(usePageStore())

    const clicked = ref(false)

    const focused = ((n: number) => {
        return n == page.value ? 'focused' : '';
    })

    const checkCorrectPage = (value) => {
        if (!Number.isInteger(value) || value < 1) {
            page.value = 1;
            return
        }else if(value > maxPag.value){
            page.value = maxPag.value
            return
        }
    }

    const inputFunction = (value) => {
        const valueInt = parseInt(value)
        if (value != null && valueInt > 0 && valueInt <= maxPag.value ) {
            page.value = parseInt(value)
        } else if (valueInt > maxPag.value){
            page.value = maxPag.value
        }

    }

    const autoFocusInput = ref(null) as Ref<HTMLInputElement | null>;
    watch(clicked, (newVal) => {
      if (newVal) {
        nextTick(() => {
          if (autoFocusInput.value) {
            autoFocusInput.value.focus();
          }
        });
      }
    });

    const calcPages = computed(() => {
        let numbers : number[] = [] 

        if(maxPag.value == 0){
            return
        }else if(maxPag.value < 10){
            for(let i = 1; i <= maxPag.value; i++){
                numbers.push(i)
            }
        }
        else if(page.value >= maxPag.value -5){
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


</script>

<style scoped>
.focused{
    outline: 4px auto -webkit-focus-ring-color;
}
input{
    font-size: 15px;
    width: 20px;
}
</style>
