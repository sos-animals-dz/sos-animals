import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../firebase/utils'

import Spinner from '../components/Spinner'

import logo from  '../assets/logo.jpg'
import openEye from '../assets/eye-on.svg'
import closeEye from '../assets/eye-off.svg'

interface IState {
  email: string
  password: string
  isShow: boolean
  error: string | null
  isLoading: boolean
}

export default class Login extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      email: "",
      password: "",
      isShow: false,
      error: null,
      isLoading: false
    }
  }

  onFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { email, password } = this.state
    try {
      this.setState({ isLoading: true })
      await login(email, password)
      this.setState({ isLoading: false })
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
    const { email, password, isShow, error, isLoading } = this.state
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
        {
          isLoading && <Spinner width={25} height={25} laoding={isLoading} borderColor="#fafbfc" borderTopColor="transparent"  />
        }

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
