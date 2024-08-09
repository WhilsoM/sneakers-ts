import s from './style/OrdersIsEmpty.module.scss'

export const OrdersIsEmpty = () => {
	return (
		<>
			<div className={s.content}>
				<img
					src='/img/pageOrdersIsEmpty/sad-emoji.svg'
					alt='sad-emoji'
					className={s.sadEmoji}
				/>

				<div className='flex justify-center items-center'>
					<h3>У вас нет заказов</h3>
					<p>
						<span>Вы нищеброд?</span> <span>Оформите хотя бы один заказ.</span>
					</p>

					<button className='greenButton'>
						<img
							src='/img/arrow-back.svg'
							alt='arrow-back'
							className={s.back}
						/>
						Вернуться назад
					</button>
				</div>
			</div>
		</>
	)
}
