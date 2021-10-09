import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./styles/main.scss"
import { GlobalProvider } from "./context/GlobalState"

// Pages
import ItemTab from "./pages/ItemTab"
import Favorites from "./pages/Favorites"
import Upcoming from "./pages/Upcoming"
import Layout from "./components/Layout/Layout"

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Layout>
					<div className='container'>
						<Switch>
							<Route exact path='/' component={ItemTab} />
							<Route path='/series' component={ItemTab} />
							<Route path='/upcoming' component={Upcoming} />
							<Route path='/favorites' component={Favorites} />
						</Switch>
					</div>
				</Layout>
			</Router>
		</GlobalProvider>
	)
}

export default App
