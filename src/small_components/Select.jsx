import React from 'react';
import './Tooltip.scss';

const Select = ({label, options, onChange, value, tooltip, padding}) => {

  return (
    <div 
      data-tooltip={tooltip} 
      className={tooltip !== "" ? 'input-suffix' : null}
      style={{paddingBottom: `${padding ? '10px' : 0}`, width: "100%"}}
    >
      <label>{label}</label>
      <select 
        className="browser-default custom-select" 
        onChange={onChange}
        style={{
          backgroundColor: "rgb(24, 26, 27)",
          color: "rgb(209, 205, 199)",
          borderColor: "rgb(55, 60, 62)",
          margin: "30px 0 50px 10px"
        }}
        value={value}
      >
        {options.map((option, index) => {
            return <option key={index}>{option}</option>;
        })} 
      </select>
    </div>
  );
}

export default Select;
