<template>
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
</template>

<script setup lang="ts">
	import type { ModalState } from '~/stores/modalStore'

	const props = defineProps<{
		modal: ModalState
		zIndex: number
	}>()

	const {
		handleProgrammaticClose,
		handleReject,
		handleResolve,
		onClickOutside,
	} = useModalWrapper(props)
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
