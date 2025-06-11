import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Terms.css';

function Terms() {
  return (
    <div className="terms-page">
      <Navbar />
      <Container className="terms-container">
        <Row>
          <Col>
            <section className="terms-section">
              <h1>Terms and Conditions</h1>
              <p>
                Welcome to <strong>أُنس</strong>, your online platform for mental health support. By accessing or using
                this website, you agree to be bound by the following terms and conditions. Please read them carefully.
              </p>

              <h2>1. User Accounts</h2>
              <p>
                1.1 <strong>Account Creation:</strong> In order to use certain features on the site, users must create a
                personal account by providing accurate and complete information. You are responsible for maintaining the
                confidentiality of your account information and notifying us of any unauthorized use of your account.
              </p>
              <p>
                1.2 <strong>Account Responsibility:</strong> You are solely responsible for all activity under your
                account, including any content you submit to the platform.
              </p>

              <h2>2. Use of the Website</h2>
              <p>
                2.1 <strong>Personal Use:</strong> The content provided on Unas is for personal and non-commercial use
                only. You agree not to use the website for any illegal or harmful activities.
              </p>
              <p>
                2.2 <strong>Prohibited Content:</strong> You agree not to post any content that is harmful, offensive, or
                violates the rights of others. This includes content that promotes violence, discrimination, or illegal
                activities.
              </p>

              <h2>3. Privacy and Data Protection</h2>
              <p>
                3.1 <strong>Data Collection:</strong> We collect personal information such as name, email address, and
                health-related data in order to provide the best mental health services tailored to your needs.
              </p>
              <p>
                3.2 <strong>Data Use:</strong> Your personal data will only be used for the purpose of offering our
                services. We do not share your personal data with third parties without your explicit consent, unless
                required by law.
              </p>
              <p>
                3.3 <strong>Confidentiality:</strong> The results of any psychological assessments or consultations you
                perform via our platform will remain confidential and will only be used to provide personalized
                recommendations and support.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                4.1 <strong>Ownership:</strong> All content on the Unas website, including but not limited to text,
                graphics, logos, and images, is the property of Unas or licensed to us. All rights are reserved.
              </p>
              <p>
                4.2 <strong>Content Use:</strong> You may not copy, modify, distribute, or republish any content from the
                website for commercial purposes without prior written consent from Unas.
              </p>

              <h2>5. Liability</h2>
              <p>
                5.1 <strong>Limitation of Liability:</strong> Unas is not liable for any damages arising from the use of
                this website or for any loss of data or service interruptions. We aim to provide accurate information but
                cannot guarantee the absolute correctness of all materials on the platform.
              </p>
              <p>
                5.2 <strong>External Links:</strong> The website may contain links to third-party websites. Unas is not
                responsible for the content, privacy practices, or activities of these external sites.
              </p>

              <h2>6. Modifications to the Terms</h2>
              <p>
                We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this
                page, and your continued use of the website constitutes your acceptance of the updated terms.
              </p>

              <h2>7. Termination</h2>
              <p>
                7.1 <strong>Account Termination:</strong> We may suspend or terminate your account if you violate any of
                these terms or engage in activities that disrupt the platform’s functionality or harm other users.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These terms are governed by the laws of [Insert Country/Region]. Any disputes will be resolved under the
                jurisdiction of the courts in [Insert Jurisdiction].
              </p>
            </section>

            <section className="doctor-interaction-section">
              <h1>Doctor Interaction Terms</h1>
              <p>
                By using our platform for psychological consultations or medical referrals, you agree to the following
                terms regarding interactions with doctors:
              </p>

              <h2>1. Doctor Selection</h2>
              <p>
                1.1 <strong>Choosing a Doctor:</strong> You may choose a doctor from our list of professionals based on
                your needs and preferences. We recommend reviewing their profiles, expertise, and ratings before making a
                selection.
              </p>

              <h2>2. Consultation & Booking</h2>
              <p>
                2.1 <strong>Consultation Scheduling:</strong> You may schedule consultations via our platform, subject to
                the doctor's availability. Please ensure accurate details when booking.
              </p>
              <p>
                2.2 <strong>Consultation Fees:</strong> Fees for consultations will be displayed before booking. Payments
                must be made through our secure payment system.
              </p>

              <h2>3. Confidentiality</h2>
              <p>
                3.1 <strong>Privacy:</strong> All communications during your consultation with a doctor will be kept
                confidential and handled in compliance with our Privacy Policy.
              </p>

              <h2>4. Doctor’s Responsibilities</h2>
              <p>
                4.1 <strong>Service Quality:</strong> Doctors are expected to provide professional and ethical services.
                Any issues related to the quality of service may be reported through our platform for resolution.
              </p>
            </section>

            <section className="privacy-section">
              <h1>Privacy Policy</h1>
              <p>
                At <strong>أُنس</strong>, your privacy is important to us. This Privacy Policy explains how we collect,
                use, and protect your personal information.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect personal information that you provide when registering, using the website, or interacting with
                our services. This may include:
              </p>
              <ul>
                <li>Personal identification details (name, email, etc.)</li>
                <li>Health and mental wellness data</li>
                <li>Interaction data with our chatbot and psychological assessments</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide personalized mental health support and recommendations</li>
                <li>Offer psychological assessments and track your progress</li>
                <li>Improve the website and enhance your user experience</li>
              </ul>

              <h2>3. Data Protection</h2>
              <p>
                We take reasonable steps to protect your personal information from unauthorized access, alteration, or
                destruction. However, no data transmission over the Internet is completely secure, and we cannot guarantee
                the absolute security of your information.
              </p>

              <h2>4. Sharing Your Information</h2>
              <p>We do not share your personal information with third parties except in the following circumstances:</p>
              <ul>
                <li>When required by law or to comply with legal processes</li>
                <li>With your consent, for specific purposes like medical referrals</li>
              </ul>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. You can update your account
                details through the platform or contact our support team for assistance.
              </p>

              <h2>6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we
                encourage you to review it periodically.
              </p>
            </section>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Terms;