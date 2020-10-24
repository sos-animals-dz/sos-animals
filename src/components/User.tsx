import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../firebase/utils';

import logoutIcon from '../assets/svg/logout.svg';
import settingsIcon from '../assets/svg/settings.svg';

interface IProps {
  isAdmin?: boolean;
}

export default function User(props: IProps) {
  const { isAdmin } = props;
  return (
    <div className="user">
      {isAdmin ? (
        <Link className="home-link" to="/">
          Home
        </Link>
      ) : (
        <Link className="logout-link" to="/admin">
          <img src={settingsIcon} alt="dashboard" title="admin dashboard" />
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
