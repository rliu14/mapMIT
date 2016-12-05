// List of locati xsons for location pickers
import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker'

class LocationPicker extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            location: 'None'
        };

        this.updateLocation = this.updateLocation.bind(this);
        this.getLocations = this.getLocations.bind(this);

    }

    getLocations() {
        return ['None', 'Building 1', 'Building 2', 'Building 3', 'Building 4', 'Building 5',
                'Building 6', 'Building 7', 'Building 10', 'Building 13', 'Building 14', 'Building 18',
                'Building 34', 'Building 36', 'Building 38', 'Building 56', 'Building 66', 'Green Building',
                'Stata Center', 'Maseeh Hall', 'McCormick Hall', 'Baker House', 'Burton Connor', 'Macgregor House',
                'New House', 'Next House', 'Simmons House', 'Tennis Courts', 'Z Center', 'Kresge Auditorium',
                'Kresge Barbecue Pits', 'Stratton Student Center'];
    }

    updateLocation(event) {
        this.setState({
            location: event.target.value
        });
        this.props.onUpdate(event.target.value);
    }

 	render () {
	    return (
            <form>
                <label>
                    <select value={this.props.location} onChange={this.updateLocation}>
                        {this.getLocations().map(function(location, index, array){
                            return (<option key={index} value={location}>{location}</option>)
                        })}
                    </select>
                </label>
            </form>
	    )
	}
}
export default LocationPicker;