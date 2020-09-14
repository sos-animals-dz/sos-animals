import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../firebase/utils'

import logo from  '../assets/logo.jpg'
import openEye from '../assets/eye-on.svg'
import closeEye from '../assets/eye-off.svg'

interface IState {
  email: string
  password: string
  isShow: boolean
  error: string | null
}

export default class Login extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      email: "",
      password: "",
      isShow: false,
      error: null
    }
  }

  onFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { email, password } = this.state
    try {
      await login(email, password)
    } catch (err) {
      this.setState({ error: err.message }, () => setTimeout(() => this.setState({ error: null }), 4500) )
    }
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState((state) => ({...state, [name]: value}))
  }

  toggleShowPassword = () => this.setState(({ isShow }) => ({ isShow: !isShow })) 

  render() {
    const { email, password, isShow, error } = this.state
    return (
      <div className="login-container">
        <Link to="/">
          <div className="header">
              <div className="logo">
                <img src={logo} alt="dz sos animal logo"/>
              </div>
              <h3>SOS Animal DZ</h3>
          </div>
        </Link>
        <form onSubmit={this.onFormSubmit}>
        {
          error && <p className="error">{error}</p>
        }
        <div className="input">
            <label>Your email: </label>
            <input type="email" onChange={this.onInputChange} value={email} name="email" />
          </div>
          <div className="input">
            <label>Your password: </label>
            <input type={isShow ? "text" : "password"} onChange={this.onInputChange} value={password} name="password" />
            <button type="button" onClick={this.toggleShowPassword} className="eye-btn">
              <img src={ isShow ? openEye : closeEye } alt="eye show/hide password" />
            </button>
          </div>
          <div className="buttons">
            <button type="submit">Login</button>
            <Link to="/" className="home-link">Home Page</Link>
          </div>
        </form>
      </div>
    )
  }
}
