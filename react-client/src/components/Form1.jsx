import React from 'react';
import FormField from './List.jsx';

const PetInformation = (props) => {
  const petInfoFields = props.petInfoFields;
  return (
    <div>
      <form className="petInfo">
        {petInfoFields.map((field) => (
          <FormField
            title={field}
            handleChange={props.handleChange}
            className={field}
          />
        ))}
      </form>
      <button type="button" className="next" onClick={handleClick}>
        {' '}
        Next{' '}
      </button>
    </div>
  );
};

export default PetInformation;
