import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctor } from '../State/Doctor/Action';
import { deletePatient } from '../State/Patient/Action';
import { logout } from '../State/Auth/Action';
import { checkSymptoms } from '../State/Symptom/Action';
import { useState } from 'react';

const Dashboard = () => {
  const role = (localStorage.getItem('role') || 'PATIENT').toUpperCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const symptomState = useSelector((state) => state.symptom);
  const [symptoms, setSymptoms] = useState('');

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleDeleteProfile = async () => {
    try {
      if (role === 'DOCTOR') {
        await dispatch(deleteDoctor());
      } else {
        await dispatch(deletePatient());
      }
      const result = await dispatch(logout());
      if (result?.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Delete profile failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout());
      if (result?.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAppointment = () => {
    console.log('Navigating to appointment page');
    navigate('/create-appointment');
  };

  const handleShowAppointments = () => {
    console.log('Showing all appointment list');
    navigate('/appointments');
  };

  const handleCheckSymptoms = (symptoms) => {
    if (!symptoms.trim()) {
      return;
    }
    dispatch(checkSymptoms(symptoms.trim()));
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <span className="profile-avatar">{role}</span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="profile-button" type="button" onClick={handleProfile}>View my profile</button>
          <button className="profile-button" type="button" onClick={handleDeleteProfile} style={{ background: '#b11d1d' }}>
            Delete profile
          </button>
          <button className="profile-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <section className="dashboard-body">
        <p className="dashboard-eyebrow">Your health space</p>
        <h1>Good to see you.</h1>
        <p className="dashboard-subtitle">Keep track of your care and stay connected with your health team.</p>
        <div className="dashboard-grid">
          <article>
            <span className="card-label">Appointments</span>
            <strong>No upcoming appointments</strong>
            <div className="appointment-actions">
              <button type="button" className="text-link-button" onClick={handleAppointment}>Book an appointment <span>→</span></button>
              <button type="button" className="text-link-button" onClick={handleShowAppointments}>Show all appointments <span>→</span></button>
            </div>
          </article>
          <article>
            <span className="card-label">Your care team</span>
            <strong>Stay connected</strong>
            <p>Your doctors and care updates will appear here.</p>
          </article>
          {role === 'PATIENT' && (
          <article className="symptom-card">
            <span className="card-label">HEALTH ASSISTANT</span>

            <h2>Check your symptoms</h2>

            <p className="symptom-description">
              Describe how you are feeling and get a preliminary health assessment.
            </p>

            <textarea
              className="symptom-input"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms here..."
              rows={6}
            />

            <button
              type="button"
              className="check-symptoms-button"
              onClick={() => handleCheckSymptoms(symptoms)}
              disabled={symptomState.isLoading}
            >
              {symptomState.isLoading ? 'Checking...' : 'Check symptoms'}
              <span>→</span>
            </button>

            {symptomState.error && (
              <div className="symptom-error">
                {symptomState.error}
              </div>
            )}

            {symptomState.symptomResponse && (
              <div className="symptom-result">
                <div className="result-header">
                  <span className="result-label">ASSESSMENT RESULT</span>
                </div>

                <div className="result-section">
                  <h3>Possible causes</h3>
                  <p>
                    {symptomState.symptomResponse.possibleCauses}
                  </p>
                </div>

                <div className="result-section">
                  <h3>Severity</h3>
                  <p>
                    {symptomState.symptomResponse.severity}
                  </p>
                </div>

                <div className="result-section">
                  <h3>Recommended remedies</h3>
                  <p>
                    {symptomState.symptomResponse.remedies}
                  </p>
                </div>

                <div className="result-section">
                  <h3>When to seek care</h3>
                  <p>
                    {symptomState.symptomResponse.whenToSeekCare}
                  </p>
                </div>

                <div className="result-section">
                  <h3>Recommended tests</h3>
                  <p>
                    {symptomState.symptomResponse.recommendedTests}
                  </p>
                </div>

                <div className="result-section">
                  <h3>Lifestyle tips</h3>
                  <p>
                    {symptomState.symptomResponse.lifestyleTips}
                  </p>
                </div>

                <div className="doctor-recommendation">
                  <span>Recommended doctor</span>
                  <strong>
                    {symptomState.symptomResponse.typeOfDoctorToSeek}
                  </strong>
                </div>
              </div>
            )}
          </article>
        )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
