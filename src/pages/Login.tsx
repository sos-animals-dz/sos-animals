import React, { Component, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logo from  '../assets/logo.jpg'

interface IState {
  username: string
  password: string
}

export default class Login extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  onFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    console.log(this.state)
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    this.setState((state) => ({...state, [name]: value}))
  }

  render() {
    const { username, password } = this.state
    return (
      <div className="login-container">
        <Link to="/">
          <div className="header">
              <div className="logo">
                <img src={logo} alt="dz sos animal logo"/>
              </div>
              <h3>DZ SOS Animal</h3>
          </div>
        </Link>
        <form onSubmit={this.onFormSubmit}>
        <div className="input">
            <label>Your username: </label>
            <input type="text" onChange={this.onInputChange} value={username} name="username" />
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
