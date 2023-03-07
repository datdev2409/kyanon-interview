import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import Button from '../components/Button';
import { signIn } from '../firebase/auth';
import { redirect, Navigate } from 'react-router-dom';

function LoginPage() {
  const [isPWDisplay, setIsPWDisplay] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
      setError('Please provide enough information');
      setLoading(false);
      return;
    }
    signIn(email, password)
      .then((user) => {
        setUser(user)
        localStorage.setItem("auth_token", user.uid)
        redirect("/")
      })
      .catch((error) => {
        setError(error.message)
        e.target.reset()
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Login</h3>

        {error && <div className="form-error">{error}</div>}
        {user && (
          <Navigate to="/" replace={true} />
        )}

        <FormGroup
          label="Email:"
          placeholder="example@kyanon.com"
          name="email"
          // error="Wrong email"
        />

        <FormGroup
          label="Password:"
          placeholder="********"
          name="password"
          type={isPWDisplay ? 'text' : 'password'}
        />

        <div className="form-group form-group-horizontal">
          <div className="flex flex-center flex-g-1">
            <input
              id="toggle-btn"
              className="form-checkbox"
              type="checkbox"
              value={isPWDisplay}
              onChange={() => setIsPWDisplay((prev) => !prev)}
            />
            <label
              className="form-label form-label--secondary"
              htmlFor="toggle-btn">
              Show password
            </label>
          </div>
          <Button>{loading ? 'Loading' : 'Sign in'}</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
