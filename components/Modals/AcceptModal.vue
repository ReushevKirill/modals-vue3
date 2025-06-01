<template>
  <div class="confirm-modal">
    <h3>{{ title || 'Принять?' }}</h3>
    <p>{{ message }}</p>
    <div class="actions">
      <button @click="onConfirm">Да</button>
      <button @click="onCancel">Нет</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  message: {
    type: String,
    required: true,
  },
  // Можно передать коллбэки для действий
  onConfirmCallback: Function,
  onCancelCallback: Function,
});

// Эмитим 'close', чтобы ModalWrapper его поймал и закрыл модалку
const emit = defineEmits(['close']);

const onConfirm = () => {
  if (props.onConfirmCallback) {
    props.onConfirmCallback();
  }
  emit('close'); // Закрываем модалку
};

const onCancel = () => {
  if (props.onCancelCallback) {
    props.onCancelCallback();
  }
  emit('close'); // Закрываем модалку
};
</script>

<style scoped>
.confirm-modal {
  /* Стили для твоей конкретной модалки */
  text-align: center;
}
.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
button {
  padding: 8px 15px;
}
</style>
