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

  handleSignOut() {
    auth.signOut().then(() => {
      this.setState({ currentUser: null });
    }).catch(error => {
      console.error("Error signing out:", error);
    });
  }

  componentDidMount() {
    // Suscribirse a cambios en la autenticación de Firebase
    auth.onAuthStateChanged(user => {
      if (user) {
        // Usuario autenticado
        this.setState({ currentUser: user });
      } else {
        // No hay usuario autenticado
        this.setState({ currentUser: null });
      }
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
            <ul className="navbar-nav mr-auto"> {/* Cambiado de div a ul */}
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Añadir
                </Link>
              </li>
            </ul>
            <div className="navbar-nav ml-auto">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link" onClick={() => this.handleSignOut()}>Cerrar sesión</span>
                  </li>
                  <li className="nav-item">
                    <img src={currentUser.photoURL} alt="Profile" style={{ width: "50px", height: "auto" }} />
                  </li> 
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/signin"} className="nav-link">Iniciar sesión</Link>
                  </li>
                  <li className="nav-item">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" style={{ width: "50px", height: "auto" }} />
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