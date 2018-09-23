import React, { Component } from 'react';
import Map from "./Map";
import './App.css';

class App extends Component {

    state = {
        locations: [],
        filteredLocations: [],
        selectedLocation: '',
    }
    componentDidMount () {
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=0TTQXCPFZZ2VVFJ3RLVVNM4E5K5WSY0GQX2O52CFDRMQ0PNI&client_secret=IMSCQAMPN2GCESSZVPSOO42Q0EL0UKIZ35KCS0N3D35U5IL3&v=20180323&limit=8&ll=36.8007,-121.9473&query=whale watch')
            .then(res => res.json())
            .then(data => {
                this.setState({locations: data.response.groups[0].items})
                this.setState({filteredLocations: data.response.groups[0].items})
            })
            .catch(err => console.log(err));
    }

    filterLocation = (e)  => {
        this.setState({selectedLocation: '' });
        if (e === 'All') {
            this.setState({filteredLocations: this.state.locations});
        } else {
            let filteredLocations = this.state.locations.filter(location => location.venue.location.city === e);
            this.setState({filteredLocations: filteredLocations});
        }
    }
    showInfo = (event, name) => {
        let info = this.state.filteredLocations.find(location => location.venue.name === name);
        this.setState({selectedLocation: info.venue.name });
    }

    render() {
        return (
            <div className="App">
                {/*Header Component*/}
                <header className="App-header">
                    <h1>Whale Watching in Monterey Bay</h1>
                </header>
                <div className='main-content'>
                    <div className='listView'>
                        <select onChange={event => this.filterLocation(event.target.value)}>
                            <option value='All' >All Cities</option>
                            <option  value='Monterey'>Monterey</option>
                            <option  value='Moss Landing'>Moss Landing</option>
                            <option  value='Santa Cruz'>Santa Cruz</option>
                        </select>
                        {/*Listview Component*/}
                        <ul>
                            {this.state.filteredLocations.map((location) =>
                                <li key = {location.venue.id} onClick = {event => this.showInfo (event, location.venue.name)}>{location.venue.name}</li>
                            )}
                        </ul>
                    </div>
                    <div className='map'>
                        <Map locations = {this.state.locations} filteredLocations = {this.state.filteredLocations} selectedLocation = {this.state.selectedLocation}/>
                    </div>
                </div>
                <footer >

                </footer>
            </div>
        );
    }
}

export default App;

