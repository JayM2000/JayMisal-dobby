import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Privater = ({ component: Component,
    auth: { isAuthenticated } }) => {
        console.log(isAuthenticated);
    if (isAuthenticated) return <Component />;

    return <Navigate to="/" />;
};

Privater.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapp = (state) => ({
    auth: state.auth
});

export default connect(mapp)(Privater);