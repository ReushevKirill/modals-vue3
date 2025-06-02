<template>
	<ModalBaseLayout
		title="Профиль пользователя"
		:show-close-button="true"
		@header-close="onCancel"
	>
		<template #default>
			<div class="user-profile-modal">
				<form @submit.prevent="submitForm">
					<div>
						<label for="name">Имя:</label>
						<input id="name" v-model="formData.name" type="text" >
					</div>
					<div>
						<label for="email">Email:</label>
						<input id="email" v-model="formData.email" type="email" >
					</div>
					<div class="actions">
						<button type="submit">Сохранить</button>
						<button type="button" @click="onCancel">Отмена</button>
					</div>
				</form>
			</div>
		</template>
	</ModalBaseLayout>
</template>

<script setup lang="ts">
	const props = defineProps<{
		preserveStateKey: string
		initialData: object
	}>()

	const emit = defineEmits(['resolve', 'reject'])

	const formData = reactive({
		name: '',
		email: '',
	})

	const { formStateStore } = useModalFormState(formData, props)

	const submitForm = () => {
		console.log('Form submitted:', formData)
		if (props.preserveStateKey) {
			formStateStore.clearState(props.preserveStateKey)
		}
		emit('resolve', { ...formData })
	}

	const onCancel = () => {
		emit('reject', new Error('User cancelled profile edit'))
	}
</script>

<style scoped>
	.user-profile-modal div {
		margin-bottom: 10px;
	}
	label {
		display: inline-block;
		width: 60px;
	}
</style>
