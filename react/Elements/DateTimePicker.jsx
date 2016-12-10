/* Lead author: Rena */

// List of locati xsons for location pickers
import React, { Component } from 'react';
import { render } from 'react-dom';

class DateTimePicker extends Component {
    constructor(props){ 
        super(props);
        this.state = {
        };

        this.updateTime = this.updateTime.bind(this);
        this.getLocalISOString = this.getLocalISOString.bind(this);
        this.getDefaultTime = this.getDefaultTime.bind(this);
    }
    /**
     * Returns a Date object with the time from the date picker with a timezone
     * offset of the user.
     */
    updateTime(event) {
        var timezoneOffset = new Date().getTimezoneOffset() * 1000 * 60;
        var dateWithTimezone = new Date(event.target.value);
        dateWithTimezone.setTime(dateWithTimezone.getTime() + timezoneOffset);

        this.props.onChange(dateWithTimezone);
    }

    getLocalISOString(date) {
        var pad = function(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());
        }

    getDefaultTime() {
        var dateTime = this.props.defaultTime;
        if (dateTime == null) {
            dateTime = new Date();
        }

        return this.getLocalISOString(dateTime);
    }

 	render () {
	    return (
            <form>
                <input className={"datepicker form-control " + this.props.classname} type="datetime-local" defaultValue={ this.getDefaultTime() } onChange={this.updateTime}/>
            </form>
	    )
	}
}
export default DateTimePicker;