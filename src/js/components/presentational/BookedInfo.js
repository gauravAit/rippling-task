import React, { Component } from "react";
import classNames from 'classnames';
import {CONFIRMED_BOOKINGS} from'../../../data';

const getBookedRow = booking => {
    return (
        <tr>
            <td>{booking.userName}</td>
            <td>{booking.seatsCount}</td>
            <td>{booking.selectedSeats.join(', ')}</td>
        </tr>
    )
};

export default props => {
  return (
    <div className="booked-info">
        <table>
            <caption>Already Booked Seats Info.</caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">No. Of Seats</th>
                    <th scope="col">Seats</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(CONFIRMED_BOOKINGS).map(booking => getBookedRow(CONFIRMED_BOOKINGS[booking]))}
            </tbody>
        </table>
    </div>
  )
}