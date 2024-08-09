import { Home } from '@pages/home/Home'
import { ICartItem } from '@shared/types/ICartItem'
import { Drawer } from '@widgets/drawer/Drawer'
import { Header } from '@widgets/header/Header'
import { createContext, useState } from 'react'

export const Context = createContext({})

export const Layout = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useState<ICartItem[]>([])

	const handleClick = () => {
		setIsOpen((prev) => !prev)
		document.body.style.overflow = 'auto'
	}

	return (
		<Context.Provider value={{ cartItems }}>
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
					<Home />
				</div>
			</div>
		</Context.Provider>
	)
}
