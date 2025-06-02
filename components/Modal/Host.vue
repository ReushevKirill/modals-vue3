<template>
	<div class="modal-host-container">
		<Teleport to="body">
			<TransitionGroup name="modal-fade" tag="div">
				<ModalWrapper
					v-for="(modalItem, idx) in modalStore.modals"
					:key="modalItem.id"
					:modal="modalItem"
					:z-index="modalStore.settings.baseZIndex + idx"
				/>
			</TransitionGroup>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
	import { useModalStore } from '~/stores/modalStore'
	const modalStore = useModalStore()
</script>

<style>
	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.15s ease;
	}
	.modal-fade-enter-active .modal-container,
	.modal-fade-leave-active .modal-container {
		transition: transform 0.15s ease;
	}

	.modal-fade-enter-from,
	.modal-fade-leave-to {
		opacity: 0;
	}
	.modal-fade-enter-from .modal-container,
	.modal-fade-leave-to .modal-container {
		transform: scale(0.9);
	}

	.modal-fade-move {
		transition: transform 0.15s ease;
	}
</style>
