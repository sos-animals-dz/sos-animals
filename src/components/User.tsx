import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../firebase/utils';

import logoutIcon from '../assets/svg/logout.svg';
import homeIcon from '../assets/svg/home.svg';
import dashboardIcon from '../assets/svg/dashboard.svg';

interface IProps {
  isAdmin?: boolean;
}

export default function User(props: IProps) {
  const { isAdmin } = props;
  return (
    <div className="user">
      {isAdmin ? (
        <Link className="home-link" to="/">
          <img src={homeIcon} alt="Home page" title="Home page" />
        </Link>
      ) : (
        <Link className="dashboard-link" to="/admin">
          <img src={dashboardIcon} alt="dashboard" title="admin dashboard" />
        </Link>
      )}
      <button type="button" className="logout-btn" onClick={logout}>
        <img src={logoutIcon} alt="logout" title="logout" />
      </button>
    </div>
  );
}

User.defaultProps = {
  isAdmin: false,
};
