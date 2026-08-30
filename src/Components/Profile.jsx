import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import { getDoctorProfile, updateDoctorProfile } from '../State/Doctor/Action';
import { getPatientProfile, updatePatientProfile } from '../State/Patient/Action';

const Profile = () => {
  const role = (localStorage.getItem('role') || 'PATIENT').toUpperCase();
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patientState = useSelector((state) => state.patient);
  const doctorState = useSelector((state) => state.doctor);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const profileData = role === 'PATIENT' ? patientState.patient : doctorState.doctor;
  const profileFields = role === 'PATIENT'
    ? ['age', 'email', 'firstName', 'lastName', 'password', 'role', 'sex']
    : ['age', 'email', 'firstName', 'lastName', 'password', 'role', 'sex', 'specialization', 'experienceYears', 'consultationFee', 'clinicAddress'];

  const editableFields = ['age', 'firstName', 'lastName', 'sex', 'specialization', 'experienceYears', 'consultationFee', 'clinicAddress'];

  useEffect(() => {
    if (role === 'DOCTOR') {
      dispatch(getDoctorProfile());
    }
    else if (role === 'PATIENT') {
      dispatch(getPatientProfile());
    }
  }, [dispatch, role, jwt]);

  const getFieldValue = (field) => {
    const doctorFields = ['specialization', 'experienceYears', 'consultationFee', 'clinicAddress'];
    if (doctorFields.includes(field)) {
      return profileData?.doctor?.[field] ?? 'Not provided';
    }
    return profileData?.user?.[field] ?? 'Not provided';
  };

  const getBasePayload = () => {
    if (role === 'DOCTOR') {
      const doctor = doctorState?.doctor || {};
      return {
        ...(doctor.user || {}),
        ...(doctor.doctor || {}),
        ...(doctor || {}),
      };
    }

    const patient = patientState?.patient || {};
    return {
      ...(patient.user || {}),
      ...(patient.patient || {}),
      ...(patient || {}),
    };
  };

  const handleEditStart = (field) => {
    const value = getFieldValue(field);
    setEditingField(field);
    setEditValue(value === 'Not provided' ? '' : String(value));
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleSaveEdit = async () => {
    if (!editingField) return;

    const numericFields = ['age', 'experienceYears', 'consultationFee'];
    const payload = {
      ...getBasePayload(),
      [editingField]: numericFields.includes(editingField) ? Number(editValue) : editValue,
    };

    if (role === 'DOCTOR') {
      await dispatch(updateDoctorProfile(payload));
      dispatch(getDoctorProfile());
    } else {
      await dispatch(updatePatientProfile(payload));
      dispatch(getPatientProfile());
    }

    handleCancelEdit();
  };

  return (
    <main className="dashboard-page profile-page">
      <header className="dashboard-header"><a className="dashboard-brand" href="/dashboard">Careline<span>+</span></a><button className="profile-button" type="button" onClick={() => navigate('/dashboard')}>← Back to dashboard</button></header>

      <section className="dashboard-body profile-body">
        <p className="dashboard-eyebrow">{role} profile</p>
        <h1>Your profile</h1>

        <div className="profile-table-wrapper">
          <table className="profile-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {profileFields.map((field) => (
                <tr key={field}>
                  <th style={{ border: '1px solid #dce1d9', padding: '0.8rem', textAlign: 'left' }}>{field.toUpperCase()}</th>
                  <td style={{ border: '1px solid #dce1d9', padding: '0.8rem' }}>
                    {editingField === field ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          style={{ flex: '1', minWidth: '180px', padding: '0.45rem 0.6rem' }}
                        />
                        <button type="button" onClick={handleSaveEdit}>Save</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                        <span>{getFieldValue(field)}</span>
                        {editableFields.includes(field) && (
                          <button type="button" onClick={() => handleEditStart(field)}>Edit</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Profile;
