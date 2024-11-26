import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        try {
            // Initialize CSRF token
            await axios.get('/sanctum/csrf-cookie');

            // Attempt to log in
            const res = await axios.post('/api/login', data);

            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");

                // Redirect based on user role
                if (res.data.role === 'admin') {
                    history.push('/admin/dashboard');
                } else {
                    history.push('/');
                }
            } else if (res.data.status === 401) {
                swal("Warning", res.data.message, "warning");
            } else {
                setLogin({ ...loginInput, error_list: res.data.validation_errors });
            }
        } catch (error) {
            console.error('Login failed:', error);
            swal("Error", "An unexpected error occurred. Please try again.", "error");
        }
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            onChange={handleInput} 
                                            value={loginInput.email} 
                                            className="form-control" 
                                        />
                                        {loginInput.error_list.email && <span className="text-danger">{loginInput.error_list.email}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            onChange={handleInput} 
                                            value={loginInput.password} 
                                            className="form-control" 
                                        />
                                        {loginInput.error_list.password && <span className="text-danger">{loginInput.error_list.password}</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;