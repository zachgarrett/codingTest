import React from 'react';
import totalReturns from './returnsHistory.json';
import './App.css';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.findLowerBoundIndex = this.findLowerBoundIndex.bind(this);
        this.findUpperBoundIndex = this.findUpperBoundIndex.bind(this);
    }

    findLowerBoundIndex (object, index) {
        if (object.year == this.props.range[0]) {
            return index+1;
        }
    }

    findUpperBoundIndex (object, index) {
        if (object.year == this.props.range[1]) {
            return index;
        }
    }
    
    //Renders the table
    render () {
        
        //Reverses the data in array so it is ascending, slices the array to the selected range
        let ascendingReturns = [];
        ascendingReturns = totalReturns.reverse();
        const lowerBound = ascendingReturns.findIndex(this.findLowerBoundIndex);
        const upperBound = ascendingReturns.findIndex(this.findUpperBoundIndex)+1;
        const ascendingReturnsSection = ascendingReturns.slice(lowerBound, upperBound);

        //Finds the cumulative returns of the table in range
        let cumulativeReturns = [];
        for(let i=0; i<ascendingReturnsSection.length; i++) {
            if (cumulativeReturns != 0) {
                cumulativeReturns[i] = parseFloat(cumulativeReturns[i-1]) + parseFloat(ascendingReturnsSection[i].totalReturn);
            }
            else {
                cumulativeReturns[i] = parseFloat(ascendingReturnsSection[i].totalReturn);
            }
        }

        return (         
            <table className="table" cellSpacing="0">
                <tbody>
                <tr>
                    <th>Year</th>
                    <th>Total Return</th>
                    <th>Cumulative Returns</th>
                </tr>
                {ascendingReturnsSection.map((totalReturn, index) => 
                (
                <tr>
                    <td>{totalReturn.year}</td>
                    <td style={totalReturn.totalReturn < 0 ? {color: 'red'} : {color: 'black'}}>{totalReturn.totalReturn}</td>
                    <td style={parseFloat(cumulativeReturns[index]) < 0 ? {color: 'red'} : {color: 'black'}}>{parseFloat(cumulativeReturns[index]).toFixed(2)}</td>
                </tr>))}
                </tbody>
            </table>
        )
    }
}