<template>
	<div>
		<button @click="askForConfirmation">Удалить пост (с подтверждением)</button>
		<button @click="askForAccept">Принять</button>
	</div>
</template>

<script setup lang="ts">
	import ConfirmModal from '~/components/Modals/ConfirmModal.vue'
	import AcceptModal from '~/components/Modals/AcceptModal.vue'
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

	const askForAccept = async () => {
		try {
			const result = await modalStore.open<
				GetComponentPropsType<typeof AcceptModal>,
				boolean
			>(AcceptModal, {
				title: 'Серьезно?',
				message: 'Точно принять? Вернуть будет нельзя!',
			})

			if (result === true) {
				console.log('Пользователь подтвердил!')
			}
		} catch (error) {
			if (error instanceof Error) {
				console.warn('Действие отменено или модалка закрыта:', error.message)
			} else {
				console.warn('Действие отменено или модалка закрыта:', error)
			}
		}
	}

	onMounted(() => {
		askForConfirmation()
		askForAccept()
	})
</script>
