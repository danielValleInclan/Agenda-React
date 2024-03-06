import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AgendaList from './component/agenda-list.component';
import AddPerson from "./component/add-person.component"; // Importa el componente AddPerson
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditPerson from "./component/edit-person.component";
import SignIn from "./component/SignIn";
import { signInWithGoogle, auth } from "./firebase";



class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPerson: null,
      currentUser: null
    };
    this.setCurrentPerson = this.setCurrentPerson.bind(this);
  }

  setCurrentPerson(person) {
    this.setState({
      currentPerson: person
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={"/agenda"} className="navbar-brand">
              Agenda
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Añadir
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <img src={currentUser.photoURL} alt="Profile" style={{ width: "50px", borderRadius: "50%" }} />
                  </li> 
                  <li className="nav-item">
                    <span className="nav-link" onClick={() => this.handleSignOut()}>Cerrar sesión</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/signin"} className="nav-link">Iniciar sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/signup"} className="nav-link">Registrarse</Link>
                  </li>
                </>
              )}
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
            {/*El en switch se renderizarán todas los compoentes cuta URL coicidan con la activa*/}
              <Route exact path={["/", "/agenda"]} render={() => <AgendaList currentPerson={this.state.currentPerson} setCurrentPerson={this.setCurrentPerson} />} />
              <Route exact path="/add" component={AddPerson} />
              <Route exact path="/edit-person/:id" component={EditPerson} />
              <Route exact path="/signin" component={SignIn} />
            {/*  <Route path="/tutorials/:id" component={Tutorial} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;