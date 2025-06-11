import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/UserProfile.css';
import Navbar from '../components/Navbar';

function UserProfile() {
    const [user] = useState({
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        phone: "0123456789",
        avatar: "images/t1.jpg"
    });

    const nextSession = {
        date: "2025-04-22",
        time: "11:00 AM",
        type: "Follow-up Session"
    };

    const sessions = [
        { id: 1, date: "2025-04-15", time: "10:00 AM", type: "Psychological Consultation", patientStatus: "The patient suffers from severe anxiety but responded positively to the discussion" },
        { id: 2, date: "2025-04-10", time: "02:00 PM", type: "Therapy Session", patientStatus: "Noticeable improvement in mood compared to the previous session" }
    ];

    const testResults = [
        { id: 1, testName: "Anxiety Test", score: 75, date: "2025-04-05" },
        { id: 2, testName: "Depression Test", score: 60, date: "2025-04-01" }
    ];

    return (
        <div className="user-profile-container container my-5">
            <Navbar />

            <div className="card mb-4">
                <div className="card-body text-center">
                    <img src={user.avatar} alt="Profile Picture" className="rounded-circle mb-3" style={{ width: '150px', border: '3px solid var(--primary-color)' }} />
                    <h2 className="card-title">{user.name}</h2>
                    <p className="card-text"><i className="bi bi-envelope-fill icon"></i> {user.email}</p>
                    <p className="card-text"><i className="bi bi-telephone-fill icon"></i> {user.phone}</p>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    <h3 className="mb-0"><i className="bi bi-calendar-event icon"></i> Next Session</h3>
                </div>
                <div className="card-body d-flex justify-content-between align-items-center">
                    {nextSession ? (
                        <div>
                            <p><strong><i className="bi bi-calendar-date icon"></i> Date:</strong> {nextSession.date}</p>
                            <p><strong><i className="bi bi-clock icon"></i> Time:</strong> {nextSession.time}</p>
                            <p><strong><i className="bi bi-tags icon"></i> Session Type:</strong> {nextSession.type}</p>
                        </div>
                    ) : (
                        <p>No upcoming sessions booked.</p>
                    )}
                    <Link to="/booking" className="btn btn-book">
                        <i className="bi bi-plus-circle icon"></i> Book New Session
                    </Link>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    <h3 className="mb-0"><i className="bi bi-journal-text icon"></i> Session History</h3>
                </div>
                <div className="card-body">
                    {sessions.length > 0 ? (
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th>Patient Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{session.date}</td>
                                        <td>{session.time}</td>
                                        <td>{session.type}</td>
                                        <td>{session.patientStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No session records found.</p>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-header" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    <h3 className="mb-0"><i className="bi bi-clipboard-data icon"></i> Test Results</h3>
                </div>
                <div className="card-body">
                    {testResults.length > 0 ? (
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Test Name</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testResults.map(result => (
                                    <tr key={result.id}>
                                        <td>{result.testName}</td>
                                        <td>{result.score}%</td>
                                        <td>{result.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No test results available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
