import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './style/BackWithText.module.scss'

interface IBackWithText {
	title: string
}

export const BackWithText: FC<IBackWithText> = ({ title }) => {
	return (
		<div className='flex items-center'>
			<Link to='/'>
				<img src='/img/back.svg' alt='back' className={`${s.back} mr-5`} />
			</Link>
			<h2 className={s.myPurchaseTitle}>{title}</h2>
		</div>
	)
}
