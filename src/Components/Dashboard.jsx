import './Dashboard.css';

function Dashboard({ onProfile }) {
  const role = localStorage.getItem('role') || 'patient';

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <a className="dashboard-brand" href="/dashboard">Careline<span>+</span></a>
        <nav aria-label="Main navigation"><a className="nav-active" href="/dashboard">Overview</a><a href="/dashboard">Appointments</a><a href="/dashboard">Messages</a></nav>
        <button className="profile-button" type="button" onClick={onProfile}><span className="profile-avatar">{role.charAt(0).toUpperCase()}</span> View my profile</button>
      </header>
      <section className="dashboard-body">
        <p className="dashboard-eyebrow">Your health space</p>
        <h1>Good to see you.</h1>
        <p className="dashboard-subtitle">Keep track of your care and stay connected with your health team.</p>
        <div className="dashboard-grid"><article><span className="card-label">Next appointment</span><strong>No upcoming appointments</strong><a href="/dashboard">Book an appointment <span>→</span></a></article><article><span className="card-label">Your care team</span><strong>Stay connected</strong><p>Your doctors and care updates will appear here.</p></article></div>
      </section>
    </main>
  );
}

export default Dashboard;
