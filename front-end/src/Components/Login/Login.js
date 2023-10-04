import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { useUser } from '../../UserContext';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useUser();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:9090/user/'+username+'/'+password)
        .then((res) => res.json())
         .then((data) => {
            if(data){
                
                fetch('http://localhost:9090/user/'+username)
                .then((res1) => res1.json())
                .then((data1) => {
                        console.log(data1);
                        updateUser(data1);
                        navigate('/dashboard');
                })
                .catch((err1) => {
                    
                    setError(err1.message);
                });
            }else{
                setError("Invalid email or password");
            }
         })
         .catch((err) => {
            setError(err.message);
         });
    };

    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg  nav background">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link className="nav-link"></Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/register'} class="nav-link padding">Register</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/login'} class="nav-link padding">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="login-container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 custom-column">
                        <div class="card">
                            <div className="card-body">
                                <h3 className="card-title text-center violet-text bold-text">Login</h3>
                                <form>
                                    <div className="form-group mb-3 mt-4">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Email ID"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && ( // Display the error message if error is not null
                                        <p className="error-message">
                                            {error}
                                        </p>
                                    )}
                                   <button
                                        type="submit"
                                        className={`btn btn-primary btn-block custom-button ${error ? '' : 'mt-4'}`}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </form>
                                <p className="mt-3 text-center white-text">
                                    Don't have an account? <Link to="/register" className="violet-link">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
