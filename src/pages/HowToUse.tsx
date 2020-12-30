import React from 'react';
import Navbar from '../components/Navbar';

import logo from '../assets/logo-white.png';
import addAnimal from '../assets/jpeg/add.jpg';
import pawprintIcon from '../assets/svg/pawprint.svg';
import pinIcon from '../assets/svg/pin.svg';
import donationIcon from '../assets/svg/donation.svg';

export default function HowToUse() {
  return (
    <div className="how-to-use">
      <Navbar isLoadingAnimals={false} loggedUser={null} allowBack />
      <div className="usage-content">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="SOS Animals DZ" />
          </div>

          <h1>Welcome to SOS Animals DZ&apos;s usage guide</h1>
          <p>
            In this guide we will show you how you can use this app and get the
            most out of it to help as many animals as possible.
          </p>
        </div>

        <div className="options">
          <p>We offer you three options on how you can help:</p>

          <div className="option">
            <div className="title">
              <img src={pawprintIcon} alt="pawprint" />
              <h2>1. Find And Help:</h2>
            </div>

            <ul>
              <li>
                <h4>Find An Animal:</h4>
                <p>
                  <b>Navigate the map</b> (in the Home Page) like any other map,
                  click, double click and drag. also you can search of a place
                  using the sreach icon in the nav bar.
                </p>
                <p>
                  In the map you will see <b>4 types of pins</b> (bird, dog, cat
                  and animal) and obviously each pin represents a type of an
                  animal.
                </p>
                <p>
                  <b>Click on a pin</b> of an animal to get the animal&apos;s
                  informations and how you can help it.
                </p>
              </li>

              <li>
                <h4>Help The Animal:</h4>
                <p>
                  You can help the animal <b>in person</b> by going where the
                  animal is and help it with what you can (food, medical
                  support, adopt ...), or you can help it through us.
                </p>
              </li>
            </ul>
          </div>

          <div className="option">
            <div className="title">
              <img src={pinIcon} alt="pin" />
              <h2>2. Pin Animals To The Map:</h2>
            </div>
            <p>
              If you have animal or saw an animal that <b>needs help, pin it</b>{' '}
              on the map,
            </p>

            <ul>
              <li>
                <h4>
                  Activate <b>Add Animal Mode</b>:
                </h4>
                <p>
                  By clicking on this button{' '}
                  <img className="icon" src={addAnimal} alt="add animal mode" />
                </p>
              </li>

              <li>
                <h4>Add It To The Map:</h4>
                <p>
                  In the map, navigate to exactly where the animal is, double
                  click on it, add the necessary informations, and hit{' '}
                  <b>save</b>.
                </p>
              </li>
            </ul>
          </div>

          <div className="option">
            <div className="title">
              <img src={donationIcon} alt="donation" />
              <h2>3. Help Us Helping Animals:</h2>
            </div>
            <p>
              You can donate to us money, food, medical support... or with
              whatever that you can, it is really appreciated and we will make
              sure to help as many animals as possible.
            </p>

            <p>You can always reach us anytime you want in:</p>

            <ul>
              <li>
                <span>
                  <i>Email:</i> sos-animals-dz@gmail.com
                </span>
              </li>
              <li>
                <span>
                  <i>Phone:</i> +213777000000
                </span>
              </li>

              <li>
                <span>
                  <i>Address:</i> Algerie, Algerie, Algerie
                </span>
              </li>

              <li>
                <span>
                  <i>Facebook:</i> page or account
                </span>
              </li>

              <li>
                <span>
                  <i>Twitter:</i> account
                </span>
              </li>

              <li>
                <span>
                  <i>Instagram:</i> account
                </span>
              </li>

              <li>
                <b>Donate: </b>
                <span>
                  <i>CCP Account:</i> 46464654646546456 / 464646
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
