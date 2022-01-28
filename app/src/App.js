import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import MaterialTable from './components/MaterialTable';
import axios from "axios"
import enviroment from "./enviroment/Enviroment"


export default class App extends React.Component {

  state = {
    checkoutList: []
  }

  async getList() {
    await axios.get(`${enviroment.API}/checkouts`)
      .then(response => this.setState({checkoutList: response.data}))
  }

  componentWillMount() {
    this.getList()
  }

  render() {

    return (
      <MaterialTable data={this.state.checkoutList} />
    )
  }

}
