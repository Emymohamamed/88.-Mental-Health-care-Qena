import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

function Signup() {
	const [accountType, setAccountType] = useState('user');
	const [specializationIndex, setSpecializationIndex] = useState(0);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [ProfilePicture, setProfilePicture] = useState(null);
	const [licenseImage, setLicenseImage] = useState(null);
	const [specializations, setSpecializations] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSpecializations = async () => {
			try {
				const response = await axios.get('http://mentalhealth.runasp.net/api/Specialization');
				setSpecializations(response.data);
				console.log("specialization", specializations)
				// Assuming the API returns an array of specializations
			} catch (err) {
				setError('Failed to load specializations.');
			}
		};
		fetchSpecializations();
	}, []);

	const handleAccountTypeChange = (type) => {
		setAccountType(type);
		setSpecializationIndex(0);
		setProfilePicture(null);
		setLicenseImage(null);
	};

	const handleSpecializationChange = (e) => {
		setSpecializationIndex(parseInt(e.target.value, 10));
	};

	const getSpecializations = () => {
		// Filter specializations based on account type (you may need to adjust based on API response structure)
		return specializations.filter(spec =>
			(accountType === 'therapist' && spec.role === 1) ||
			(accountType === 'doctor' && spec.role === 0)
		);
	};

	const handleProfilePictureChange = (e) => {
		setProfilePicture(e.target.files[0]);
	};

	const handleLicenseImageChange = (e) => {
		setLicenseImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		const form = e.target;
		const formData = new FormData(form);
		const genderValue = formData.get('gender');
		const gender = genderValue === 'male' ? 0 : 1;
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		let data = new FormData();
		let url;
		if (accountType === 'user') {
			data.append('Name', formData.get('name'));
			data.append('Email', formData.get('email'));
			data.append('PhoneNumber', formData.get('phone'));
			data.append('Password', password);
			data.append('ConfirmPassword', confirmPassword);
			data.append('Address', formData.get('address'));
			data.append('BornDate', new Date(formData.get('dob')).toISOString());
			data.append('Gender', gender);
			if (ProfilePicture) data.append('ProfilePicture', ProfilePicture);

			if (!data.get('Name') || !data.get('Email') || !data.get('PhoneNumber') || !data.get('Password') || !data.get('ConfirmPassword') || !data.get('Address') || !data.get('BornDate') || genderValue === null) {
				setError('Please fill in all required fields.');
				return;
			}
			if (!ProfilePicture) {
				setError('Profile picture is required for all users.');
				return;
			}

			url = 'http://mentalhealth.runasp.net/api/Auth/RegistrationAsVisitor';
		} else if (accountType === 'therapist' || accountType === 'doctor') {
			data.append('License', licenseImage);
			data.append('ProfilePicture', ProfilePicture); // تأكد من أن ProfilePicture ليس null
			data.append('SpecializationID', specializationIndex);
			data.append('City', formData.get('city') || '');
			data.append('role', accountType === 'doctor' ? 0 : 1);
			data.append('Name', formData.get('name'));
			data.append('Email', formData.get('email'));
			data.append('PhoneNumber', formData.get('phone'));
			data.append('Password', password);
			data.append('ConfirmPassword', confirmPassword);
			data.append('Address', formData.get('address'));
			data.append('BornDate', new Date(formData.get('dob')).toISOString());
			data.append('Gender', gender);

			if (!data.get('Name') || !data.get('Email') || !data.get('PhoneNumber') || !data.get('Password') || !data.get('ConfirmPassword') || !data.get('Address') || !data.get('BornDate') || genderValue === null) {
				setError('Please fill in all required fields.');
				return;
			}
			if (!ProfilePicture) {
				setError('Profile picture is required.');
				return;
			}
			if (!licenseImage) {
				setError('License image is required for therapists and doctors.');
				return;
			}

			url = 'http://mentalhealth.runasp.net/api/Auth/RegistrationAsTherapistOrDoctor';
		} else {
			setError('Please select a valid account type.');
			return;
		}

		// فحص محتويات FormData للتأكد
		for (let [key, value] of data.entries()) {
			console.log(`${key}: ${value}`);
		}

		try {
			const response = await axios.post(url, data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			if (!response.data.success) {
				throw new Error(response.data.message || 'Failed to register.');
			}

			setSuccess('Account created successfully!');
			form.reset();
			setProfilePicture(null);
			setLicenseImage(null);

			if (accountType === 'user') {
				navigate('/posts');
			} else {
				navigate('/profile');
			}
		} catch (err) {
			setError(err.message || 'Something went wrong. Please try again.');
		}
	};

	return (
		<div className="suppage-signup-page">
			<div className="suppage-signup-wrapper">
				<div className="suppage-row">
					<div className="suppage-image-container">
						<img
							src="/images/sup.png"
							alt="Signup Illustration"
							className="suppage-signup-image suppage-img-fluid"
						/>
					</div>
					<div className="suppage-form-container">
						<div className="suppage-signup-container">
							<h3 className="suppage-mb-4 suppage-pb-2">Create an Account</h3>
							{error && <div className="suppage-alert suppage-alert-danger">{error}</div>}
							{success && <div className="suppage-alert suppage-alert-success">{success}</div>}
							<div className="suppage-mb-4 suppage-account-type-section">
								<h5>Select Account Type</h5>
								<div className="suppage-account-type-btn-group" role="group" aria-label="User type selection">
									<button
										type="button"
										className={`suppage-account-type-btn ${accountType === 'user' ? 'suppage-active' : ''}`}
										id="suppage-userBtn"
										onClick={() => handleAccountTypeChange('user')}
									>
										USER
									</button>
									<span className="suppage-account-type-separators"></span>
									<button
										type="button"
										className={`suppage-account-type-btn ${accountType === 'therapist' ? 'suppage-active' : ''}`}
										id="suppage-therapistBtn"
										onClick={() => handleAccountTypeChange('therapist')}
									>
										THERAPIST
									</button>
									<span className="suppage-account-type-separators"></span>
									<button
										type="button"
										className={`suppage-account-type-btn ${accountType === 'doctor' ? 'suppage-active' : ''}`}
										id="suppage-doctorBtn"
										onClick={() => handleAccountTypeChange('doctor')}
									>
										DOCTOR
									</button>
								</div>
							</div>
							<div className="suppage-col-12 suppage-mx-auto">
								<form id="suppage-signUpForm" className="suppage-custom-form suppage-contact-form" role="form" onSubmit={handleSubmit}>
									<div id="suppage-commonFields" className="suppage-d-flex suppage-flex-wrap suppage-gap-3">
										<div className="suppage-form-pair">
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="text"
													name="name"
													id="suppage-name"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Name"
													required
												/>
												<label htmlFor="suppage-name">Name</label>
											</div>
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="email"
													name="email"
													id="suppage-email"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Email address"
													required
												/>
												<label htmlFor="suppage-email">Email address</label>
											</div>
										</div>
										<div className="suppage-form-pair">
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="password"
													name="password"
													id="suppage-password"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Password"
													required
												/>
												<label htmlFor="suppage-password">Password</label>
											</div>
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="password"
													name="confirmPassword"
													id="suppage-confirmPassword"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Confirm Password"
													required
												/>
												<label htmlFor="suppage-confirmPassword">Confirm Password</label>
											</div>
										</div>
										<div className="suppage-form-pair">
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="tel"
													name="phone"
													id="suppage-phone"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Phone Number"
													required
												/>
												<label htmlFor="suppage-phone">Phone Number</label>
											</div>
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="text"
													name="address"
													id="suppage-address"
													className="suppage-form-control suppage-half-width-input"
													placeholder="Address"
													required
												/>
												<label htmlFor="suppage-address">Address</label>
											</div>
										</div>
										<div className="suppage-form-pair">
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="date"
													name="dob"
													id="suppage-dob"
													className="suppage-form-control suppage-half-width-input"
													placeholder="يوم‏/شهر‏/سنة"
													required
												/>
												<label htmlFor="suppage-dob">يوم‏/شهر‏/سنة</label>
											</div>
											<div className="suppage-mb-3 suppage-flex-fill">
												<div className="suppage-gender-container">
													<label className="suppage-form-label suppage-gender-label">Gender</label>
													<div className="suppage-gender-options">
														<div className="suppage-form-check suppage-gender-check">
															<input
																className="suppage-form-check-input"
																type="radio"
																name="gender"
																id="suppage-male"
																value="male"
																required
															/>
															<label className="suppage-form-check-label" htmlFor="suppage-male">
																Male
															</label>
														</div>
														<div className="suppage-form-check suppage-gender-check">
															<input
																className="suppage-form-check-input"
																type="radio"
																name="gender"
																id="suppage-female"
																value="female"
															/>
															<label className="suppage-form-check-label" htmlFor="suppage-female">
																Female
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="suppage-form-pair suppage-full-width">
											<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
												<input
													type="file"
													name="ProfilePicture"
													id="suppage-ProfilePicture"
													className="suppage-form-control suppage-large-input suppage-wide-input"
													placeholder="Upload Profile Picture"
													accept="image/*"
													onChange={handleProfilePictureChange}
													required
												/>
												<label htmlFor="suppage-ProfilePicture">Upload Profile Picture</label>
											</div>
										</div>
									</div>
									{(accountType === 'therapist' || accountType === 'doctor') && (
										<div id="suppage-therapistFields" className="suppage-d-flex suppage-flex-wrap suppage-gap-3 suppage-mt-3">
											<div className="suppage-form-pair suppage-full-width">
												<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
													<input
														type="file"
														name="License"
														id="suppage-license"
														className="suppage-form-control suppage-large-input suppage-wide-input"
														placeholder="Upload License"
														accept="image/*"
														onChange={handleLicenseImageChange}
														required
													/>
													<label htmlFor="suppage-license">Upload License</label>
												</div>
											</div>
											<div className="suppage-form-pair suppage-full-width suppage-specialization-row">
												<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
													<select
														name="specialization"
														id="suppage-specialization"
														className="suppage-form-select suppage-custom-select suppage-large-input suppage-wide-input"
														value={specializationIndex}
														onChange={handleSpecializationChange}
														required
													>
														<option value="0">Select specialization</option>
														{specializations.map((spec, index) => (
															<option key={spec.id || index} value={spec.id || index}>
																{spec.name || spec} {/* Adjust based on API response structure */}
															</option>
														))}
													</select>
													<label htmlFor="suppage-specialization">Select specialization</label>
												</div>
											</div>
											<div className="suppage-form-pair suppage-full-width">
												<div className="suppage-form-floating suppage-mb-3 suppage-flex-fill">
													<select
														name="city"
														id="suppage-city"
														className="suppage-form-select suppage-custom-select suppage-large-input suppage-wide-input"
														required
													>
														<option value="" disabled selected>Select city</option>
														<option value="Cairo">Cairo</option>
														<option value="Giza">Giza</option>
														<option value="Alexandria">Alexandria</option>
														<option value="Dakahlia">Dakahlia</option>
														<option value="Red Sea">Red Sea</option>
														<option value="Beheira">Beheira</option>
														<option value="Fayoum">Fayoum</option>
														<option value="Gharbia">Gharbia</option>
														<option value="Ismailia">Ismailia</option>
														<option value="Menofia">Menofia</option>
														<option value="Minya">Minya</option>
														<option value="Qaliubiya">Qaliubiya</option>
														<option value="New Valley">New Valley</option>
														<option value="Suez">Suez</option>
														<option value="Aswan">Aswan</option>
														<option value="Assiut">Assiut</option>
														<option value="Beni Suef">Beni Suef</option>
														<option value="Port Said">Port Said</option>
														<option value="Damietta">Damietta</option>
														<option value="Sharkia">Sharkia</option>
														<option value="South Sinai">South Sinai</option>
														<option value="Kafr El Sheikh">Kafr El Sheikh</option>
														<option value="Matrouh">Matrouh</option>
														<option value="Luxor">Luxor</option>
														<option value="Qena">Qena</option>
														<option value="North Sinai">North Sinai</option>
														<option value="Sohag">Sohag</option>
													</select>
													<label htmlFor="suppage-city">Select city</label>
												</div>
											</div>
										</div>
									)}
									<div className="suppage-mt-4">
										<button type="submit" className="suppage-btn suppage-btn-primary suppage-w-100">
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;