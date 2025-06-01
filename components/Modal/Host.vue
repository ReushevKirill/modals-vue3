<template>
  <div class="modal-host-container">
    <template v-if="modalStore.getModalsLength > 0">
      <ModalWrapper
        v-for="(modalItem, idx) in modalStore.modals"
        :key="modalItem.id"
        :modal="modalItem"
        :z-index="modalStore.settings.baseZIndex + idx"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '~/stores/modalStore';
const modalStore = useModalStore();
</script>
