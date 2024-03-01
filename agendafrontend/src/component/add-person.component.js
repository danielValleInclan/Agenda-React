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
            showErrorMessage: false
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
            {showSuccessMessage && <div className="alert alert-success">Person added successfully!</div>} {/* Mostrar el mensaje de éxito si showSuccessMessage es true */}
            {showErrorMessage && <div className="alert alert-error">Error adding person!!</div>}
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