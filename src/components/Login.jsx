import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, setToken } from "../auth";

import { authFetch } from "../auth";

const Login = ({ setLoggedInUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: `POST`,
                headers: { 'Content-Type': 'application/json'}, // Tell server to expect JSON
                body: JSON.stringify(formData)
                });
            // TODO: Meaningful error handling, I.E. separation between credentials and server error.
            if (!res.ok) {
                setMessage("Failed to login - wrong credentials or server error");
                return;
            }
            const { token } = await res.json();
            setToken(token);
            navigate("/events");
        } catch (err) {
            console.error(err.response.data);
            // Set error message
            setMessage('Error encountered logging in, contact WebMaster if this persists');         
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