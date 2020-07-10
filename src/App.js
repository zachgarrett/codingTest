import React from 'react';
import './App.css';
import RangeSlider from './slider';
import Table from './table';

let range = null;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.receiveTableData = this.receiveTableData.bind(this);
  }
  
  //Receives range from slider initially and when range changes
  receiveTableData (value) {
    range = value;
    this.setState({state: this.state});
  }

  //Renders app
  render () {
    return (
      <div className="App">     
        <h1>S&P 500 Total Returns By Year</h1>
        <h2>Select Beginning and Ending Years ({range != null && range[0]} - {range != null && range[1]})</h2>
        <RangeSlider sendTableData={this.receiveTableData}/>
        <br />
        {range != null && <Table range={range}/>}
      </div>
    )
  }
}