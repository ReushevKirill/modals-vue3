<template>
	<div class="base-modal-layout">
		<div class="modal-header">
			<slot name="header">
				<!-- Дефолтный хедер, если слот не предоставлен -->
				<h3 v-if="title">{{ title }}</h3>
				<button
					v-if="showCloseButton"
					class="close-button"
					aria-label="Закрыть"
					@click="onClose"
				>
					×
				</button>
			</slot>
		</div>

		<div class="modal-body">
			<slot>
				<!-- Дефолтный слот для основного контента -->
				<p>Содержимое модалки...</p>
			</slot>
		</div>

		<div class="modal-footer">
			<slot name="footer">
				<!-- Дефолтный футер, если слот не предоставлен (может быть пустым) -->
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		title: String,
		showCloseButton: {
			type: Boolean,
			default: true,
		},
	})

	const emit = defineEmits(['close', 'header-close']) // 'header-close' - если нужна спец. обработка

	const onClose = () => {
		emit('header-close')
	}
</script>

<style scoped>
	.base-modal-layout {
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 15px;
		border-bottom: 1px solid #eee;
		/* Стили для хедера */
	}
	.modal-header h3 {
		margin: 0;
		font-size: 1.2em;
	}
	.close-button {
		background: none;
		border: none;
		font-size: 1.5em;
		cursor: pointer;
		padding: 0 5px;
	}

	.modal-body {
		padding: 15px;
		flex-grow: 1; /* Тело модалки будет занимать доступное пространство */
		overflow-y: auto; /* Если контент большой */
	}

	.modal-footer {
		padding: 10px 15px;
		border-top: 1px solid #eee;
		text-align: right; /* или flex для расположения кнопок */
		/* Стили для футера */
	}
	.modal-footer button {
		margin-left: 10px;
	}
</style>
