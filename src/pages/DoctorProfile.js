import React, { useState, useEffect } from 'react';
import '../styles/DoctorProfile.css';
import Navbar from '../components/Navbar';

function DoctorProfile() {
  // Default doctor data
  const defaultDoctor = {
    name: "Dr. Sarah Ahmed",
    specialty: "Psychiatrist",
    subspecialties: ["Cognitive Behavioral Therapy", "Anxiety Disorders", "Depression Management"],
    bio: "With over 10 years of experience in mental health, Dr. Sarah specializes in cognitive behavioral therapy and mood disorders, providing compassionate and evidence-based care.",
    image: "/images/drsara.webp",
    certificates: [
      { title: "MD in Psychiatry - Cairo University", image: "/images/DPC1.png" },
      { title: "Certificate in Cognitive Behavioral Therapy - Beck Institute", image: "/images/DPC2.png" },
      { title: "Fellowship in Mood Disorders - University of London", image: "/images/DPC3.png" }
    ],
    appointments: [
      { date: "2025-05-01", time: "10:00 AM", patient: "John Doe" },
      { date: "2025-05-01", time: "11:00 AM", patient: "Emma Smith" },
      { date: "2025-05-02", time: "09:00 AM", patient: "Michael Brown" }
    ],
    reviews: [
      { patient: "Ali Hassan", rating: 5, comment: "Dr. Sarah is empathetic and professional. Highly recommend!", avatar: "/images/DP_I1.jpeg.jpg" },
      { patient: "Mona Khaled", rating: 4, comment: "Great experience, but the wait time could be improved.", avatar: "/images/DP_I2.jpeg.jpg" },
      { patient: "Youssef Omar", rating: 5, comment: "Very understanding and helped me a lot with my anxiety.", avatar: "/images/DP_I3.jpeg.jpg" },
      { patient: "Laila Mahmoud", rating: 3, comment: "Good session, but scheduling was a bit tricky.", avatar: "/images/DP_I4.jpg" }
    ],
    overview: [
      { title: "Patients", value: 127, icon: "fa-users", class: "patients" },
      { title: "Total Appointments", value: 342, icon: "fa-calendar-check", class: "appointments" },
      { title: "Completed Sessions", value: 298, icon: "fa-check-circle", class: "sessions" },
      { title: "Successful Sessions", value: 298, icon: "fa-trophy", class: "success" },
      { title: "Patients Helped", value: 127, icon: "fa-heart", class: "helped" },
      { title: "Years of Experience", value: 10, icon: "fa-clock", class: "experience" }
    ]
  };

  const [doctor, setDoctor] = useState(() => {
    try {
      const userData = localStorage.getItem('UserData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        // Map UserData to doctor state, fallback to defaultDoctor for missing fields
        return {
          name: parsedUserData.name || defaultDoctor.name,
          specialty: parsedUserData.specialization || defaultDoctor.specialty, // Note: UserData has 'specialization' as null
          subspecialties: parsedUserData.subspecialties || defaultDoctor.subspecialties,
          bio: parsedUserData.bio || defaultDoctor.bio,
          image: parsedUserData.image || defaultDoctor.image,
          certificates: parsedUserData.certificates && Array.isArray(parsedUserData.certificates)
            ? parsedUserData.certificates
            : defaultDoctor.certificates,
          appointments: parsedUserData.appointments && Array.isArray(parsedUserData.appointments)
            ? parsedUserData.appointments
            : defaultDoctor.appointments,
          reviews: parsedUserData.reviews && Array.isArray(parsedUserData.reviews)
            ? parsedUserData.reviews
            : defaultDoctor.reviews,
          overview: parsedUserData.overview && Array.isArray(parsedUserData.overview)
            ? parsedUserData.overview
            : defaultDoctor.overview,
          email: parsedUserData.email,
          phoneNumber: parsedUserData.phoneNumber,
          address: parsedUserData.address,
          city: parsedUserData.city,
          gender: parsedUserData.gender,
          roles: parsedUserData.roles,
          token: parsedUserData.token,
          isAuthenticated: parsedUserData.isAuthenticated
        };
      }
      return defaultDoctor;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return defaultDoctor;
    }
  });

  const [newCert, setNewCert] = useState({ title: "", file: null, preview: "" });
  const [profileForm, setProfileForm] = useState({
    name: doctor.name,
    specialty: doctor.specialty,
    subspecialties: doctor.subspecialties.join(", "),
    bio: doctor.bio,
    file: null,
    preview: doctor.image
  });
  const [errors, setErrors] = useState({});

  // Save doctor profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('doctorProfile', JSON.stringify(doctor));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [doctor]);

  // Sync profileForm when doctor state changes
  useEffect(() => {
    setProfileForm({
      name: doctor.name,
      specialty: doctor.specialty,
      subspecialties: doctor.subspecialties.join(", "),
      bio: doctor.bio,
      file: null,
      preview: doctor.image
    });
  }, [doctor]);

  const handleCertFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCert({
        ...newCert,
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleCertInputChange = (e) => {
    setNewCert({ ...newCert, title: e.target.value });
  };

  const addCertificate = () => {
    if (newCert.title && newCert.file) {
      setDoctor({
        ...doctor,
        certificates: [
          ...doctor.certificates,
          { title: newCert.title, image: newCert.preview }
        ]
      });
      setNewCert({ title: "", file: null, preview: "" });
    }
  };

  const deleteCertificate = (index) => {
    setDoctor({
      ...doctor,
      certificates: doctor.certificates.filter((_, i) => i !== index)
    });
  };

  const deleteAppointment = (index) => {
    setDoctor({
      ...doctor,
      appointments: doctor.appointments.filter((_, i) => i !== index)
    });
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileForm({
        ...profileForm,
        file,
        preview: URL.createObjectURL(file)
      });
      setErrors({ ...errors, image: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileForm.name.trim()) newErrors.name = "Name is required";
    if (!profileForm.specialty.trim()) newErrors.specialty = "Specialty is required";
    if (!profileForm.bio.trim()) newErrors.bio = "Bio is required";
    return newErrors;
  };

  const saveProfile = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setDoctor({
      ...doctor,
      name: profileForm.name,
      specialty: profileForm.specialty,
      subspecialties: profileForm.subspecialties
        ? profileForm.subspecialties.split(",").map(s => s.trim()).filter(s => s)
        : doctor.subspecialties,
      bio: profileForm.bio,
      image: profileForm.preview || doctor.image
    });
    setErrors({});
  };

  return (
    <div className="doctor-profile-page container py-5">
      <Navbar />

      {/* Doctor Info Section */}
      <div className="card shadow mb-5">
        <div className="card-body text-center">
          <img
            src={doctor.image}
            alt="Doctor"
            className="doctor-profile-img rounded-circle mb-3"
            style={{ width: "180px", height: "180px", objectFit: "cover", border: "4px solid #7f5c95" }}
          />
          <h2 className="card-title">{doctor.name}</h2>
          <h5 className="text-muted">{doctor.specialty}</h5>

          <p className="card-text">
            <strong>Address:</strong> {doctor.city}
          </p><p className="card-text">
            <strong>Subspecialties:</strong> {doctor.subspecialties.join(", ")}
          </p>

          {/* <p className="card-text">{doctor.bio}</p> */}
          <div className="social-links mb-3">

            <a href={`http://Wa.me/${doctor.phoneNumber}`} target="_blank" className="social-icon twitter">
              <i className="fab fa-whatsapp"></i>
            </a>

          </div>
          <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#editProfileModal">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                {errors.image && <div className="text-danger mt-1">{errors.image}</div>}
                {profileForm.preview && (
                  <img src={profileForm.preview} alt="Preview" className="profile-preview-img mt-2" />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileInputChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Specialty</label>
                <input
                  type="text"
                  className={`form-control ${errors.specialty ? 'is-invalid' : ''}`}
                  name="specialty"
                  value={profileForm.specialty}
                  onChange={handleProfileInputChange}
                />
                {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Subspecialties (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="subspecialties"
                  value={profileForm.subspecialties}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileInputChange}
                  rows="4"
                ></textarea>
                {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview and Reviews Section */}
      <div className="row">
        {/* Overview Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-header">
              <i className="fas fa-chart-line"></i>
              <h4>Overview</h4>
            </div>
            <div className="card-body overview-container">
              <div className="row">
                {doctor.overview && Array.isArray(doctor.overview) ? (
                  doctor.overview.map((item, index) => (
                    <div key={index} className="col-md-4 mb-3">
                      <div className={`overview-box ${item.class}`}>
                        <i className={`fas ${item.icon}`}></i>
                        <h5>{item.value}</h5>
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No overview data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-header">
              <i className="fas fa-star"></i>
              <h4>Patient Reviews</h4>
            </div>
            <div className="card-body reviews-container">
              {doctor.reviews && Array.isArray(doctor.reviews) && doctor.reviews.length > 0 ? (
                doctor.reviews.map((review, index) => (
                  <div key={index} className="border-bottom pb-3 mb-3 d-flex">
                    <img src={review.avatar} alt={review.patient} className="review-avatar" />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6>{review.patient}</h6>
                        <div className="star-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="card shadow mb-5">
        <div className="card-header">
          <i className="fas fa-certificate"></i>
          <h4>Certificates & Licenses</h4>
        </div>
        <div className="card-body">
          <div className="row">
            {doctor.certificates && Array.isArray(doctor.certificates) ? (
              doctor.certificates.map((cert, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="text-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="certificate-img"
                      data-bs-toggle="modal"
                      data-bs-target={`#certModal${index}`}
                    />
                    <p className="certificate-title">{cert.title}</p>
                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      onClick={() => deleteCertificate(index)}
                    >
                      <i className="fas fa-trash me-1"></i> Delete
                    </button>
                  </div>
                  {/* Modal for enlarged image */}
                  <div
                    className="modal fade"
                    id={`certModal${index}`}
                    tabIndex="-1"
                    aria-labelledby={`certModalLabel${index}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`certModalLabel${index}`}>
                            {cert.title}
                          </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                          <img src={cert.image} alt={cert.title} style={{ maxWidth: "100%", borderRadius: "10px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No certificates available.</p>
            )}
          </div>
          {/* Add New Certificate */}
          <div className="mt-4">
            <h5>Add New Certificate</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={newCert.title}
                  onChange={handleCertInputChange}
                  placeholder="Certificate Title"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleCertFileChange}
                />
                {newCert.preview && (
                  <img src={newCert.preview} alt="Preview" className="preview-img" />
                )}
              </div>
            </div>
            <button className="btn btn-outline-primary" onClick={addCertificate}>
              <i className="fas fa-plus me-2"></i>Add Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="card shadow mb-5">
        <div className="card-header">
          <i className="fas fa-calendar"></i>
          <h4>Appointments Schedule</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctor.appointments && Array.isArray(doctor.appointments) ? (
                  doctor.appointments.map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>{appt.patient}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteAppointment(index)}
                        >
                          <i className="fas fa-times me-1"></i>Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">No appointments available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;