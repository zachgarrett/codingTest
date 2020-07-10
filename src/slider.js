import React from 'react';
import './App.css';
import Tooltip from 'rc-tooltip';
import Slider, { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class RangeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //Keeps track of the range values
            value: [1926, 1950]
        };
        this.onRangeChange(this.state.value);
    }

    //Called when range changes, change state, send to table to display
    onRangeChange = value => {
        this.setState({value});
        this.props.sendTableData(value);
    };

    //Renders range slider with handle
    render () {
        const handle = props => {
            const { value, dragging, index, ...restProps } = props;
            return (
                <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
                >
                <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };
        const style = { width: 400 };
        return ( 
            <Range 
                min={1926} 
                max={2019} 
                value={this.state.value} 
                allowCross={false} 
                style={style} 
                className="slider" 
                onChange={this.onRangeChange} 
                handle={handle}
            />
        );
    }
}