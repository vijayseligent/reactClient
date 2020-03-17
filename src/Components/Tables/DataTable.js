import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('https://vvn64dqts1.execute-api.us-east-1.amazonaws.com/v1/equipment/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'equipId':id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }
    onCheckChange = e => { 

    }
  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item._id}>
          <td>{item.enumber}</td>
          <td>{item.sdate}</td>
          <td>{item.edate}</td>
          <td>{item.address}</td>
              <td><input type="checkbox" checked={item.status} readOnly onChange={this.onCheckChange} updateState={this.props.updateState}/></td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Machine Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Address</th>
            <th>IsRunning</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable