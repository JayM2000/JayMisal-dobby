import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import {authh} from '../redux--appli/action/auth';

const Function = ({authh}) => {
    const navi = useNavigate();

    const [forms, setForms] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const { email, password, password2 } = forms;

    function formfunc(e) {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    function submitform(e) {
        e.preventDefault();

        if (password !== password2) {
            alert('Not matching password !!!');
        }
        else {
            authh({ email, password,navi });
        }
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => submitform(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to='/'>Sign In</Link>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => formfunc(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => formfunc(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control mt-1"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => formfunc(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}


Function.propTypes = {
    authh:PropTypes.func.isRequired,
};

export default connect(null,{authh})(Function);