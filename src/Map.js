import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import './App.css'



const MyMapComponent = compose(
    //Lines 12-17 created with assistance from code example here https://github.com/tomchentw/react-google-maps/issues/753
    withStateHandlers(() => ({
        isOpen: false,
        infoId: null,
    }), {
        onToggleOpen: ({ isOpen, infoId}) => (id) => ({
            isOpen: infoId !== id || !isOpen,
            infoId: id,
        })
    }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={10}
        center={ props.mapCenter }
        // defaultCenter={{ lat: 36.8007, lng: -121.9473 }}
    >
        {/*Lines 28-40 created with assistance from slack peer, Forrest(FEND) */}
        {props.selectedLocation ? props.locations.filter(location =>
            location.venue.name === props.selectedLocation).map(location => (
                <Marker key={location.venue.id} animation={2} //https://stackoverflow.com/questions/45887099/react-google-maps-marker-animation
                        position={{lat: location.venue.location.lat, lng: location.venue.location.lng}}
                        onClick={() => props.onToggleOpen(location.venue.id)}>
                    {/*{props.isOpen &&*/}
                    <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                            <div>{location.venue.name}</div>
                            <div>{location.venue.location.formattedAddress}</div>
                        </div>
                    </InfoWindow>
                    {/*}*/}
                </Marker>))
            : props.locations.map(location => (
                <Marker key={location.venue.id}
                        position={{lat: location.venue.location.lat, lng: location.venue.location.lng}}
                        onClick={() => props.onToggleOpen(location.venue.id)}>
                    {(props.isOpen && props.infoId === location.venue.id) && <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div>
                            <div>{location.venue.name}</div>
                            <div>{location.venue.location.formattedAddress}</div>
                        </div>
                    </InfoWindow>}
                </Marker>))
        }
    </GoogleMap>
)

class Map extends React.PureComponent {

    render() {
        //let locations = this.props.locations;
        let mapCenter = this.props.mapCenter;
        console.log(mapCenter);
        let filteredLocations = this.props.filteredLocations;
        let selectedLocation = this.props.selectedLocation;
        return (
            <MyMapComponent mapCenter = {mapCenter} locations = {filteredLocations} selectedLocation = {selectedLocation} />
        )
    }
}
export default Map;