import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../State/Appointment/Action';
import { getDoctorProfiles } from '../State/Doctor/Action';
import './Dashboard.css';

const CreateAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = (localStorage.getItem('role') || 'PATIENT').toUpperCase();
  const doctorState = useSelector((state) => state.doctor);
  const patientState = useSelector((state) => state.patient);

  const [filters, setFilters] = useState({
    specialization: '',
    experienceYears: '',
    maxConsultationFee: '',
  });

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    const params = {};

    if (filters.specialization) params.specialization = filters.specialization;
    if (filters.experienceYears) params.experienceYears = filters.experienceYears;
    if (filters.maxConsultationFee) params.maxConsultationFee = filters.maxConsultationFee;

    dispatch(getDoctorProfiles(params));    
  }, [dispatch, filters.specialization, filters.experienceYears, filters.maxConsultationFee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const doctors = Array.isArray(doctorState?.doctors) ? doctorState.doctors : [];

  const columns = [
    'specialization',
    'experienceYears',
    'consultationFee',
    'clinicAddress',
    'firstName',
    'lastName',
    'age',
    'sex',
    'email',
  ];

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  const handleSubmitAppointment = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: '' });

    console.log('Submitting appointment for doctorId:', selectedDoctorId, 'at:', appointmentDateTime);
    const patientId = patientState.patient.patient.id;

    const formattedDateTime = appointmentDateTime.length === 16
      ? `${appointmentDateTime}:00`
      : appointmentDateTime;

    const result = await dispatch(createAppointment({
      doctorId: Number(selectedDoctorId),
      patientId: Number(patientId),
      appointmentDateTime: formattedDateTime,
    }));

    if (result?.success) {
      setFeedback({ type: 'success', message: 'Appointment created successfully.' });
      setIsModalOpen(false);
      setAppointmentDateTime('');
      setSelectedDoctorId(null);
      navigate('/appointments');
      return;
    }

    setFeedback({
      type: 'error',
      message: result?.error || 'Failed to create appointment. Please try again.',
    });
  };

  const getFieldValue = (field, index) => {
    const doctorFields = ['specialization', 'experienceYears', 'consultationFee', 'clinicAddress'];
    if (doctorFields.includes(field)) {
      return doctors[index]?.doctor?.[field] ?? 'Not provided';
    }
    return doctors[index]?.user?.[field] ?? 'Not provided';
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <a className="dashboard-brand" href="/dashboard">Careline<span>+</span></a>
        <button className="profile-button" type="button" onClick={() => navigate('/dashboard')}>
          Back to dashboard
        </button>
      </header>
      <section className="dashboard-body">
        <p className="dashboard-eyebrow">Create appointment</p>
        <h1>Find a doctor</h1>

        <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={filters.specialization}
              onChange={handleChange}
              placeholder="e.g. cardiology"
            />
          </div>

          <div>
            <label>Experience Years</label>
            <input
              type="number"
              name="experienceYears"
              value={filters.experienceYears}
              onChange={handleChange}
              placeholder="5"
            />
          </div>

          <div>
            <label>Max Consultation Fee</label>
            <input
              type="number"
              name="maxConsultationFee"
              value={filters.maxConsultationFee}
              onChange={handleChange}
              placeholder="1000"
            />
          </div>
        </div>
        {feedback.message && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              background: feedback.type === 'success' ? '#e8f5e9' : '#fdecea',
              color: feedback.type === 'success' ? '#1f5f3a' : '#9b1c1c',
              border: `1px solid ${feedback.type === 'success' ? '#b7d9c1' : '#f3b5b5'}`,
            }}
          >
            {feedback.message}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="profile-table" style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #dce1d9', padding: '0.8rem', background: '#f3f6ee' }}>Action</th>
                {columns.map((column) => (
                  <th key={column} style={{ border: '1px solid #dce1d9', padding: '0.8rem', background: '#f3f6ee' }}>{column.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={`${doctor.doctor.id}-${index}`}>
                  <td style={{ border: '1px solid #dce1d9', padding: '0.8rem' }}>
                    {role === 'PATIENT' ? (
                      <button
                        type="button"
                        onClick={() => handleSelectDoctor(doctor.doctor.id)}
                        style={{
                          background: '#17463d',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 0.8rem',
                          cursor: 'pointer',
                          fontWeight: '600',
                        }}
                      >
                        Book
                      </button>
                    ) : (
                      <span style={{ color: '#7b7b7b' }}>Not allowed</span>
                    )}
                  </td>
                  {columns.map((column) => {
                    const value = getFieldValue(column, index);
                    return <td key={`${column}-${index}`} style={{ border: '1px solid #dce1d9', padding: '0.8rem' }}>{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}>
            <div style={{
              background: '#fff',
              width: 'min(420px, calc(100% - 2rem))',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
            }}>
              <h3>Select Date &amp; Time</h3>
              <form onSubmit={handleSubmitAppointment}>
                <label htmlFor="appointmentDateTime">Appointment Date and Time</label>
                <input
                  id="appointmentDateTime"
                  type="datetime-local"
                  value={appointmentDateTime}
                  onChange={(event) => setAppointmentDateTime(event.target.value)}
                  style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', padding: '0.7rem' }}
                  required
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.6rem 0.9rem' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ background: '#17463d', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1rem', cursor: 'pointer' }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CreateAppointment;
