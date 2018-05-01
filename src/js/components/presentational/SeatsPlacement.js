import React, { Component } from "react";
import Seat from './Seat';
import {ROWS, COLUMNS, CONFIRMED_BOOKINGS} from'../../../data';

const RESERVED_SEATS = Object.keys(CONFIRMED_BOOKINGS).reduce((reservedSeats, key) => reservedSeats.concat(CONFIRMED_BOOKINGS[key].selectedSeats), []);

console.log('reserved seats', JSON.stringify(RESERVED_SEATS));

 const getSeatsRow = ({rowIndex, onChange, selectedSeats}) => {
    return COLUMNS.map(colIndex => {
      let index = `${rowIndex}${colIndex}`
      let isReserved = RESERVED_SEATS.includes(index);
      let isSelected = selectedSeats.includes(index);
      return <Seat index={index} isReserved={isReserved} onChange={onChange} isSelected={isSelected} />;
    });    
}

const SeatIndicator = props => {
  return (
    <div className="seat-indicator">
      <Seat {...props}/>
      <label>{props.label}</label>
    </div>
  )
};

export default ({onChange, selectedSeats}) => {
  return (
    <div className="seats-container">
       {ROWS.map(rowIndex => {
           return (
              <div className="row">
                  <div className="col-index">{rowIndex}</div>
                  {getSeatsRow({rowIndex: rowIndex, onChange, selectedSeats})}
            </div>
           );
       })}
       <div className="seat-indicators-container">
          <SeatIndicator isReserved={true} onChange={() => {}} label="Reserved Seat" />
          <SeatIndicator onChange={() => {}} isSelected={true} label="Selected Seat" />
          <SeatIndicator onChange={() => {}} label="Empty Seat" />
       </div>
    </div>
  )
}