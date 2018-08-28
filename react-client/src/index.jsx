import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FlipCard from 'react-flipcard';
import styled from 'styled-components';

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
    this.showAllPets = this.showAllPets.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // renders the next form when submit button is clicked
  handleClick(event) {
    if (this.state.currentPage === 'petInfo') {
      this.setState({ currentPage: 'vaccinationInfo' }, () => {
        console.log(this.state);
      });
      $.ajax({
        url: '/',
        method: 'POST',
        data: { petInfo: this.state.petInfo },
        success: function(data) {
          console.log('here is data returned from server', data);
        },
        error: function(error) {
          console.log('error running the post request', error);
        },
      });
    } else if (this.state.currentPage === 'vaccinationInfo') {
      this.setState({ currentPage: 'medicationInfo' }, () => {
        console.log(this.state);
      });
    } else if (this.state.currentPage === 'medicationInfo') {
      this.setState({ currentPage: 'displayAll' }, () => {
        console.log(this.state);
      });
    }

    // $.ajax({
    //   url: '/',
    //   method: 'POST',
    //   data: JSON.stringify({ test: 'data' }),
    //   success: function(data) {
    //     console.log('here is data return from server', data);
    //   },
    //   error: function(error) {
    //     console.log('error', error);
    //   },
    // });
  }

  handleChange(event) {
    const key = event.target.className;
    const name = event.target.name;
    console.log('value', event.target.value)
    console.log(this.state.petInfoFields.includes(key));
    let newStateProp = 'myProp' + key;
    console.log('nsp', newStateProp)
    if (this.state.petInfoFields.includes(key)) {
      this.setState(
        // { petInfo: { [event.target.className]: event.target.value } },
        newStateProp: 'what',
        function() {
          console.log('state is', this.state);
        },
      );
      // {[event.target.className]: event.target.value}
    } else if (this.state.vaccinationFields.includes(key)) {
      this.setState(
        { vaccinationInfo: { [event.target.className]: event.target.value } },
        function() {
          console.log(this.state);
        },
      );
    } else if (this.state.medicationFields.includes(key)) {
      this.setState(
        { medicationInfo: { [event.target.className]: event.target.value } },
        function() {
          console.log(this.state);
        },
      );
    }
  }

  showAllPets(event) {
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
          showAllPets={this.handlePurchase}
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

const PetCard = styled.span`
  border: 1px solid gray;
  padding: 10px
  display: block;
  width: 210px
`;

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
            name={field}
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

// form2 (vaccineInfo)
var VaccineInformation = (props) => {
  var handleClick = props.handleClick;
  var vaccinationFields = props.vaccinationFields;
  return (
    //insert form fields here
    <div>
      <form className="vaccinationInfo">
        {vaccinationFields.map((field) => (
          <FormField
            title={field}
            handleChange={props.handleChange}
            name={field}
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

//form3 medication info
var MedicineInformation = (props) => {
  var handleClick = props.handleClick;
  var medicationFields = props.medicationFields;
  return (
    <div>
      <form className="medicationInfo">
        {medicationFields.map((field) => (
          <FormField
            title={field}
            handleChange={props.handleChange}
            name={field}
          />
        ))}
      </form>
      <button type="button" className="submit" onClick={handleClick}>
        {' '}
        Submit{' '}
      </button>
    </div>
  );
};


//form 4 (shows tiles)
var DisplayAll = (props) => {
  // var displayAllPets = props.displayAllPets;
  return (
    <div>
      <p>Your Pets</p>
       <div>
    <PetCard>
      <img src='http://2.bp.blogspot.com/-EiNcwcrlXyU/UZfLXZoI7zI/AAAAAAAAFAE/1Rv63hRHMSE/s1600/Golden-Retriever.jpg' height='200' width='200'/> <br/>
      <span> Goldie </span>
    </PetCard>        
      </div>
    </div>
  );
};

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
  } else if (props.currentPage === 'displayAll') {
    return <DisplayAll showAll={props.showAllPets} />;
  }
};

// var Cards = React.createClass({
//   getInitialState() {
//     return {
//       isFlipped: false
//     };
//   },

//   showBack() {
//     this.setState({
//       isFlipped: true
//     });
//   },

//   showFront() {
//     this.setState({
//       isFlipped: false
//     });
//   },

//   handleOnFlip(flipped) {
//     if (flipped) {
//       this.refs.backButton.getDOMNode().focus();
//     }
//   },

//   handleKeyDown(e) {
//     if (this.state.isFlipped && e.keyCode === 27) {
//       this.showFront();
//     }
//   },

//   render() {
//     return (
//       <div>
//         {/*
//           The `disabled` attribute allows turning off the auto-flip
//           on hover, or focus. This allows manual control over flipping.

//           The `flipped` attribute indicates whether to show the front,
//           or the back, with `true` meaning show the back.
//         */}
//         <FlipCard
//           disabled={true}
//           flipped={this.state.isFlipped}
//           onFlip={this.handleOnFlip}
//           onKeyDown={this.handleKeyDown}
//         >
//           <div>
//             <div>Turtle</div>
//             <img src= 'https://www.bing.com/th?id=OIP.i3Y1sljqEyH7kRasrjZ3DgHaEI&w=300&h=167&c=7&o=5&dpr=2&pid=1.7' height='200' width='200'/>
//             <button type="button" onClick={this.showBack}>Show back</button>
//           </div>
//           <div>
//             <div>Back</div>
//             <button type="button" ref="backButton" onClick={this.showFront}>Vitals</button>
//             <button type="button" ref="backButton" onClick={this.showFront}>Vaccines</button>
//             <button type="button" ref="backButton" onClick={this.showFront}>Medications</button>
//             <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>
//           </div>
//         </FlipCard>

//       </div>
//     );
//   }
// });

// React.render(<App/>, document.getElementById('container'));
window.App = App;

ReactDOM.render(<App />, document.getElementById('app'));
