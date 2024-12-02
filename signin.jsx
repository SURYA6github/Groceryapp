import React, { useState } from 'react';
import './signin.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      setError('Account already exists for this email.');
      return;
    }

    const newUser = { email, password };
    localStorage.setItem(email, JSON.stringify(newUser));
    setError(null);
    setSuccess(true);

    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="signin-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Registration Successful! You can now sign in.</p>}
    </div>
  );
};

export default Register;
