import React from 'react';

import closeIcon from '../assets/svg/close.svg';
import errorIcon from '../assets/svg/error.svg';
import successIcon from '../assets/svg/success.svg';

interface IProps {
  isSuccess: boolean;
  message: string;
  isHidden: boolean;
  setToast: (isSuccess: boolean, message: string, isHidden: boolean) => void;
}

export default function Toast(props: IProps) {
  const { isSuccess, message, isHidden, setToast } = props;
  if (isHidden) return null;
  return (
    <div className={`toast ${isSuccess ? 'success' : 'error'}`}>
      <div className="icon">
        <img src={isSuccess ? successIcon : errorIcon} alt="toast icon" />
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
      <div className="close-btn">
        <button type="button" onClick={() => setToast(false, '', true)}>
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
    </div>
  );
}
