import React, { useEffect, useState } from 'react';
import FormGroup from '../components/FormGroup';
import Button from '../components/Button';
import { getUser, updateUser } from '../firebase/firestore';
import { validateEmail, validatePhone } from '../util/validate';

function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDOB] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError({})
    const auth_token = localStorage.getItem('auth_token');
    getUser(auth_token)
      .then((user) => {
        updateForm(user);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  function updateForm(user) {
    setName(user.fullname);
    setDOB(user.DOB);
    setEmail(user.email);
    setPhone(user.phone);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth_token = localStorage.getItem('auth_token');

    // Validate email
    if (!validateEmail(email)) {
      setError({...error, email: "Invalid email format"})
      setLoading(false)
      return
    }

    if (!validatePhone(phone)) {
      setError({...error, phone: "Invalid phone format"})
      setLoading(false)
      return
    }

    setError({})
    const updateInfo = { fullname: name, email, phone, DOB: dob };
    updateUser(auth_token, updateInfo)
      .then(() => {
        updateForm(updateInfo);
        alert('Update successfully');
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3 className="form-title">Profile</h3>
        <p style={{ marginBottom: '10px' }}>
          Welcome <span className="highlight">{name}</span>! Below is your
          personal information, you can update this by fill in the form and
          submit it.
        </p>

        {/* {error && <div className="form-error">{error}</div>}
        {user && <Navigate to="/" replace={true} />} */}

        <FormGroup
          label="Full name:"
          name="fullname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // error="Wrong email"
        />

        <FormGroup
          label="Date of birth:"
          name="dob"
          type="date"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
        />

        <FormGroup
          label="Email:"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error?.email}
        />

        <FormGroup
          label="Phone:"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={error?.phone}
        />

        <div className='flex flex-right'>
          <Button>{loading ? "Loading" : "Update"}</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
