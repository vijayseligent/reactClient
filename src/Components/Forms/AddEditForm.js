import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    _id: 0,
    enumber: '',
    sdate: Date.now(),
    edate: Date.now(),
    address: '',
    status: true
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

    handleSDateChange = date => {
        console.log(date);
    this.setState({
      sdate: date
    })
  }

    handleEDateChange = date => {
    this.setState({
      edate: date
    })
    }
    
    toggleChange = () => {
        this.setState({
            status: !this.state.status,
        });
    }
    
  submitFormAdd = e => {
    e.preventDefault()
    fetch('https://vvn64dqts1.execute-api.us-east-1.amazonaws.com/v1/equipment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        enumber: this.state.enumber,
        sdate: moment(this.state.sdate).format('L'),
        edate: moment(this.state.edate).format('L'),
        address: this.state.address,
        status: this.state.status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('https://vvn64dqts1.execute-api.us-east-1.amazonaws.com/v1/equipment/' + this.state._id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        equipId: this.state._id,
        enumber: this.state.enumber,
        sdate: moment(this.state.sdate).format('L'),
        edate: moment(this.state.edate).format('L'),
        status: this.state.status,
        address: this.state.address
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { _id, enumber, sdate, edate, address, status } = this.props.item
        this.setState({ _id, enumber, sdate, edate, address, status })
        console.log(this.state.sdate);
        console.log(this.state.status);
        this.setState({
            sdate: moment(sdate, 'MM/DD/yyyy').toDate(),
            edate: moment(edate, 'MM/DD/yyyy').toDate()
        })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="enumber">Machine Number : </Label>
          <Input type="text" name="enumber" id="enumber" maxLength="10" onChange={this.onChange} value={this.state.enumber === null ? '' : this.state.enumber} />
        </FormGroup>
        <FormGroup>
          <Label for="sdate">Start Date : </Label>
          <DatePicker
              selected = { this.state.sdate}
              onChange={ this.handleSDateChange }
              name="sdate"
              dateFormat="MM/dd/yyyy"      
            />
        </FormGroup>
        <FormGroup>
          <Label for="edate">End Date : </Label>
          <DatePicker
              selected={ this.state.edate }
              onChange={ this.handleEDateChange }
              name="edate"
              dateFormat="MM/dd/yyyy"
            />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address : </Label>
          <Input type="text" name="address" id="address" maxLength="30" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
            <Label for="status">Is Running : </Label>
            <input type="checkbox" name="status" id="status" checked={this.state.status} onChange={this.toggleChange} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm