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
            birthday: ""
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, street, postalCode, city, birthday } = this.state;
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
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, redireccionar a otra página o mostrar un mensaje de éxito
          })
          .catch(error => {
            console.error("Error creating person:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
          });
      };
    render() {
        const { firstName, lastName, street, postalCode, city, birthday } = this.state;
        return (
          <div>
            <h2>Add Person</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
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
                <label htmlFor="lastName">Last Name</label>
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
                <label htmlFor="street">Street</label>
                <input type="text" className="form-control" id="street" name="street" value={street} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode" value={postalCode} onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" name="city" value={city} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="birthday" value={birthday} onChange={this.handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        );
    }
}