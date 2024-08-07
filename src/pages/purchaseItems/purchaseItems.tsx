import { BackWithText } from '@widgets/back-with-text/BackWithText'
import { Header } from '@widgets/header/Header'

export const purchaseItems = () => {
	return (
		<>
			<Header />

			<div className='content p-40'>
				<BackWithText title='Мои покупки' />
			</div>
		</>
	)
}
