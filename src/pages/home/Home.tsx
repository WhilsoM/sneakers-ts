import { ICartItem, IItems } from '@shared/types/IItems'
import { Card } from '@widgets/card/Card'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

interface IHome {
	items: IItems[]
	cartItems: ICartItem[]
	setItems: (data: {}) => void
	setCartItems: (data: {}) => void
}

export const Home: FC<IHome> = ({
	items,
	cartItems,
	setItems,
	setCartItems,
}) => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchData = async () => {
		const itemsResponse = await axios.get(
			'https://66b20d1d1ca8ad33d4f651b2.mockapi.io/items'
		)

		const cartResponse = await axios.get(
			'https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart'
		)

		setIsLoading(false)

		setItems(itemsResponse.data)
		setCartItems(cartResponse.data)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const addToCart = (cartItem: ICartItem) => {
		try {
			if (cartItems.find((item) => Number(item.id) === Number(cartItem.id))) {
				axios.delete(
					`https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart/${cartItem.id}`
				)
				setCartItems((prev) =>
					prev.filter((item) => Number(item.id) !== Number(cartItem.id))
				)
			} else {
				axios
					.post<ICartItem>(
						'https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart',
						cartItem
					)
					.then(() => setCartItems((prev) => [...prev, cartItem]))
					.catch((err) => console.error('axios error', err))
			}
		} catch (error) {
			console.log('Произошла ошибка', error)
		}
	}

	const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const onClearSearchValue = () => {
		setSearchValue('')
	}

	const renderItems = () => {
		const filteredItems = items.filter((item) =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		)

		return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				{...item}
				isLoading={isLoading}
				added={items.some((obj) => obj.id === item.id)}
				addToCart={() => addToCart(item)}
			/>
		))
	}

	return (
		<>
			<div className='content p-7'>
				<div className='flex justify-between items-center mb-10'>
					<h1>
						{searchValue
							? `Поиск по запросу "${searchValue}"`
							: 'Все кроссовки'}
					</h1>

					<div className='search-block flex'>
						<img src='/img/search.svg' alt='search' />
						{searchValue && (
							<img
								className='clearInputValue cursor-pointer'
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

				<div className='flex flex-wrap cards'>{renderItems()}</div>
			</div>
		</>
	)
}
