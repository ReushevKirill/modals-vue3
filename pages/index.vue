<template>
	<button @click="askForConfirmation">Удалить пост (с подтверждением)</button>
</template>

<script setup lang="ts">
	import ConfirmModal from '~/components/Modals/ConfirmModal.vue'
	import type { GetComponentPropsType } from '~/app/types/utility'

	const modalStore = useModalStore()

	const askForConfirmation = async () => {
		try {
			const result = await modalStore.open<
				GetComponentPropsType<typeof ConfirmModal>,
				boolean
			>(ConfirmModal, {
				title: 'Серьезно?',
				message: 'Точно удалить этот пост? Вернуть будет нельзя!',
			})

			if (result === true) {
				console.log('Пользователь подтвердил! Удаляем пост...')
			}
		} catch (error) {
			if (error instanceof Error) {
				console.warn('Действие отменено или модалка закрыта:', error.message)
			} else {
				console.warn('Действие отменено или модалка закрыта:', error)
			}
		}
	}
</script>
