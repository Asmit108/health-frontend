import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDoctor } from '../State/Doctor/Action';
import { deletePatient } from '../State/Patient/Action';
import { logout } from '../State/Auth/Action';

const Dashboard = () => {
  const role = (localStorage.getItem('role') || 'PATIENT').toUpperCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
