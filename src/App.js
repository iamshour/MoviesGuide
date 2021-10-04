import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import './styles/main.scss';
import { GlobalProvider } from './context/GlobalState';

//Comps
import Header from './components/Header';

// Pages
import Movies from './pages/Movies'
import Series from './pages/Series'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import SingleItem from './pages/SingleItem';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/wishlist' component={Wishlist} />
            <Route path='/about' component={About} />
            <Route path='/item/:id' component={SingleItem} />
          </Switch>
        </div>
        <BottomNav />
      </Router>
    </GlobalProvider>
  );
}

export default App;
