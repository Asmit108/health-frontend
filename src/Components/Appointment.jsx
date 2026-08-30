import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAppointment, getAppointmentsByDoctor, getAppointmentsByPatient, rescheduleAppointment, updateAppointmentStatus } from '../State/Appointment/Action';

const Appointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem('role') || 'PATIENT';

  const patientState = useSelector((state) => state.patient);
  const doctorState = useSelector((state) => state.doctor);
  const appointmentState = useSelector((state) => state.appointment);

  const [rescheduleModal, setRescheduleModal] = useState({ open: false, appointmentId: null, value: '' });
  const [statusModal, setStatusModal] = useState({ open: false, appointmentId: null, value: '' });

  const patientId = patientState.patient?.patient?.id;
  const doctorId = doctorState.doctor?.doctor?.id;

  useEffect(() => {
    if (role === 'DOCTOR' && doctorId) {
      console.log('get appointments');
      dispatch(getAppointmentsByDoctor(doctorId));
    } else if (role === 'PATIENT' && patientId) {
      console.log('get appointments');
      dispatch(getAppointmentsByPatient(patientId));
    }
  }, [dispatch, role, doctorId, patientId]);

  const appointments = Array.isArray(appointmentState?.appointments)
    ? appointmentState.appointments
    : [];

  const tableColumns = appointments.length > 0
    ? Object.keys(appointments[0])
    : ['doctorId', 'patientId', 'appointmentDateTime', 'status'];

  const handleRescheduleSubmit = async () => {
    if (!rescheduleModal.appointmentId || !rescheduleModal.value) return;

    await dispatch(rescheduleAppointment(rescheduleModal.appointmentId, rescheduleModal.value));
    setRescheduleModal({ open: false, appointmentId: null, value: '' });

    if (role === 'DOCTOR' && doctorId) {
      dispatch(getAppointmentsByDoctor(doctorId));
    } else if (role === 'PATIENT' && patientId) {
      dispatch(getAppointmentsByPatient(patientId));
    }
  };

  const handleStatusSubmit = async () => {
    if (!statusModal.appointmentId || !statusModal.value) return;

    await dispatch(updateAppointmentStatus(statusModal.appointmentId, statusModal.value));
    setStatusModal({ open: false, appointmentId: null, value: '' });

    if (role === 'DOCTOR' && doctorId) {
      dispatch(getAppointmentsByDoctor(doctorId));
    } else if (role === 'PATIENT' && patientId) {
      dispatch(getAppointmentsByPatient(patientId));
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (role !== 'PATIENT') return;

    await dispatch(deleteAppointment(appointmentId));

    if (patientId) {
      await dispatch(getAppointmentsByPatient(patientId));
    }
  };

  const renderCell = (appointment, key, index) => {
    if (key === 'appointmentDateTime') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span>{appointment[key] ?? 'N/A'}</span>
          {role === 'PATIENT' ? (
            <button
              type="button"
              onClick={() => setRescheduleModal({ open: true, appointmentId: appointment.id, value: appointment[key] ?? '' })}
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            >
              Reschedule
            </button>
          ) : (
            <span style={{ color: '#7b7b7b', fontSize: '0.8rem' }}>Not allowed</span>
          )}
        </div>
      );
    }

    if (key === 'status') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span>{appointment[key] ?? 'N/A'}</span>
          {role === 'DOCTOR' ? (
            <button
              type="button"
              onClick={() => setStatusModal({ open: true, appointmentId: appointment.id, value: appointment[key] ?? '' })}
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
            >
              Update
            </button>
          ) : (
            <span style={{ color: '#7b7b7b', fontSize: '0.8rem' }}>Not allowed</span>
          )}
        </div>
      );
    }

    return appointment[key] ?? 'N/A';
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <a className="dashboard-brand" href="/dashboard">Careline<span>+</span></a>
        <button className="profile-button" type="button" onClick={() => navigate('/dashboard')}>← Back to dashboard</button>
      </header>

      <section className="dashboard-body">
        <p className="dashboard-eyebrow">Appointments</p>
        <h1>All appointments</h1>

        {appointments.length > 0 ? (
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table className="profile-table" style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {tableColumns.map((key) => (
                    <th key={key} style={{ border: '1px solid #dce1d9', padding: '0.8rem', textAlign: 'left', background: '#f3f6ee' }}>{key}</th>
                  ))}
                  {role === 'PATIENT' && (
                    <th style={{ border: '1px solid #dce1d9', padding: '0.8rem', textAlign: 'left', background: '#f3f6ee' }}>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id ?? `${appointment.doctorId}-${appointment.patientId}-${appointment.appointmentDateTime}-${index}`}>
                    {tableColumns.map((key) => (
                      <td key={`${key}-${index}`} style={{ border: '1px solid #dce1d9', padding: '0.8rem' }}>
                        {renderCell(appointment, key, index)}
                      </td>
                    ))}
                    {role === 'PATIENT' && (
                      <td style={{ border: '1px solid #dce1d9', padding: '0.8rem' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          style={{ background: '#b11d1d', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.45rem 0.7rem', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No appointments found.</p>
        )}
      </section>

      {rescheduleModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', width: 'min(420px, calc(100% - 2rem))', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 12px 30px rgba(0,0,0,0.22)' }}>
            <h3>Reschedule appointment</h3>
            <label htmlFor="reschedule-date">New date and time</label>
            <input
              id="reschedule-date"
              type="datetime-local"
              value={rescheduleModal.value}
              onChange={(event) => setRescheduleModal((prev) => ({ ...prev, value: event.target.value }))}
              style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', padding: '0.7rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" onClick={() => setRescheduleModal({ open: false, appointmentId: null, value: '' })}>Cancel</button>
              <button type="button" onClick={handleRescheduleSubmit} style={{ background: '#17463d', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1rem', cursor: 'pointer' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {statusModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', width: 'min(420px, calc(100% - 2rem))', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 12px 30px rgba(0,0,0,0.22)' }}>
            <h3>Update appointment status</h3>
            <label htmlFor="status-select">Select status</label>
            <select
              id="status-select"
              value={statusModal.value}
              onChange={(event) => setStatusModal((prev) => ({ ...prev, value: event.target.value }))}
              style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1rem', padding: '0.7rem' }}
            >
              <option value="">Select status</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" onClick={() => setStatusModal({ open: false, appointmentId: null, value: '' })}>Cancel</button>
              <button type="button" onClick={handleStatusSubmit} style={{ background: '#17463d', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1rem', cursor: 'pointer' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Appointment;
