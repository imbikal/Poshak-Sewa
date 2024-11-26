import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

function Register() {
  const history = useHistory();
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: {},
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleInput = (e) => {
    e.persist();
    setRegister((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
  };

  const checkPasswordStrength = (password) => {
    const strengthResult = zxcvbn(password);
    const score = strengthResult.score;
    const feedback = strengthResult.feedback;

    if (score === 0) {
      setPasswordStrength('Weak');
    } else if (score === 1 || score === 2) {
      setPasswordStrength('Moderate');
    } else if (score === 3 || score === 4) {
      setPasswordStrength('Strong');
    }

    if (feedback && feedback.warning) {
      setPasswordStrength((prevState) => `${prevState} (${feedback.warning})`);
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    // Client-side validation for the name field
    if (!registerInput.name) {
      setRegister((prevState) => ({
        ...prevState,
        error_list: { ...prevState.error_list, name: 'Name is required' },
      }));
      return;
    } else if (!validateName(registerInput.name)) {
      setRegister((prevState) => ({
        ...prevState,
        error_list: { ...prevState.error_list, name: 'Name must contain only letters and spaces' },
      }));
      return;
    } else {
      setRegister((prevState) => ({ ...prevState, error_list: { ...prevState.error_list, name: '' } }));
    }

    // Client-side validation for the email field
    if (!registerInput.email) {
      setRegister((prevState) => ({
        ...prevState,
        error_list: { ...prevState.error_list, email: 'Email is required' },
      }));
      return;
    } else if (!validateEmail(registerInput.email)) {
      setRegister((prevState) => ({
        ...prevState,
        error_list: { ...prevState.error_list, email: 'Invalid email format. Please enter a valid email address' },
      }));
      return;
    } else {
      setRegister((prevState) => ({ ...prevState, error_list: { ...prevState.error_list, email: '' } }));
    }

    // Client-side validation for the password field
    if (!registerInput.password) {
      setRegister((prevState) => ({
        ...prevState,
        error_list: { ...prevState.error_list, password: 'Password is required' },
      }));
      return;
    } else {
      setRegister((prevState) => ({ ...prevState, error_list: { ...prevState.error_list, password: '' } }));
    }

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal('Success', res.data.message, 'success');
          history.push('/');
        } else {
          setRegister((prevState) => ({ ...prevState, error_list: res.data.validation_errors }));
        }
      });
    });
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={registerInput.name}
                      className="form-control"
                      placeholder="e.g., Rent Trend"
                    />
                    <span>{registerInput.error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email ID</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleInput}
                      value={registerInput.email}
                      className="form-control"
                      placeholder="e.g., example@example.com"
                    />
                    <span>{registerInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleInput}
                        value={registerInput.password}
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <span>{registerInput.error_list.password}</span>
                    {passwordStrength && <div>Password Strength: {passwordStrength}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
