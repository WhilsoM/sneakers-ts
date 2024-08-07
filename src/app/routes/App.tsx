import { Favorites } from '@pages/favorites/Favorites'
import { Home } from '@pages/home/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/favorites' element={<Favorites />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
