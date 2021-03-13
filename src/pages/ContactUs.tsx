import React, { useState, ChangeEvent, FormEvent } from 'react';
import ReactMapGl, { ViewportProps } from 'react-map-gl';
import emailjs from 'emailjs-com';
import Markers from '../components/Markers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

import logo from '../assets/logo-white.png';

const ContactUs = () => {
  const {
    REACT_APP_SERVICE_ID,
    REACT_APP_TEMPLATE_ID,
    REACT_APP_USER_ID,
  } = process.env;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    maxZoom: 22,
    minZoom: 8,
    zoom: 12,
    longitude: 3.04197,
    latitude: 36.7525,
    bearing: 0,
    pitch: 10,
    altitude: 0,
    maxPitch: 60,
    minPitch: 0,
  });

  const [isSending, setSending] = useState(false);

  const [sendingStatus, setSendingStatus] = useState({ cls: '', text: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent<EventTarget>) => {
    setSending(true);
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    emailjs
      .sendForm(
        REACT_APP_SERVICE_ID || '',
        REACT_APP_TEMPLATE_ID || '',
        target,
        REACT_APP_USER_ID || ''
      )
      .then(
        () => {
          setSendingStatus({
            cls: 'success',
            text: 'Thank you. Your message has been sent.',
          });
          setSending(false);
          target.reset();

          setTimeout(() => {
            setSendingStatus({ cls: '', text: '' });
          }, 4500);
        },
        () => {
          setSendingStatus({
            cls: 'error',
            text: 'Sorry!. We could not send your message, please try again.',
          });
          setSending(false);

          setTimeout(() => {
            setSendingStatus({ cls: '', text: '' });
          }, 4500);
        }
      );
  };

  const displayAnimal = (id: number) => {
    console.log(id);
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
          <div className="map">
            <h2>You can find us in our place</h2>
            <ReactMapGl
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              zoom={viewport.zoom}
              bearing={viewport.bearing}
              pitch={viewport.pitch}
              altitude={viewport.altitude}
              maxZoom={viewport.maxZoom}
              maxPitch={viewport.maxPitch}
              minPitch={viewport.minPitch}
              width="100vw"
              height="100vh"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/amine77/ckgkbj8w51q0x19jxhs9q0n53"
              onViewportChange={(vport: ViewportProps) => setViewport(vport)}
              minZoom={12}
              mapOptions={{
                maxBounds: [
                  [2.65, 36.45],
                  [3.8, 36.95],
                ],
              }}
            >
              <Markers
                isSideOpen={false}
                animals={[
                  {
                    id: 0,
                    type: 'Other',
                    description: '',
                    marker: {
                      latitude: 36.77538553274006,
                      longitude: 3.0420708199186324,
                    },
                    created_at: new Date(),
                  },
                ]}
                displayAnimal={displayAnimal}
              />
            </ReactMapGl>
          </div>
          <div className="contact-form">
            <h2>Or you can send us a direct email</h2>
            <form onSubmit={onSubmit}>
              <div className="input name">
                <input
                  onChange={onChange}
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your name, ex: Jhon Doe"
                />
                <label htmlFor="name">
                  Your name: <span className="required">*</span>
                </label>
              </div>

              <div className="input subject">
                <input
                  onChange={onChange}
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="The email's subject, ex: Help needed"
                />
                <label htmlFor="subject">The subject:</label>
              </div>

              <div className="input email">
                <input
                  onChange={onChange}
                  type="text"
                  name="email"
                  id="email"
                  required
                  placeholder="Your email, ex: jhon.doe@email.com"
                />
                <label htmlFor="email">
                  Your email: <span className="required">*</span>
                </label>
              </div>

              <div className="input message">
                <textarea
                  onChange={onChange}
                  name="message"
                  id="message"
                  required
                  placeholder="Write whatever you want & just express yourself"
                />
                <label htmlFor="message">
                  The message: <span className="required">*</span>
                </label>
              </div>

              <div className="submit-wrap">
                <div className="submit">
                  <button type="submit" disabled={isSending}>
                    {isSending ? (
                      <Spinner
                        height={17}
                        width={17}
                        laoding={isSending}
                        borderColor="#fafbfc"
                        borderTopColor="#cc0202"
                      />
                    ) : (
                      <span>Send</span>
                    )}
                  </button>
                </div>

                <div className="sending-status">
                  <span className={sendingStatus.cls}>
                    {sendingStatus.text}
                  </span>
                </div>
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
