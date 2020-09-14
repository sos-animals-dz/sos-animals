import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../firebase/utils'

import logo from  '../assets/logo.jpg'

interface IState {
  email: string
  password: string
  error: string | null
}

export default class Login extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      email: "",
      password: "",
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

  render() {
    const { email, password, error } = this.state
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
            <input type="password" onChange={this.onInputChange} value={password} name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
