import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, 
                                      [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5050/auth/login`, {
                // if the id is present, we will use the PATCH method, otherwise we will use the POST method.
                method: `POST`,
                headers: {
                'Content-Type': 'application/json' // Tell server to expect JSON
            },
                body: JSON.stringify(formData)
                });
            
            localStorage.setItem('token', res.data.token);
            setLoggedInUser(username);
            
            // Set success message
            setMessage('Logged in successfully');
        } catch (err) {
            console.error(err.response.data);
            // Set error message
            setMessage('Failed to login - wrong credentials');         
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" 
                       placeholder="Username" 
                       name="username" 
                       value={username} 
                       onChange={onChange} 
                       required />
                <input type="password" 
                       placeholder="Password" 
                       name="password" 
                       value={password} 
                       onChange={onChange} 
                       required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;