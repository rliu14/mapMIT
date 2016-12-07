// List of locati xsons for location pickers
import React, { Component } from 'react';
import { render } from 'react-dom';

class DateTimePicker extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            defaultTime: Date.now(),
        }
        this.updateTime = this.updateTime.bind(this);
        this.getDefaultTime = this.getDefaultTime.bind(this);

    }

    updateTime(event) {
        console.log("changed time", event.target.value);
        this.props.onChange(event.target.value);
    }

    getDefaultTime() {
        var dateTime = this.props.defaultTime;
        if (!dateTime) {
            dateTime = Date.now()
        }
        var date = new Date();
        date.setTime(dateTime - (date.getTimezoneOffset()*60*1000));

        return date.toISOString().substring(0,16);
    }

 	render () {
	    return (
            <form>
                <input type="datetime-local" defaultValue={ this.getDefaultTime() } onChange={this.updateTime}/>
            </form>
	    )
	}
}
export default DateTimePicker;