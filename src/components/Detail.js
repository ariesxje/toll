import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Checkbox from 'material-ui/lib/checkbox';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/lib/paper';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';


class Detail extends React.Component {

  constructor(props) {
    super(props);
    const candidates = require('json!../candidates.json').filter((candidate)=>{
      return candidate.jobId == props.params.id;
    });
    let candidate = null;
    if (candidates.length === 1) {
      candidate = candidates[0];
    }
    this.state = {
      jobId: props.params.id,
      name: candidate.name || '',
      nameError: false,
      currentlyEmployed: candidate.currentlyEmployed || false,
      availableDate: candidate.availableDate || null,
      availableDateError: false,
      email: candidate.email || '',
      emailError: false,
      address: candidate.address || '',
      state: candidate.state || '',
      stateError: false,
      salary: candidate.salary || '',
      currentSalary: candidate.currentSalary || '',
      formValidated: false
    }
  }

  nameChange(event) {
    this.setState({
      name: event.target.value,
    });
    this.validateName(event.target.value);
  }

  onCheckCurrentlyEmployed() {
    let employed = this.state.currentlyEmployed;
    this.setState({currentlyEmployed: !employed});
  }

  onAvailableDateChange(event, date) {
    this.setState({availableDate: date});
    this.validateAvailableDate(date);
  }

  formatDate(date) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  validateEmailFormat(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  emailChange(event) {
    this.setState({
      email: event.target.value
    });
    this.validateEmail(event.target.value);
  }

  addressChange(event) {
    this.setState({address: event.target.value});
  }

  stateChange(event, index, value) {
    this.setState({
      state: value
    });
    this.validateState(value);
  }

  salaryChange(event) {
    this.setState({salary: event.target.value});
  }

  currentSalaryChange(event) {
    this.setState({currentSalary: event.target.value});
  }

  //validations

  validateName(value) {
    const errorMessage = 'Please enter name';
    let name = '';
    if (typeof value !== 'undefined') {
      name = value;
    } else {
      name = this.state.name
    }
    this.setState({
      nameError: name.length > 0 ? false : errorMessage
    })
  }

  validateAvailableDate(value) {
    const errorMessage = 'Please choose the available date from';
    let date = '';
    if (typeof value !== 'undefined') {
      date = value;
    } else {
      date = this.state.availableDate;
    }
    this.setState({
      availableDateError: date ? false : errorMessage
    })
  }

  validateEmail(value) {
    const errorMessage = 'Please enter a valid email address';
    let email = '';
    if (typeof value !== 'undefined') {
      email = value;
    } else {
      email = this.state.email;
    }
    this.setState({
      emailError: email.length > 0 && this.validateEmailFormat(email) ? false : errorMessage
    })
  }

  validateState(value) {
    const errorMessage = 'Please choose a state';
    let state = '';
    if (typeof value !== 'undefined') {
      state = value;
    } else {
      state = this.state.state;
    }
    this.setState({
      stateError: state ? false : errorMessage
    })
  }

  validateForm() {
    this.validateName();
    this.validateAvailableDate();
    this.validateEmail();
    this.validateState();
    this.setState({formValidated: true});
  }

  render() {
    const states = ['VIC', 'QLD', 'TAS', 'WA', 'SA', 'NSW'];
    const currentSalaryTextField = (
      <TextField
        floatingLabelText="Current salary"
        value={this.state.currentSalary}
        onChange={this.currentSalaryChange.bind(this)}
      />
    )

    return (
      <div>
        <AppBar
          title={`JobId: ${this.state.jobId}`}
          iconElementLeft={<IconButton onTouchTap={()=>{this.context.router.push('/')}}><NavigationArrowBack /></IconButton>}
        />
        <Paper zDepth={1} style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
          <TextField
            floatingLabelText="Name"
            errorText={this.state.nameError}
            value={this.state.name}
            onChange={this.nameChange.bind(this)}
          />
          <Checkbox
            style={{maxWidth: 250, marginTop: 10, marginBottom: 10}}
            label="Currently employed"
            checked={this.state.currentlyEmployed}
            onCheck={this.onCheckCurrentlyEmployed.bind(this)}
          />
          {
            <div>
              {this.state.currentlyEmployed ? currentSalaryTextField : ''}
            </div>
          }
          <DatePicker
            hintText="Available after date"
            value={this.state.availableDate}
            onChange={this.onAvailableDateChange.bind(this)}
            formatDate={this.formatDate.bind(this)}
          />
          <TextField
            floatingLabelText="Email"
            errorText={this.state.emailError}
            value={this.state.email}
            onChange={this.emailChange.bind(this)}
          /><br/>
          <TextField
            floatingLabelText="Street address"
            value={this.state.address}
            onChange={this.addressChange.bind(this)}
          /><br/>
          <SelectField
            floatingLabelText="State"
            value={this.state.state}
            errorText={this.state.stateError}
            onChange={this.stateChange.bind(this)}
          >
            {states.map((state) => {
              return <MenuItem value={state} primaryText={state} key={state}/>
            })}
          </SelectField><br/>
          <TextField
            floatingLabelText="Desired salary"
            value={this.state.salary}
            onChange={this.salaryChange.bind(this)}
          /><br/>
          <FlatButton
            primary={true}
            label="Save"
            onTouchTap={this.validateForm.bind(this)}
          />
          {
            this.state.formValidated && !this.state.nameError && !this.state.availableDateError &&
            !this.state.emailError && !this.state.stateError ? <div>Ready to save</div> : ''
          }
        </Paper>
      </div>
    );
  }
}

Detail.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Detail.defaultProps = {
};

export default Detail;
