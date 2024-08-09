import { FC } from 'react'
import s from './styles/CartItem.module.scss'

interface ICartItem {
	title: string
	price: number
	img: number
	removeItem: () => void
}

export const CartItem: FC<ICartItem> = ({ title, price, img, removeItem }) => {
	return (
		<div className={`${s.cartItem} flex`}>
			<img
				className={s.sneaker}
				width={70}
				height={70}
				src={`/img/sneakers/${img}.jpg`}
				alt='Sneakers'
			/>

			<div className='cartItemImg'></div>

			<div className='mr-5'>
				<p>{title}</p>
				<b>{price} руб.</b>
			</div>

			<div>
				<img
					onClick={removeItem}
					className={`${s.removeItem} cursor-pointer`}
					width={56}
					height={56}
					src='/img/removeBtn.svg'
					alt='remove'
				/>
			</div>
		</div>
	)
}
