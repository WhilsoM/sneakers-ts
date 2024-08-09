import { Home } from '@pages/home/Home'
import { ICartItem } from '@shared/types/ICartItem'
import { IItems } from '@shared/types/IItems'
import { Drawer } from '@widgets/drawer/Drawer'
import { Header } from '@widgets/header/Header'
import { createContext, useState } from 'react'

export const Context = createContext({})

export const Layout = () => {
	const [items, setItems] = useState<IItems[]>([])
	const [cartItems, setCartItems] = useState<ICartItem[]>([])
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen((prev) => !prev)
		document.body.style.overflow = 'auto'
	}

	return (
		<Context.Provider value={{ items, cartItems }}>
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
					<Home
						items={items}
						cartItems={cartItems}
						setItems={setItems}
						setCartItems={setCartItems}
					/>
				</div>
			</div>
		</Context.Provider>
	)
}
