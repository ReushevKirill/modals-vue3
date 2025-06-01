// stores/modalStore.ts
import { defineStore } from 'pinia'
import { shallowRef, type Component } from 'vue'

export interface ModalState<T = unknown> {
	id: symbol
	component: Component
	props?: Record<string, unknown>
	options?: ModalOptions
	resolvePromise: (value: T | PromiseLike<T>) => void
	rejectPromise: (reason?: unknown) => void
}

export interface ModalOptions {
	closeOnEsc?: boolean
	closeOnClickOutside?: boolean
	preserveStateKey?: string
}

export const useModalStore = defineStore('modal', () => {
	const modals = ref<ModalState[]>([])
	const settings = {
		baseZIndex: 1000,
	}

	const getModalsLength = computed(() => modals.value.length)
	const getLastModal = computed(() => modals.value[getModalsLength.value - 1])

	function getModalById(id: symbol) {
		const idx = modals.value.findIndex(m => m.id === id)
		if (idx !== -1) {
			return {
				instance: modals.value[idx],
				idx,
			}
		}
		return null
	}

	function open<P = unknown, R = unknown>(
		component: Component,
		props?: P,
		options?: ModalOptions
	): Promise<R> {
		return new Promise((resolve, reject) => {
			const modalToOpen: ModalState<R> = {
				id: Symbol('modalId'),
				component: shallowRef(component),
				props: props || {},
				options: {
					closeOnEsc: options?.closeOnEsc ?? true,
					closeOnClickOutside: options?.closeOnClickOutside ?? true,
					...options,
				},
				resolvePromise: resolve,
				rejectPromise: reject,
			}
			modals.value.push(modalToOpen as ModalState)

			if (getModalsLength.value >= 1) {
				document.body.style.overflow = 'hidden'
			}
			console.log(
				'Opened modal (expecting promise):',
				modalToOpen.id,
				component.name || 'AnonymousComponent'
			)
		})
	}

	function close(id: symbol) {
		const modal = getModalById(id)
		if (modal) {
			modals.value.splice(modal.idx, 1)
			console.log('Closed modal in store:', id)
		}
		if (getModalsLength.value === 0) {
			document.body.style.overflow = ''
		}
	}

	function resolveModal<T = unknown>(id: symbol, data: T) {
		const modal = getModalById(id)
		if (modal) {
			modal.instance.resolvePromise(data)
			close(id)
		}
	}

	function rejectModal(id: symbol, reason?: unknown) {
		const modal = getModalById(id)
		if (modal) {
			modal.instance.rejectPromise(reason || new Error('Modal rejected'))
			close(id)
		}
	}

	function closeLast() {
		if (getLastModal.value) {
			rejectModal(getLastModal.value.id, new Error('Modal closed externally'))
		}
	}

	function closeAll() {
		const modalIds = modals.value.map(m => m.id)
		modalIds.forEach(id => {
			rejectModal(id, new Error('All modals closed'))
		})
		console.log('Closed all modals via store')
	}

	return {
		modals,
		open,
		close,
		resolveModal,
		rejectModal,
		closeLast,
		closeAll,
		settings,
		getLastModal,
		getModalsLength
	}
})
