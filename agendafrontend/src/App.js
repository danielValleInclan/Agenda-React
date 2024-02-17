import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AgendaList from './component/agenda-list.component';
import AddPerson from "./component/add-person.component"; // Importa el componente AddPerson
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditPerson from "./component/edit-person.component";


class App extends Component{
  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={"/agenda"} className="navbar-brand">
              Agenda
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/agenda"} className="nav-link">
                  Agenda
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
            {/*El en switch se renderizarán todas los compoentes cuta URL coicidan con la activa*/}
              <Route exact path={["/", "/agenda"]} component={AgendaList} />
            <Route exact path="/add" component={AddPerson} />
            <Route exact path="/edit-person/:id" component={EditPerson} />
            {/*  <Route path="/tutorials/:id" component={Tutorial} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/