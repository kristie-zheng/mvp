import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPage: 'petinfo',
//       petInfoFields: [
//         'Name',
//         'Gender',
//         'Birthdate',
//         'Species',
//         'Breed + Color',
//         'Weight',
//         'Microchip ID',
//       ],
//       vaccinationFields: ['Name', 'Frequency', 'Last Given'],
//       medicationFields: ['Name', 'Use', 'Dosage', 'Frequency'],
//     };
//   }

//   componentDidMount() {
//     $.ajax({
//       url: '/items',
//       success: (data) => {
//         this.setState({
//           items: data,
//         });
//       },
//       error: (err) => {
//         console.log('err', err);
//       },
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Item List</h1>
//         <List petInfoFields={this.state.petInfoFields} />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'petInfo',
      petInfoFields: [
        'Name',
        'Gender',
        'Birthdate',
        'Species',
        'Breed + Color',
        'Weight',
        'Microchip ID',
      ],
      vaccinationFields: ['Name', 'Frequency', 'Last Given'],
      medicationFields: ['Name', 'Use', 'Dosage', 'Frequency'],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    if (this.state.currentPage === 'petInfo') {
      this.setState({ currentPage: 'vaccineInfo' }, function() {
        console.log(this.state);
      });
    } else if (this.state.currentPage === 'vaccineInfo') {
      this.setState({ currentPage: 'medicationInfo' }, function() {
        console.log(this.state);
      });
    } else if (this.state.currentPage === 'medicationInfo') {
      this.setState({ currentPage: 'displayAll' }, function() {
        console.log(this.state);
      });
    }

    $.ajax({
      url: '/',
      method: 'POST',
      data: JSON.stringify({ test: 'data' }),
      success: function(data) {
        console.log('here is data return from server', data);
      },
      error: function(error) {
        console.log('error', error);
      },
    });
  }

  handleChange(event) {
    var key = event.target.className;
    console.log(this.state.accountInfoFields.includes(key));
    if (this.state.accountInfoFields.includes(key)) {
      this.setState(
        { petInfo: { [event.target.className]: event.target.value } },
        function() {
          console.log(this.state);
        },
      );
      // {[event.target.className]: event.target.value}
    } else if (this.state.shippingInfoFields.includes(key)) {
      this.setState(
        { vaccineInfo: { [event.target.className]: event.target.value } },
        function() {
          console.log(this.state);
        },
      );
    } else if (this.state.paymentInfoFields.includes(key)) {
      this.setState(
        { medicationInfo: { [event.target.className]: event.target.value } },
        function() {
          console.log(this.state);
        },
      );
    }
  }

  handlePurchase(event) {
    //submit a get request to server
    //retrieve the database data (use query)
    //render it on the dom
    console.log('hi');
    $.ajax({
      url: '/',
      method: 'GET',
      data: 'useremail',
      success: function(data) {
        console.log('here is data returned from serer', data);
      },
      error: function(error) {
        console.log('error of get req', error);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>PetInfo</h1>
        <DisplayedForm
          handleClick={this.handleClick}
          handlePurchase={this.handlePurchase}
          currentPage={this.state.currentPage}
          petInfoFields={this.state.petInfoFields}
          vaccinationFields={this.state.vaccinationFields}
          medicationFields={this.state.medicationFields}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

//each form field
var FormField = (props) => {
  var handleChange = props.handleChange;
  return (
    <div>
      <span>{props.title}</span>
      <input type="text" className={props.className} onChange={handleChange} />
      <br />
    </div>
  );
};

//form1 (petInfo) component
var PetInformation = (props) => {
  var handleClick = props.handleClick;
  var petInfoFields = props.petInfoFields; //this is an array of titles
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

var VaccineInformation = (props) => {
  var handleClick = props.handleClick;
  var vaccinationFields = props.vaccinationFields;
  return (
    //insert form fields here
    <div>
      <form className="vaccinationInfo">
        {vaccinationFields.map((field) => (
          <FormField title={field} handleChange={props.handleChange} />
        ))}
      </form>
      <button type="button" className="next" onClick={handleClick}>
        {' '}
        Next{' '}
      </button>
    </div>
  );
};

var MedicineInformation = (props) => {
  var handleClick = props.handleClick;
  var medicationFields = props.medicationFields;
  return (
    <div>
      <form className="medicationInfo">
        {edicationFields.map((field) => (
          <FormField title={field} handleChange={props.handleChange} />
        ))}
      </form>
      <button type="button" className="submit" onClick={handleClick}>
        {' '}
        Submit{' '}
      </button>
    </div>
  );
};

// var Confirmation = (props) => {
//   var handlePurchase = props.handlePurchase;
//   return (
//     <div>
//       <p>Confirmation</p>
//       <button type="button" className="purchase" onClick={handlePurchase}>
//         {' '}
//         Purchase{' '}
//       </button>
//     </div>
//   );
// };

var DisplayedForm = (props) => {
  var pageToDisplay = props.currentPage;
  if (props.currentPage === 'petInfo') {
    return (
      <PetInformation
        petInfoFields={props.petInfoFields}
        handleClick={props.handleClick}
        handleChange={props.handleChange}
      />
    );
  } else if (props.currentPage === 'vaccinationInfo') {
    return (
      <VaccineInformation
        vaccinationFields={props.vaccinationFields}
        handleClick={props.handleClick}
        handleChange={props.handleChange}
      />
    );
  } else if (props.currentPage === 'medicationInfo') {
    return (
      <MedicineInformation
        medicationFields={props.medicationFields}
        handleClick={props.handleClick}
        handleChange={props.handleChange}
      />
    );
  } else if (props.currentPage === 'confirmation') {
    return <Confirmation handlePurchase={props.handlePurchase} />;
  }
};

window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
