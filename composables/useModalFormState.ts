import type { Reactive } from 'vue'

export const useModalFormState = <T extends Reactive<object>>(
	formData: T,
	props: {
		preserveStateKey: string
		initialData: T
	}
) => {
	const formStateStore = useModalFormStateStore()

	onMounted(() => {
		if (props.preserveStateKey) {
			const savedState = formStateStore.loadState<T>(props.preserveStateKey)
			if (savedState) {
				Object.assign(formData, savedState)
			} else if (props.initialData) {
				Object.assign(formData, props.initialData)
			}
		} else if (props.initialData) {
			Object.assign(formData, props.initialData)
		}
	})

	onBeforeUnmount(() => {
		if (props.preserveStateKey) {
			formStateStore.saveState(props.preserveStateKey, formData)
		}
	})

	return {
		formStateStore
	}
}
