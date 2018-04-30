import React, { Component } from "react";
import classNames from 'classnames';

export default props => {
  const {isReserved, index, onChange, isSelected} = props;
  return (
    <div className="seat">
        <input className={classNames({selected: isSelected})} type="checkbox" id={index} disabled={isReserved} onChange={() => {onChange(index)}}/>
        <label for={index || ""}>{index || ""}</label>
    </div>
  )
}