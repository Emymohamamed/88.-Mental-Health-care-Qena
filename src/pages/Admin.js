import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, setCurrentTab }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('UserData');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div
      className={`admin-sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}
    >
      <div className="admin-sidebar-header">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="admin-sidebar-logo" />
          <h1 className="admin-sidebar-title">Mental Health</h1>
        </div>
        <button onClick={toggleSidebar} className="admin-sidebar-close md:hidden">
          ✕
        </button>
      </div>
      <nav>
        <ul>
          <li className="admin-sidebar-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('dashboard');
              }}
              className="admin-sidebar-link"
            >
              <span className="admin-sidebar-icon">📊</span> Dashboard
            </a>
          </li>
          <li className="admin-sidebar-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('appointments');
              }}
              className="admin-sidebar-link"
            >
              <span className="admin-sidebar-icon">🩺</span> Manage Appointments
            </a>
          </li>
          <li className="admin-sidebar-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('therapists');
              }}
              className="admin-sidebar-link"
            >
              <span className="admin-sidebar-icon">👥</span> Review Therapists
            </a>
          </li>
          <li className="admin-sidebar-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('settings');
              }}
              className="admin-sidebar-link"
            >
              <span className="admin-sidebar-icon">⚙️</span> Settings
            </a>
          </li>
          <li className="admin-sidebar-item">
            <a
              href="#"
              onClick={handleLogout}
              className="admin-sidebar-link"
            >
              <span className="admin-sidebar-icon">🚪</span> Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const StatsCard = ({ title, value, icon, bgColor }) => (
  <div className={`admin-stats-card ${bgColor}`}>
    <span className="admin-stats-icon">{icon}</span>
    <div>
      <h3 className="admin-stats-title">{title}</h3>
      <p className="admin-stats-value">{value}</p>
    </div>
  </div>
);

const BarChart = () => {
  const heights = {
    Jan: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Feb: { appointments: 60, cancellations: 20, sessions: 80, pending: 40 },
    Mar: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Apr: { appointments: 50, cancellations: 20, sessions: 40, pending: 0 },
    May: { appointments: 70, cancellations: 20, sessions: 90, pending: 50 },
    Jun: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Jul: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Aug: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Sep: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
    Oct: { appointments: 50, cancellations: 20, sessions: 40, pending: 0 },
    Nov: { appointments: 50, cancellations: 20, sessions: 80, pending: 60 },
    Dec: { appointments: 50, cancellations: 20, sessions: 30, pending: 0 },
  };

  return (
    <div className="admin-chart-card">
      <h3 className="admin-chart-title">Appointment Trends</h3>
      <div className="admin-bar-chart">
        {Object.keys(heights).map((month, index) => (
          <div key={month} className="admin-bar-container">
            <div
              className="admin-bar admin-bar-pending"
              style={{ height: `${heights[month].pending}px` }}
            ></div>
            <div
              className="admin-bar admin-bar-sessions"
              style={{ height: `${heights[month].sessions}px` }}
            ></div>
            <div
              className="admin-bar admin-bar-cancellations"
              style={{ height: `${heights[month].cancellations}px` }}
            ></div>
            <div
              className="admin-bar admin-bar-appointments"
              style={{ height: `${heights[month].appointments}px` }}
            ></div>
            <p className="admin-bar-label">{month}</p>
          </div>
        ))}
      </div>
      <div className="admin-chart-legend">
        <span className="admin-legend-item">
          <span className="admin-legend-color appointments"></span> Appointments
        </span>
        <span className="admin-legend-item">
          <span className="admin-legend-color cancellations"></span> Cancellations
        </span>
        <span className="admin-legend-item">
          <span className="admin-legend-color sessions"></span> Sessions
        </span>
        <span className="admin-legend-item">
          <span className="admin-legend-color pending"></span> Pending
        </span>
      </div>
    </div>
  );
};

const MentalHealthStats = () => {
  const statsData = [
    { title: 'Anxiety Cases', value: 25, color: '#60A5FA' },
    { title: 'Depression Cases', value: 20, color: '#F87171' },
    { title: 'Stress Levels', value: 30, color: '#A78BFA' },
  ];

  useEffect(() => {
    statsData.forEach((stat, index) => {
      const ctx = document.getElementById(`pie-chart-${index}`).getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [stat.title, 'Other'],
          datasets: [
            {
              data: [stat.value, 100 - stat.value],
              backgroundColor: [stat.color, '#E5E7EB'],
              borderWidth: 0,
              hoverOffset: 20,
            },
          ],
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      });
    });
  }, []);

  return (
    <div className="admin-chart-card">
      <h3 className="admin-chart-title text-center text-blue-600">
        Mental Health Statistics
      </h3>
      <div className="admin-stats-grid">
        {statsData.map((stat, index) => (
          <div key={stat.title} className="admin-stat-item">
            <div className="admin-pie-chart-container">
              <canvas id={`pie-chart-${index}`}></canvas>
              <div className="admin-pie-chart-value">
                <p className="admin-stat-value">{stat.value}%</p>
              </div>
            </div>
            <p className="admin-stat-title">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://mentalhealth.runasp.net/api/Appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://mentalhealth.runasp.net/api/AppointmentStatus/${id}`, { status: newStatus }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error('Failed to update appointment status:', error);
    }
  };

  return (
    <div className="admin-table-card">
      <h3 className="admin-table-title">Manage Appointments</h3>
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Therapist</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient}</td>
                <td>{appointment.therapist}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className="admin-status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReviewTherapists = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('http://mentalhealth.runasp.net/api/TherapistOrDoctor/GetAllDoctorsOrTherapistsNotApproved');
        setTherapists(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch therapists:', error);
      }
    };
    fetchTherapists();
  }, []);

  // const handleApprove = async (id) => {
  //   const token = localStorage.getItem('token'); // أو 'accessToken' حسب اسم المفتاح عندك

  //   try {
  //     await axios.put(`http://mentalhealth.runasp.net/api/TherapistOrDoctor/ApproveDoctor/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setTherapists(therapists.filter(therapist => therapist.id !== id));
  //   } catch (error) {
  //     console.error('Failed to approve therapist:', error);
  //   }
  // };
  // const token = localStorage.getItem('token'); // أو 'accessToken' حسب اسم المفتاح عندك

  // const handleReject = async (id) => {
  //   try {
  //     await axios.delete(`http://mentalhealth.runasp.net/api/TherapistOrDoctor/RejectDoctor/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })

  //     setTherapists(therapists.filter(therapist => therapist.id !== id));
  //   } catch (error) {
  //     console.error('Failed to reject therapist:', error);
  //   }
  // };


  const handleApprove = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token once per function call

    if (!token) {
      console.error('No token available for authentication');
      return; // Exit if no token is found
    }

    try {
      await axios.put(
        `http://mentalhealth.runasp.net/api/TherapistOrDoctor/ApproveDoctor/${id}`,
        {}, // Empty data object if no payload is needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTherapists(therapists.filter(therapist => therapist.id !== id));
    } catch (error) {
      console.error('Failed to approve therapist:', error);
      // Add user feedback here if needed, e.g., alert('Approval failed. Please check your authentication.');
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token once per function call

    if (!token) {
      console.error('No token available for authentication');
      return; // Exit if no token is found
    }

    try {
      await axios.delete(`http://mentalhealth.runasp.net/api/TherapistOrDoctor/RejectDoctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTherapists(therapists.filter(therapist => therapist.id !== id));
    } catch (error) {
      console.error('Failed to reject therapist:', error);
      // Add user feedback here if needed, e.g., alert('Rejection failed. Please check your authentication.');
    }
  };




  return (
    <div className="admin-table-card">
      <h3 className="admin-table-title">Review Therapists</h3>
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Certificate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <tr key={therapist.id}>
                <td>{therapist.name}</td>
                <td>{therapist.nameOfSpecialization}</td>
                <td>
                  <a href={therapist.pathOfLicence} target="_blank" rel="noreferrer">
                    <img
                      src={therapist.pathOfLicence}
                      alt="Certificate"
                      className="admin-certificate-img"
                    />
                  </a>
                </td>
                <td>{therapist.status || 'Pending'}</td>
                <td>
                  <button
                    onClick={() => handleApprove(therapist.id)}
                    className="admin-action-button bg-green-500 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(therapist.id)}
                    className="admin-action-button bg-red-500"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SettingsTab = () => {
  const [profilePic, setProfilePic] = useState('/images/profile.jpg');
  const [adminName, setAdminName] = useState('Admin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savedSettings, setSavedSettings] = useState({
    profilePic: '/images/profile.jpg',
    adminName: 'Admin',
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setSavedSettings({ profilePic, adminName });
    if (password) {
      alert('Password updated successfully!');
    }
    alert('Settings saved successfully!');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="admin-settings-card">
      <h3 className="admin-settings-title">Settings</h3>
      <div className="admin-settings-form">
        <div className="admin-form-group">
          <label className="admin-form-label">Profile Picture</label>
          <div className="admin-profile-pic-container">
            <img src={profilePic} alt="Profile" className="admin-profile-pic" />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="admin-file-input"
            />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Admin Name</label>
          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="admin-text-input"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-text-input"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="admin-text-input"
          />
        </div>
        <button onClick={handleSave} className="admin-save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');

  const toggleSidebar = () => {
    console.log('Toggling sidebar, current state:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-page">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentTab={setCurrentTab}
      />
      <div className="admin-main-content">
        <div className="admin-header">

          <div className="admin-header-left">

            <button
              onClick={toggleSidebar}
              className="admin-menu-button md:hidden"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h2 className="admin-header-title">
              {currentTab === 'settings'
                ? 'Settings'
                : currentTab === 'appointments'
                  ? 'Manage Appointments'
                  : currentTab === 'therapists'
                    ? 'Review Therapists'
                    : 'Dashboard'}
            </h2>
          </div>
        </div>
        {currentTab === 'settings' ? (
          <SettingsTab />
        ) : currentTab === 'appointments' ? (
          <ManageAppointments />
        ) : currentTab === 'therapists' ? (
          <ReviewTherapists />
        ) : (
          <>
            <div className="admin-stats-grid">
              <StatsCard
                title="Total Appointments"
                value="1,250"
                icon="📅"
                bgColor="bg-blue-400"
              />
              <StatsCard
                title="Active Therapists"
                value="85"
                icon="🩺"
                bgColor="bg-indigo-400"
              />
              <StatsCard
                title="User Satisfaction"
                value="92%"
                icon="😊"
                bgColor="bg-purple-400"
              />
            </div>
            <div className="admin-charts-grid">
              <BarChart />
              <MentalHealthStats />
            </div>
            <ManageAppointments />
            <ReviewTherapists />
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;