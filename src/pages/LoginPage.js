import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import Button from '../components/Button';

function LoginPage() {
  const [isPWDisplay, setIsPWDisplay] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Login</h3>

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
          type={isPWDisplay ? "text" : "password"}
        />

        <div className="form-group form-group-horizontal">
          <div className="flex flex-center flex-g-1">
            <input
              id="toggle-btn"
              className="form-checkbox"
              type="checkbox"
              value={isPWDisplay}
              onChange={() => setIsPWDisplay(prev => !prev)}
            />
            <label
              className="form-label form-label--secondary"
              htmlFor="toggle-btn">
              Show password
            </label>
          </div>
          <Button>Sign in</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
