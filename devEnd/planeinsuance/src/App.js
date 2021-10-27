import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home  from './components/pages/Home';
import AvailableFlights from './components/pages/AvailableFlights';
import { MyFlights } from './components/pages/MyFlights';

function App() {
    return (
    <>
      <Router>
        <NavBar />        
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/AvailableFlights" component={AvailableFlights} />
            <Route exact path="/MyFlights" component={MyFlights} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
