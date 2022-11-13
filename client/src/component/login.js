import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logins } from '../redux--appli/action/auth';

const App = ({ isauth, logins }) => {
    const [forms, setForms] = useState({
        email: '',
        password: ''
    });

    const { email, password } = forms;

    function formfunc(e) {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    function formsubmit(e) {
        e.preventDefault();

        logins({ email, password });
    };
    
    if (isauth) {
        return <Navigate to="/dashboard" />;
    };

    return (
        <React.Fragment>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={(e) => formsubmit(e)}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                        Don't have an account?{" "}
                            <Link to='/reg'>Sign Up</Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => formfunc(e)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={(e) => formfunc(e)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        {/* <p className="forgot-password text-right mt-2">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

App.propTypes = {
    authh: PropTypes.func.isRequired,
    isauth: PropTypes.bool
};

const mapStateToProps = state => ({
    isauth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logins })(App);