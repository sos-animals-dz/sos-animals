import React, { FormEvent } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import logo from '../assets/logo-white.png';
// import pinIcon from '../assets/svg/pin.svg';

const ContactUs = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="contact-us">
      <Navbar isLoadingAnimals={false} loggedUser={null} allowBack />
      <div className="contact-content">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="SOS Animals DZ" />
          </div>

          <h1>How can we help you?</h1>
          <p className="intro">
            You&apos;ve got questions ? We&apos;ve got answers, or you can write
            us whatever you want, just don&apos;t be shy.
          </p>
        </div>

        <div className="content">
          <div className="map" />
          <span className="arrow" />
          <div className="contact-form">
            <form onSubmit={onSubmit}>
              <div className="input name">
                <label htmlFor="name">Your name:</label>
                <input type="text" name="name" id="name" />
              </div>

              <div className="input subject">
                <label htmlFor="subject">The subject:</label>
                <input type="text" name="subject" id="subject" />
              </div>

              <div className="input email">
                <label htmlFor="email">Your email:</label>
                <input type="text" name="email" id="email" />
              </div>

              <div className="input message">
                <label htmlFor="message">The message:</label>
                <textarea name="message" id="message" />
              </div>

              <div className="submit">
                <input type="submit" value="send" />
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
