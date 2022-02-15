import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { GlobalProvider } from "context/GlobalState"

// Pages
import Movies from "pages/movies"
import Series from "pages/series"
import Favorites from "pages/favorites"
import Actors from "pages/actors"
import Layout from "components/layout"

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
