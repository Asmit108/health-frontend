import { useState } from 'react';
import './Auth.css';
import { register } from '../State/Auth/Action';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'patient' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
    }
    dispatch(register(userData));
    navigate('/dashboard');
  };

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <div className="brand-mark" aria-hidden="true">+</div>
        <p className="eyebrow">Care, connected</p>
        <h1>Start your care journey.</h1>
        <p className="intro-copy">Create a secure account and keep your health information close, clear, and connected.</p>
      </section>
      <section className="auth-panel" aria-labelledby="register-title">
        <div className="panel-topline"><span>Create your account</span><span className="secure-label">Secure access</span></div>
        <div className="form-heading">
          <h2 id="register-title">Join Careline</h2>
          <p>Tell us a little about yourself to get started.</p>
        </div>
        <form className="auth-form register-form" onSubmit={handleSubmit}>
          <div className="name-fields"><div><label htmlFor="first-name">First name</label><input id="first-name" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Jane" autoComplete="given-name" required /></div><div><label htmlFor="last-name">Last name</label><input id="last-name" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Doe" autoComplete="family-name" required /></div></div>
          <label htmlFor="register-email">Email address</label>
          <input id="register-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
          <label htmlFor="register-password">Password</label>
          <input id="register-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" required />
          <label htmlFor="role">I am registering as</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required><option value="patient">Patient</option><option value="doctor">Doctor</option></select>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={isLoading}>{isLoading ? 'Creating account...' : 'Create account'} <span aria-hidden="true">→</span></button>
        </form>
        <p className="switch-prompt">Already have an account? <a className="switch-button" href="/login">Log in</a></p>
      </section>
    </main>
  );
}

export default Register;
