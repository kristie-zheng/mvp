import React from 'react';
import Form1 from './Form1.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    {/*There are {props.items.length} items. */}
    {props.petInfoFields.map((item) => (
      <Form1 petInfoFields={this.props.petInfoFields} />
    ))}
  </div>
);

export default List;
