import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface IHeader {
	onClickOpen?: () => void
}

export const Header: FC<IHeader> = ({ onClickOpen }) => {
	return (
		<header className='d-flex justify-between align-center p-40'>
			<div className='d-flex align-center'>
				<img width={40} height={40} src='/img/logo.svg' alt='logo' />
				<div>
					<h3 className='text-uppercase'>React Sneakers</h3>
					<p className='opacity-5'>Магазин лучших кроссовок</p>
				</div>
			</div>

			<ul className='d-flex align-center'>
				<li className='mr-30 cu-p' onClick={onClickOpen}>
					<img src='/img/cart.svg' alt='cart' />
					<span>0 руб.</span>
				</li>
				<li className='mr-20 cu-p'>
					<NavLink to='/favorites'>
						<img src='/img/heart.svg' alt='heart' />
						<span>Закладки</span>
					</NavLink>
				</li>
				<li>
					<img src='/img/user.svg' alt='user' />
				</li>
			</ul>
		</header>
	)
}
