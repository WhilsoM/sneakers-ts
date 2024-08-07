import { FC, useEffect } from 'react'
import { CartItem } from '../cartItem/CartItem'

import { ICartItem } from '@shared/types/ICartItem'
import axios from 'axios'
import s from './Drawer.module.scss'

interface IDrawer {
	cartItems: ICartItem[]
	closeDrawer: () => void
	setCartItems: (res: {}) => void
}

export const Drawer: FC<IDrawer> = ({
	cartItems = [],
	closeDrawer,
	setCartItems,
}) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'

		axios
			.get('https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart')
			.then((res) => setCartItems(res.data))
			.catch((err) => console.error(err))
	}, [])

	const removeItem = (id: string) => {
		axios.delete(`https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart/${id}`)
		setCartItems((prev: []) => prev.filter((item) => item.id !== id))
	}

	return (
		<div className={s.overlay}>
			<div className={s.drawer}>
				<h2 className='flex justify-between mb-6'>
					Корзина
					<img
						onClick={closeDrawer}
						className='cursor-pointer'
						src='/img/removeBtn.svg'
						alt='remove'
					/>
				</h2>

				<div className={`${s.items} flex flex-wrap`}>
					{cartItems.length > 0 ? (
						cartItems.map((item) => (
							<CartItem
								key={item.id}
								title={item.name}
								price={item.price}
								img={item.imgPath}
								removeItem={() => removeItem(String(item.id))}
							/>
						))
					) : (
						<div className={s.cartIsEmpty}>
							<h2>Корзина пустая</h2>
							<p>Добавьте одну пару кроссовок чтобы оформить заказ</p>
						</div>
					)}
				</div>
				{cartItems.length > 0 && (
					<div className={s.cartTotalBlock}>
						<ul>
							<li>
								<span>Итого:</span>
								<div className={s.dash}></div>
								<b>0 руб.</b>
							</li>
							<li>
								<span>Налог 5%:</span>
								<div className={s.dash}></div>
								<b>0 руб.</b>
							</li>
						</ul>
						<button className={`greenButton ${s.greenButton}`}>
							Оформить заказ <img src='/img/arrow.svg' alt='arrow' />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
