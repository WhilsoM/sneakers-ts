import { Card } from '@widgets/card/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface IItems {
	id: number
	name: string
	price: number
	imgPath: number
}

type ICartItem = IItems

export const Home = () => {
	const [items, setItems] = useState<IItems[]>([])
	const [cartItems, setCartItems] = useState([])
	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => {
		axios
			.get('https://66b20d1d1ca8ad33d4f651b2.mockapi.io/items')
			.then((res) => setItems(res.data))
			.catch((err) => console.error(err))
	}, [])

	const addToCart = (cartItem: ICartItem) => {
		// filterовать

		axios
			.post<ICartItem>(
				'https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart',
				cartItem
			)
			.then(() => setCartItems((prev) => [...prev, cartItem]))
			.catch((err) => console.error(err))
	}

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const onClearSearchValue = () => {
		setSearchValue('')
	}

	return (
		<>
			<div className='content p-40'>
				<div className='d-flex justify-between align-center mb-40'>
					<h1>
						{searchValue
							? `Поиск по запросу "${searchValue}"`
							: 'Все кроссовки'}
					</h1>

					<div className='search-block d-flex'>
						<img src='/img/search.svg' alt='search' />
						{searchValue && (
							<img
								className='clearInputValue cu-p'
								src='/img/removeBtn.svg'
								alt='remove'
								onClick={onClearSearchValue}
							/>
						)}
						<input
							onChange={onChangeSearchValue}
							value={searchValue}
							type='text'
							placeholder='Поиск...'
							maxLength={40}
						/>
					</div>
				</div>

				<div className='d-flex flex-wrap cards'>
					{items
						.filter((item) =>
							item.name.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((item) => (
							<Card
								key={item.id}
								title={item.name}
								price={item.price}
								imgPath={item.imgPath}
								addToCart={() => addToCart(item)}
							/>
						))}
				</div>
			</div>
		</>
	)
}
