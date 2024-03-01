import React, { Component } from "react";
import AgendaService from "../services/agenda.service";

export default class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        firstName: "",
        lastName: "",
        street: "",
        postalCode: "",
        city: "",
        birthday: "",
        currentDate: new Date().toISOString().split('T')[0]
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // Obtener el ID de los parámetros de la URL
    AgendaService.get(id)
    .then(response => {
        const { id, firstName, lastName, street, postalCode, city, birthday } = response.data;
        this.setState({
            id,
            firstName,
            lastName,
            street,
            postalCode,
            city,
          birthday
        });
      })
      .catch(error => {
      console.error("Error fetching person:", error);
    });
  }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { id, firstName, lastName, street, postalCode, city, birthday, currentDate } = this.state;

        if (isNaN(postalCode)) {
          alert("The postal code must be a number")
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
            id: id,
            firstName: firstName,
            lastName: lastName,
            street: street,
            postalCode: postalCode,
            city: city,
            birthday: birthday
        };
      
        AgendaService.update(id, data)
          .then(response => {
            console.log(response.data);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, redireccionar a otra página o mostrar un mensaje de éxito
          })
          .catch(error => {
            console.error("Error updating person:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
          });
    };

    render() {
        const { firstName, lastName, street, postalCode, city, birthday } = this.state;
        return (
          <div>
            <h2>Edit Person</h2>
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
              {/* Otros campos de formulario similares para los datos de la persona */}
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