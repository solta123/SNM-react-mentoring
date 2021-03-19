import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error) => {
        this.setState({ hasError: true, errorMessage: error });
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.object
}

export default ErrorBoundary;