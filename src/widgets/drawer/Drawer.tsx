import { FC, useContext, useEffect } from 'react'
import { CartItem } from '../cartItem/CartItem'

import { Context } from '@app/layout/Layout'
import { ICartItem } from '@shared/types/IItems'
import axios from 'axios'
import s from './Drawer.module.scss'

interface IDrawer {
	closeDrawer: () => void
}

export const Drawer: FC<IDrawer> = ({ closeDrawer }) => {
	const context = useContext(Context)

	if (!context) {
		throw new Error('Home must be used within a Context.Provider')
	}
	const { setItems, cartItems, setCartItems } = context

	useEffect(() => {
		document.body.style.overflow = 'hidden'

		axios
			.get('https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart')
			.then((res) => setCartItems(res.data))
			.catch((err) => console.error(err))
	}, [])

	const removeItem = async (id: string) => {
		try {
			await axios.delete(
				`https://66b20d1d1ca8ad33d4f651b2.mockapi.io/cart/${id}`
			)
			setCartItems((prev) => prev.filter((item: any) => item.id !== id))

			setItems((prevItems: ICartItem[]) =>
				prevItems.map((item: ICartItem) =>
					item.id === id ? { ...item, added: false } : item
				)
			)
		} catch (error) {
			console.log(error)
		}
	}
	// если удалил товар с корзины то чтобы менялось состояние и в карточке
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
								name={item.name}
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
								<b>
									{cartItems.reduce((acc, item) => {
										return acc + item.price
									}, 0)}{' '}
									руб.
								</b>
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
