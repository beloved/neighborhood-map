import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
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
        defaultZoom={11}
        defaultCenter={{ lat: 36.8007, lng: -121.9473 }}
    >
        {props.locations.map(location => (
             <Marker key = {location.venue.id} position={{lat:location.venue.location.lat, lng:location.venue.location.lng}} onClick={props.onToggleOpen}>
                     {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                       <div>
                           <div>{location.venue.name}</div>
                         <div>{location.venue.location.formattedAddress}</div>
                       </div>
                     </InfoWindow>}
             </Marker>
            ))}
    </GoogleMap>
)

class Map extends React.PureComponent {

    render() {
        let locations = this.props.locations;
        let filteredLocations = this.props.filteredLocations;
        console.log(locations);
        return (
            <MyMapComponent locations = {filteredLocations} />
        )
    }
}
export default Map;