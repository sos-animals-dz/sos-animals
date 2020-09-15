import React, { Component } from 'react'

import closeIcon from "../assets/close.svg"
import errorIcon from "../assets/error.svg"
import successIcon from "../assets/success.svg"

interface IProps {
  isSuccess: boolean
  message: string
  isHidden: boolean
  hideToast: () => void
}

export default class Toast extends Component<IProps> {  
  render() {
    const { isSuccess, message, isHidden, hideToast } = this.props
    if ( isHidden ) return null
    return (
      <div className={`toast ${isSuccess ? "success" : "error"}`}>
        <div className="icon">
          <img src={ isSuccess ? successIcon : errorIcon } alt="toast icon" />
        </div>        
        <div className="message">
          <p>{ message }</p>
        </div>
        <div className="close-btn">
          <button onClick={hideToast}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </div>
      </div>
    )
  }
}
