import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { BrowserRouter as Router, Link} from "react-router-dom"; 


export default class AgendaList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrievePersons = this.retrievePersons.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePerson = this.setActivePerson.bind(this);
        this.removeAllPersons = this.removeAllPersons.bind(this);
        this.searchName = this.searchName.bind(this);
        this.removePerson = this.removePerson.bind(this);

        this.state = {
            persons: [],
            currentPerson: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrievePersons();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrievePersons() {
        AgendaDataService.getAll()
            .then(response => {
            this.setState({
                persons: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    }

    refreshList() {
        this.retrievePersons();
        this.setState({
            currentPerson: null,
            currentIndex: -1
        });
    }

    setActivePerson(person, index) {
      this.props.setCurrentPerson(person); // Llama al método para actualizar el estado en App
      this.setState({
        currentPerson: person,
        currentIndex: index
      });
    }
    
    removeAllPersons() {
        AgendaDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    }

    removePerson() {
      const {currentIndex, persons} = this.state;

      if (currentIndex !== -1) {
        const personId = persons[currentIndex].id;

        
        AgendaDataService.delete(personId)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      }
    }

    searchName() {
        AgendaDataService.findByName(this.state.searchName)
          .then(response => {
            this.setState({
              person: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        const { searchName, persons, currentPerson, currentIndex } = this.state;
        const progressBarStyle = {
          width: `${(persons.length / 50) * 100}%`
        }
        //ponemos los distintos elementos del estado en variables para simplificar su acceso dentro del método
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={this.onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Persons List</h4>
    
              <ul className="list-group">
                {/*El operedor && lógico. Los dos elementos tienen que ser true, en este caso no vacio, para que se ejecute la sentencia */}
                {/*si tutorials está vacio , no se ejecuta el map*/}
    
                {persons &&
                  persons.map((person, index) => (
                    <li
                  /* Cambiamos la clase del elemento de la lista seleccionado. Ponemos fondo azul*/
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActivePerson(person, index)}
                      key={index}
                    >
                      {person.firstName + " " + person.lastName}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllPersons}
              >
                Remove All
              </button>

              <button
              className="m-3 btn btn-sm btn-danger"
              onClick={() => this.removePerson()}
              >
                Remove Selected
              </button>
              <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={progressBarStyle}
                    aria-valuenow={(persons.length / 50) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100">
                    {persons.length}/50
                  </div>
              </div>
            </div>
            <div className="col-md-6">
              {/*Renderizado condicional. Si current tutorial el null se dibuja lo de abajo. Si no,*/}
              {/*se dibuja "Please click on a Tutorial..." ver más abajo.*/}
              {currentPerson ? (
                <div>
                  <h4>Person</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPerson.firstName}
                    <br/>
                    <label>
                      <strong>LastName:</strong>
                    </label>{" "}
                    {currentPerson.lastName}
                    <br/>
                    <label>
                      <strong>Street:</strong>
                    </label>{" "}
                    {currentPerson.street}
                    <br/>
                    <label>
                      <strong>PostalCode:</strong>
                    </label>{" "}
                    {currentPerson.postalCode}
                    <br/>
                    <label>
                      <strong>City:</strong>
                    </label>{" "}
                    {currentPerson.city}
                    <br/>
                    <label>
                      <strong>Birthday:</strong>
                    </label>{" "}
                    {currentPerson.birthday}
                  </div>
                    {currentPerson && (
                      <Link
                      to={"/edit-person/" + (currentPerson ? currentPerson.id : '')}
                      className="btn btn-sm btn-custom"
                    >
                      Edit Person
                    </Link>
                    )}
                  </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Person...</p>
                </div>
              )}
            </div>
          </div>
        );
      }


}