/* Lead author: Rena */

// List of locati xsons for location pickers
import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class LocationPicker extends Component {
    constructor(props){ 
        super(props);

        this.updateLocation = this.updateLocation.bind(this);
        this.getLocations = this.getLocations.bind(this);

    }

    getLocations(optional) {
        var locations = ['Building 1', 'Building 2', 'Building 3', 'Building 4', 'Building 5',
                'Building 6', 'Building 7', 'Building 10', 'Building 13', 'Building 14', 'Building 18',
                'Building 34', 'Building 36', 'Building 38', 'Building 56', 'Building 66', 'Green Building',
                'Stata Center', 'Maseeh Hall', 'McCormick Hall', 'Baker House', 'Burton Conner', 'Macgregor House',
                'New House', 'Next House', 'Simmons House', 'Tennis Courts', 'Z Center', 'Kresge Auditorium',
                'Kresge Barbecue Pits', 'Stratton Student Center'];
        if (optional) {
            locations.unshift('Any');
        }
        return locations;
    }

    updateLocation(event) {
        this.props.onUpdate(event.target.value);
    }

 	render () {
	    return (
            <form>
                <label>
                    <select className="form-control" value={this.props.location} onChange={this.updateLocation}>
                        {this.getLocations(this.props.optional).map(function(location, index, array){
                            return (<option key={index} value={location}>{location}</option>)
                        })}
                    </select>
                </label>
            </form>
	    )
	}
}
export default LocationPicker;