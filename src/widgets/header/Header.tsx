import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './styles/Header.module.scss'

interface IHeader {
	onClickOpen?: () => void
}

export const Header: FC<IHeader> = ({ onClickOpen }) => {
	return (
		<header className='flex justify-between p-5'>
			<div className='flex items-center'>
				<img width={40} height={40} src='/img/logo.svg' alt='logo' />
				<div>
					<h3 className={s.title}>React Sneakers</h3>
					<p className='opacity-50'>Магазин лучших кроссовок</p>
				</div>
			</div>

			<ul className='flex items-center'>
				<li className='mr-7 cursor-pointer flex' onClick={onClickOpen}>
					<img src='/img/cart.svg' alt='cart' />
					<span>0 руб.</span>
				</li>
				<li className='mr-5 cursor-pointer'>
					<NavLink to='/favorites' className='flex'>
						<img src='/img/heart.svg' alt='heart' />
						<span>Закладки</span>
					</NavLink>
				</li>
			</ul>
		</header>
	)
}
