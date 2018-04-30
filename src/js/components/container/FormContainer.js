import React, { Component } from "react";
import classNames from 'classnames';
import SeatsPlacement from '../presentational/SeatsPlacement';
import BookedInfo from '../presentational/BookedInfo';
import {CONFIRMED_BOOKINGS} from'../../../data';
import './index.scss';



const FORM_VALIDATOR = {
    userName: name => {
        return Boolean(name.trim())? false : '*Please enter your name';
    },
    seatsCount: val => {
        return (val < 1)? 'Please book atleast one seat' : false;
    },
    selectedSeats: (selectedSeats, formData) => {
        return (selectedSeats.length < formData.seatsCount)? `Please select ${formData.seatsCount - selectedSeats.length} more seats` : false;
    }
}

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
        formData: {
            userName: "",
            seatsCount: 1, 
            selectedSeats: [],
        }
    };
  }

  handleConfirmation() {
    let error;
    Object.keys(FORM_VALIDATOR).forEach(field => {
        let currErr = FORM_VALIDATOR[field](this.state.formData[field], this.state.formData);
        error = currErr || error;
    });
    
    if (error) {
        this.setState({
            error
        });
        return;
    }
    let reservedSeatsData = CONFIRMED_BOOKINGS;
    let {userName, seatsCount, selectedSeats} = this.state.formData;
    reservedSeatsData[this.state.formData.userName] = {userName, seatsCount, selectedSeats};
    window.localStorage.setItem('CONFIRMED_BOOKINGS', JSON.stringify(reservedSeatsData));
    window.location.href = window.location.href;    
  }

  handleFormData(field, value) {
    this.setState({
        formData: Object.assign({}, this.state.formData, {[field]: value}),
        error: ""
    });
  }

  handleSeatSelection(index) {
    let {selectedSeats} = this.state.formData;
    let selectedSeatIndex = selectedSeats.indexOf(index);
    if (selectedSeatIndex >=0) {
        selectedSeats.splice(index, 1)  
    } else {
        if(selectedSeats.length == this.state.formData.seatsCount) {
            this.setState({
                error: 'Please increase seats count value to select more seats'
            });
            return;
        }
        selectedSeats.push(index);  
    }
    this.handleFormData('selectedSeats', selectedSeats);
  }


  render() {
    let {userName, seatsCount, selectedSeats} = this.state.formData;
    let {isSelectable} = this.state

    return (
        <div className="app-container">
            <div className="user-info-container">
                <div className="user-info">
                    <label for="userName">Name:</label>
                    <input id="userName" type="text" value={userName} onChange={e => this.handleFormData('userName', e.target.value)}/>
                </div>
                <div className="user-info">
                    <label for="seats-count">Number of Seats:</label>
                    <input id="seats-count" min={selectedSeats.length || 1}  value={seatsCount} onChange={e => this.handleFormData('seatsCount', e.target.value)} type="number" />
                </div>
            </div>
            {isSelectable? "" : <button onClick={() => {this.setState({isSelectable: true})}}>Start Selecting</button>}
            <div className={classNames({error: true, visible: Boolean(this.state.error)})} id="globalError">{this.state.error}</div>
            {isSelectable? <SeatsPlacement onChange={this.handleSeatSelection.bind(this)} selectedSeats={selectedSeats} /> : ""}
            {isSelectable?<button onClick={this.handleConfirmation.bind(this)}>Confirm Selection</button>: ""}
            {(Object.keys(CONFIRMED_BOOKINGS).length > 0)? <BookedInfo /> : ""}
        </div>
    );
  }
}
export default FormContainer;