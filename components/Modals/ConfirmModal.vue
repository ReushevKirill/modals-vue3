<template>
	<ModalBaseLayout
		:title="computedTitle"
		:show-close-button="true"
		@header-close="handleCancel"
	>
		<template #default>
			<p>{{ message }}</p>
		</template>

		<template #footer>
			<button class="btn-primary" @click="handleConfirm">ОК</button>
			<button class="btn-secondary" @click="handleCancel">Отмена</button>
		</template>
	</ModalBaseLayout>
</template>

<script setup lang="ts">
	const props = defineProps({
		title: String,
		message: {
			type: String,
			required: true,
		},
	})

	const emit = defineEmits(['resolve', 'reject'])

	const computedTitle = computed(() => props.title || 'Подтверждение')

	const handleConfirm = () => {
		emit('resolve', true)
	}

	const handleCancel = () => {
		emit('reject', new Error('User cancelled confirmation'))
	}
</script>

<style scoped>
	/* Стили для конкретных кнопок или элементов ConfirmModal, если нужно */
	.btn-primary {
		background-color: dodgerblue;
		color: white;
	}
	.btn-secondary {
		background-color: lightgray;
	}
	p {
		text-align: center;
		margin: 20px 0;
	}
</style>
