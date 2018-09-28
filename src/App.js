import React, { Component } from 'react';
import Map from "./Map";
import './App.css';
import './powered-by-foursquare-blue.png';
import HandleErrors from "./HandleErrors";

class App extends Component {

    state = {
        locations: [],
        filteredLocations: [],
        selectedLocation: '',
        mapCenter: {lat: 36.8007, lng: -121.9473}
    }

    componentDidMount () {
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=0TTQXCPFZZ2VVFJ3RLVVNM4E5K5WSY0GQX2O52CFDRMQ0PNI&client_secret=IMSCQAMPN2GCESSZVPSOO42Q0EL0UKIZ35KCS0N3D35U5IL3&v=20180323&limit=8&ll=36.8007,-121.9473&query=whale watch')
            .then(res => res.json())
            .then(data => {
                this.setState({locations: data.response.groups[0].items});
                this.setState({filteredLocations: data.response.groups[0].items});
            })
            .catch(err => alert(`Ooops, try again later,  ${err}`));
    }

    filterLocation = (e)  => {
        this.setState({selectedLocation: '' });
        if (e === 'All') {
            this.setState({filteredLocations: this.state.locations});
            this.setState({mapCenter: {lat: 36.8007, lng: -121.9473}})
        } else {
            let filteredLocations = this.state.locations.filter(location => location.venue.location.city === e);
            this.setState({filteredLocations: filteredLocations});
            if (e === 'Monterey') {
                this.setState({mapCenter: {lat: 36.603954, lng: -121.898460}});
            } else if (e === 'Moss Landing') {
                this.setState({mapCenter: {lat: 36.8038449, lng: -121.7891177}});
            } else if (e === 'Santa Cruz') {
                this.setState({mapCenter: {lat: 36.974117, lng: -122.030792}});
            }

        }
    }

    showInfo = (event, name) => {
        let info = this.state.filteredLocations.find(location => location.venue.name === name);
        this.setState({selectedLocation: info.venue.name });
    }

    // mapError = () => alert(`Google maps is loading, click okay and try again.`);

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a href="#selectCity" className="skip-to">Skip to Select a City</a>
                    <h1>Whale Watching in Monterey Bay</h1>
                </header>
                <div className='mobile'>
                    <div id="selectCity" className='select-city'>
                        <select onChange={event => this.showInfo (event, event.target.value)}>
                            {this.state.filteredLocations.map((location) =>
                                <option value={location.venue.name} key = {location.venue.id}> {location.venue.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className='main-content'>
                    <div className='listView'>
                        <div id="selectCity" tabIndex='-1' className='select-city'>
                                <select onChange={event => this.filterLocation(event.target.value)}>
                                    <option value='All' >All Cities</option>
                                    <option  value='Monterey'>Monterey</option>
                                    <option  value='Moss Landing'>Moss Landing</option>
                                    <option  value='Santa Cruz'>Santa Cruz</option>
                                </select>
                        </div>
                        <ul>
                            {this.state.filteredLocations.map((location) =>
                                <li key = {location.venue.id} aria-label={location.venue.name} tabIndex='0'
                                    onClick = {event => this.showInfo (event, location.venue.name)}>
                                    <h4> {location.venue.name}</h4></li>
                            )}
                        </ul>
                        <img src={'./powered-by-foursquare-blue.png'} alt='Powered By FourSquare' width={'150px'}/>
                    </div>
                    <div className='map' role="application" aria-label='map'>

                            <Map
                                mapCenter= {this.state.mapCenter}
                                locations = {this.state.locations}
                                filteredLocations = {this.state.filteredLocations}
                                selectedLocation = {this.state.selectedLocation}
                                // mapError = {this.mapError}
                            />

                    </div>
                </div>
                <footer >

                </footer>
            </div>
        );
    }
}

export default App;

