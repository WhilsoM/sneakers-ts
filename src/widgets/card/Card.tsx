import { FC, useState } from 'react'
import ContentLoader from 'react-content-loader'
import s from './Card.module.scss'

interface ICard {
	id: number
	title: string
	price: number
	imgPath: number
	addToCart: (item: {
		id: number
		title: string
		price: number
		imgPath: number
	}) => void
	added: boolean
	loading: boolean
}

export const Card: FC<ICard> = ({
	id,
	title,
	price,
	imgPath,
	addToCart,
	added = false,
	loading = false,
}) => {
	const [isAdded, setIsAdded] = useState(added)
	const [isFavorite, setIsFavorite] = useState(false)

	const onClickCart = () => {
		addToCart({ id, title, price, imgPath })
		setIsAdded((prev) => !prev)
	}

	return (
		<div className={s.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={187}
					viewBox='0 0 150 187'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
					<rect x='0' y='129' rx='3' ry='3' width='93' height='15' />
					<rect x='0' y='165' rx='8' ry='8' width='80' height='24' />
					<rect x='0' y='101' rx='10' ry='10' width='150' height='15' />
					<rect x='118' y='156' rx='8' ry='8' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
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

					<div className='flex justify-between items-center'>
						<div className='flex flex-col'>
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
				</>
			)}
		</div>
	)
}
