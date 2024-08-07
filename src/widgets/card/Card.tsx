import { FC, useState } from 'react'
import s from './Card.module.scss'

interface ICard {
	title: string
	price: number
	imgPath: number
	addToCart: (item: { title: string; price: number; imgPath: number }) => void
}

export const Card: FC<ICard> = ({ title, price, imgPath, addToCart }) => {
	const [isAdded, setIsAdded] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)

	const onClickCart = () => {
		addToCart({ title, price, imgPath })
		setIsAdded((prev) => !prev)
	}

	return (
		<div className={s.card}>
			<div
				className={s.favorite}
				onClick={() => setIsFavorite((prev) => !prev)}
			>
				<img
					src={`/img/${isFavorite ? 'liked' : 'unliked'}.svg`}
					alt='unliked'
				/>
			</div>

			<img
				width={133}
				height={112}
				src={`/img/sneakers/${imgPath}.jpg`}
				alt='sneaker'
			/>

			<h5>{title}</h5>

			<div className='d-flex justify-between align-center'>
				<div className='d-flex flex-column'>
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>

				<button onClick={onClickCart}>
					<img
						width={32}
						height={32}
						src={`/img/${isAdded ? 'btn-checked' : 'btn-plus'}.svg`}
						alt='plus'
					/>
				</button>
			</div>
		</div>
	)
}
