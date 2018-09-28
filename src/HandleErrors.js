import React, { Component } from 'react';

class HandleErrors extends Component {
   state = { hasError: false };


    componentDidCatch() {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Oops, Google Maps didn't load, try again later!</h1>;
        }
        return this.props.children;
    }
}

export default HandleErrors