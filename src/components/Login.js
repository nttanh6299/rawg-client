import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('submited');
  };

  return (
    <div className="form">
      <h2 className="heading-1">LOGIN</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form__input"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="form__input"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn form__submit">
          Login
        </button>
      </form>
      <Link style={{ color: '#fff' }} to="/signup">
        Don't have an account? Sign up.
      </Link>
      <Link style={{ color: '#fff' }} to="/password-recovery">
        Forgot your password?
      </Link>
    </div>
  );
};

export default Login;
