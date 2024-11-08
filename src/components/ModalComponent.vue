<script setup>
const props = defineProps({
  show: Boolean,
  message: String
});

const emit = defineEmits(['close', 'confirm']);
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>
      <button @click="$emit('confirm')">Confirmar</button>
      <button @click="$emit('close')">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>