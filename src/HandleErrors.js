import React, { Component } from 'react';
// Code created based upon https://reactjs.org/docs/error-boundaries.html
class HandleErrors extends Component {
   state = {
       hasError: false
   };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {

            return <h1>Oops, Google Maps didn't load, try again later!</h1>;
        }
        return this.props.children;
    }
}

export default HandleErrors