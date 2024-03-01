import React, { Component } from "react";
import AgendaDataService from "../services/agenda.service";
import { Link, BrowserRouter as Router } from "react-router-dom"; 

export default class AddPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            street: "",
            postalCode: "",
            city: "",
            birthday: "",
            showSuccessMessage: false,
            showErrorMessage: false,
            currentDate: new Date().toISOString().split('T')[0]
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, street, postalCode, city, birthday, currentDate } = this.state;

        if (isNaN(postalCode)) {
          alert("El código postal debe ser un número")
          return;
        } else if (postalCode.length <= 0 || postalCode.length > 5) {
          alert("Número de cifras incorrectas en el código postal")
          return;
        }

        if (birthday > currentDate){
          alert("Fecha inválida")
          return;
        }

        const data = {
          firstName: firstName,
          lastName: lastName,
          street: street,
          postalCode: postalCode,
          city: city,
          birthday: birthday
        };
      
        AgendaDataService.create(data)
          .then(response => {
            console.log(response.data);
            this.setState({showSuccessMessage: true});
            setTimeout(() => {
              this.setState({showSuccessMessage: false})
            }, 3000)
            this.resetForm();
          })
          .catch(error => {
            console.error("Error creating person:", error);
            this.setState({showErrorMessage: true});
            setTimeout(() =>{
              this.setState({showErrorMessage: false})
            }, 3000)
            
          });
      };

      resetForm = () => {
        this.setState({
            firstName: "",
            lastName: "",
            street: "",
            postalCode: "",
            city: "",
            birthday: ""
        });
      };

    render() {
        const { firstName, lastName, street, postalCode, city, birthday, showSuccessMessage, showErrorMessage } = this.state;
        return (
          <div>
            <h2>Add Person</h2>
            {showSuccessMessage && <div className="alert alert-success">Persona añadida con exito!</div>} {/* Mostrar el mensaje de éxito si showSuccessMessage es true */}
            {showErrorMessage && <div className="alert alert-error">Error al añadir a la persona!!</div>}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  name="firstName" 
                  value={firstName} 
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellido/s</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  name="lastName" 
                  value={lastName} 
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Calle</label>
                <input type="text" className="form-control" id="street" name="street" value={street} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Código Postal</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode" value={postalCode} onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input type="text" className="form-control" id="city" name="city" value={city} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="birthday" value={birthday} onChange={this.handleInputChange}
                />
              </div>
              <br/>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
                <Link to={"/agenda"} className="btn btn-primary ">
                  Cancelar
                </Link>
              </div>  
            </form>
          </div>
        );
    }
}