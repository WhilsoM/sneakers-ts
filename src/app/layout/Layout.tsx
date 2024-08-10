import { ICartItem } from '@shared/types/ICartItem'
import { IItems } from '@shared/types/IItems'
import { Drawer } from '@widgets/drawer/Drawer'
import { Header } from '@widgets/header/Header'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Outlet } from 'react-router-dom'

interface IContextValue {
	items: IItems[]
	setItems: Dispatch<SetStateAction<IItems[]>>
	cartItems: ICartItem[]
	setCartItems: Dispatch<SetStateAction<ICartItem[]>>
}

export const Context = createContext<IContextValue | undefined>(undefined)

export const Layout = () => {
	const [items, setItems] = useState<IItems[]>([])
	const [cartItems, setCartItems] = useState<ICartItem[]>([])
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen((prev) => !prev)
		document.body.style.overflow = 'auto'
	}

	return (
		<Context.Provider value={{ items, setItems, cartItems, setCartItems }}>
			<div className='clear wrapper'>
				{isOpen && <Drawer closeDrawer={handleClick} />}

				<Header onClickOpen={handleClick} />

				<div>
					<Outlet />
				</div>
			</div>
		</Context.Provider>
	)
}
