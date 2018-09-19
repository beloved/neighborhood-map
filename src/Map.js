import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

// const locations = this.props.locations;
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
    <GoogleMap locations ="this.props.locations"
        defaultZoom={10}
        defaultCenter={{ lat: 36.8007, lng: -121.9473 }}
    >
        <Marker position={{lat: 36.8007, lng: -121.9473}} onClick={props.onToggleOpen}>
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>Hi</div>
            </InfoWindow>}
        </Marker>
        {/*{locations.forEach((location) =>*/}
             {/*<Marker position={`${location.venue.location.lat}, ${location.venue.location.lng} `} onClick={props.onToggleOpen}>*/}
                     {/*{props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>*/}
                        {/*<div>Hi</div>*/}
                     {/*</InfoWindow>}*/}
             {/*</Marker>*/}
            {/*)}*/}
    </GoogleMap>
)

class Map extends React.PureComponent {
    render() {
        return (
            <MyMapComponent locations ="this.props.locations"/>
        )
    }
}
export default Map;