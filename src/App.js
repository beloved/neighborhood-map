import React, { Component } from 'react';
import Map from "./Map";
import './App.css';

class App extends Component {

    state = {
        locations: []
    }
    componentDidMount () {
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=0TTQXCPFZZ2VVFJ3RLVVNM4E5K5WSY0GQX2O52CFDRMQ0PNI&client_secret=IMSCQAMPN2GCESSZVPSOO42Q0EL0UKIZ35KCS0N3D35U5IL3&v=20180323&limit=10&ll=36.8524545,-121.4016021&query=whale watching')
            .then(res => res.json())
            .then(data => this.setState({locations: data.response.groups[0].items}))
            .catch(err => console.log(err));
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
                        <select>
                            <option  value='Monterey'>Monterey</option>
                            <option  value='Moss Landing'>Moss Landing</option>
                            <option  value='Santa Cruz'>Santa Cruz</option>
                        </select>
                        <ul>
                            {this.state.locations.map((location) =>
                                <li key = {location.venue.id}>{location.venue.name}</li>
                            )}
                        </ul>
                    </div>
                    <div className='map'>
                        <Map locations = {this.state.locations}/>
                    </div>
                </div>
                <footer >

                </footer>
            </div>
        );
    }
}

export default App;

