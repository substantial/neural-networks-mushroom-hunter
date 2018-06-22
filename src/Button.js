import React, { Component } from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

function Button(props) {
  return(
      <div className="Button">{props.children}</div>
  );
}
export default Button;

