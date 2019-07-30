import React from 'react';
import Select from 'react-select';

const Dropdown = ({ placeholder, data, labelKey, valueKey, clearable,
    selectedValue, onValueChange }) => {
    return (
        <div>
            <Select
                placeholder={placeholder} options={data}
                labelKey={labelKey}
                valueKey={valueKey} autofocus clearable={clearable}
                // disabled={disabled} 
                value={selectedValue}
                onChange={onValueChange} />
        </div>
    )
}

export default Dropdown