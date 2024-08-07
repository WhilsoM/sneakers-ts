import { ICartItem } from '@shared/types/ICartItem'
import { Drawer } from '@widgets/drawer/Drawer'
import { Header } from '@widgets/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useState<ICartItem[]>([])

	const handleClick = () => {
		setIsOpen((prev) => !prev)
	}
	return (
		<div className='clear wrapper'>
			{isOpen && (
				<Drawer
					cartItems={cartItems}
					setCartItems={setCartItems}
					closeDrawer={handleClick}
				/>
			)}

			<Header onClickOpen={handleClick} />

			<div>
				<Outlet />
			</div>
		</div>
	)
}
