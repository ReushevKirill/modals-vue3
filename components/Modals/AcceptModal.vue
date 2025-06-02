<template>
	<div class="confirm-modal">
		<h3>{{ title || 'Принять?' }}</h3>
		<p>{{ message }}</p>
		<div class="actions">
			<button @click="handleConfirm">Да</button>
			<button @click="handleCancel">Нет</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		title: String,
		message: {
			type: String,
			required: true,
		},
	})

	const emit = defineEmits(['resolve', 'reject'])
	const handleConfirm = () => {
		emit('resolve', true)
	}
	const handleCancel = () => {
		emit('reject', false)
	}
</script>

<style scoped>
	.confirm-modal {
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
