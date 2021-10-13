import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from "./context/GlobalState"

// Pages
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Favorites from "./pages/Favorites"
import Actors from "./pages/Actors"
import Layout from "./components/Layout/Layout"

function App() {
	return (
		<GlobalProvider>
			<Router>
				<Layout>
					<div className='container'>
						<Switch>
							<Route exact path='/' component={Movies} />
							<Route path='/series' component={Series} />
							<Route path='/actors' component={Actors} />
							<Route path='/favorites' component={Favorites} />
						</Switch>
					</div>
				</Layout>
			</Router>
		</GlobalProvider>
	)
}

export default App
