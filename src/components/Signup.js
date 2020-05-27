import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('submited');
  };

  return (
    <div className="form">
      <h2 className="heading-1">SIGN UP</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form__input"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="username"
          className="form__input"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          className="form__input"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirm-password"
          className="form__input"
          placeholder="Confirm password"
          required
        />
        <button type="submit" className="btn form__submit">
          SIGN UP
        </button>
      </form>
      <Link style={{ color: '#fff' }} to="/login">
        Already have an account? Login.
      </Link>
    </div>
  );
};

export default Signup;
