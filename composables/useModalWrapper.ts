export const useModalWrapper = (props: {
	modal: ModalState
	zIndex: number
}) => {
	const modalStore = useModalStore()

	const handleResolve = <T = unknown>(data: T) => {
		modalStore.resolveModal(props.modal.id, data)
	}

	const handleReject = <R = unknown>(reason?: R) => {
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

	return {
		modalStore,
		handleEsc,
		handleProgrammaticClose,
		handleReject,
		handleResolve,
		onClickOutside,
	}
}
