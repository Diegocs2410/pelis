import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { MovieList } from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Movie } from './components/Movie';

function App() {
  return (
    <Router>
      <Route path='/description/:id' component={Movie} />
      <Route path='/' exact component={MovieList} />
    </Router>
  );
}

export default App;
