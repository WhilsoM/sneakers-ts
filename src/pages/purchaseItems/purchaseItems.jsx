import React from 'react'
import { BackWithText } from '../../components/common/back-with-text/BackWithText'
import { Header } from '../../components/Header/Header'

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
