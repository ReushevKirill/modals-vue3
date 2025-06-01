<template>
	<Teleport to="body">
		<div
			class="modal-wrapper"
			:style="{ zIndex }"
			role="dialog"
			aria-modal="true"
			@mousedown="onClickOutside"
		>
			<div ref="modalContentRef" class="modal-container" @mousedown.stop>
				<component
					:is="modal.component"
					v-bind="modal.props"
					:modal-id="modal.id"
					@resolve="handleResolve"
					@reject="handleReject"
					@close="handleProgrammaticClose"
				/>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue'
	import { useModalStore, type ModalState } from '~/stores/modalStore'

	const props = defineProps({
		modal: {
			type: Object as PropType<ModalState>,
			required: true,
		},
		zIndex: {
			type: Number,
			required: true,
		},
	})

	const modalStore = useModalStore()

	const handleResolve = (data: unknown) => {
		modalStore.resolveModal(props.modal.id, data)
	}

	const handleReject = (reason?: unknown) => {
		modalStore.rejectModal(
			props.modal.id,
			reason || new Error('Modal action rejected by component')
		)
	}

	const handleProgrammaticClose = () => {
		modalStore.rejectModal(
			props.modal.id,
			new Error('Modal closed by component event')
		)
	}

	const handleEsc = (event: KeyboardEvent) => {
		if (props.modal.options?.closeOnEsc && event.key === 'Escape') {
			const lastModal = modalStore.getLastModal
			if (lastModal && lastModal.id === props.modal.id) {
				console.log(`ESC pressed for modal ${String(props.modal.id)}`)
				modalStore.rejectModal(
					props.modal.id,
					new Error('Modal closed by Escape key')
				)
			}
		}
	}

	const onClickOutside = () => {
		if (props.modal.options?.closeOnClickOutside) {
			const lastModal = modalStore.getLastModal
			if (lastModal && lastModal.id === props.modal.id) {
				console.log(`Clicked outside modal ${String(props.modal.id)}`)
				modalStore.rejectModal(
					props.modal.id,
					new Error('Modal closed by click outside')
				)
			}
		}
	}

	onMounted(() => {
		if (props.modal.options?.closeOnEsc) {
			window.addEventListener('keydown', handleEsc)
		}
	})

	onUnmounted(() => {
		if (props.modal.options?.closeOnEsc) {
			window.removeEventListener('keydown', handleEsc)
		}
	})
</script>

<style scoped>
	/* Стили остаются те же */
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		box-sizing: border-box;
	}

	.modal-container {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		min-width: 300px;
		max-width: 90%;
		max-height: 90vh;
		overflow-y: auto;
	}
</style>
