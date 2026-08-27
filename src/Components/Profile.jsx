import { useEffect, useState } from 'react';
import { api } from '../config/apiConfig';
import './Dashboard.css';

function Profile({ onBack }) {
  const role = (localStorage.getItem('role') || 'patient').toLowerCase();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get(role === 'doctor' ? 'doctors/profile' : 'patients/profile');
        setProfile(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || 'Unable to load your profile.');
      }
    };
    loadProfile();
  }, [role]);

  return (
    <main className="dashboard-page profile-page">
      <header className="dashboard-header"><a className="dashboard-brand" href="/dashboard">Careline<span>+</span></a><button className="profile-button" type="button" onClick={onBack}>← Back to dashboard</button></header>
      <section className="dashboard-body profile-body"><p className="dashboard-eyebrow">{role} profile</p><h1>Your profile</h1>{error && <p className="form-error" role="alert">{error}</p>}{profile ? <div className="profile-card">{Object.entries(profile).map(([key, value]) => <div className="profile-row" key={key}><span>{key.replace(/([A-Z])/g, ' $1')}</span><strong>{String(value)}</strong></div>)}</div> : !error && <p className="loading-text">Loading your profile...</p>}</section>
    </main>
  );
}

export default Profile;
