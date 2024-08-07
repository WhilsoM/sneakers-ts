import { FC } from 'react'

interface ICartItem {
	title: string
	price: number
	img: number
	removeItem: () => void
}

export const CartItem: FC<ICartItem> = ({ title, price, img, removeItem }) => {
	return (
		<div className='cartItem d-flex'>
			<img
				className='sneaker'
				width={70}
				height={70}
				src={`/img/sneakers/${img}.jpg`}
				alt='Sneakers'
			/>

			<div className='cartItemImg'></div>

			<div className='mr-20'>
				<p>{title}</p>
				<b>{price} руб.</b>
			</div>

			<div>
				<img
					onClick={removeItem}
					className='removeItem cu-p'
					src='/img/removeBtn.svg'
					alt='remove'
				/>
			</div>
		</div>
	)
}
