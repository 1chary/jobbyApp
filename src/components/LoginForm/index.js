import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="userNameHeading" htmlFor="PASSWORD">
          PASSWORD
        </label>
        <input
          type="password"
          id="PASSWORD"
          value={password}
          className="inputBox"
          placeholder=" Password"
          onChange={this.changePassword}
        />
      </>
    )
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label className="userNameHeading" htmlFor="USERNAME">
          USERNAME
        </label>
        <input
          type="text"
          id="USERNAME"
          value={username}
          className="inputBox"
          placeholder=" Username"
          onChange={this.changeUserName}
        />
      </>
    )
  }

  renderOnSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  userNameAndPasswordDidNotMatch = errorMsg =>
    this.setState({showError: true, errorMsg})

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }
    const responseData = await fetch(url, options)
    const data = await responseData.json()
    if (responseData.ok === true) {
      this.renderOnSubmitSuccess(data.jwt_token)
    } else {
      this.userNameAndPasswordDidNotMatch(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <form className="detailsContainer" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          {this.renderUserName()}
          {this.renderPassword()}
          <button className="logInButton" type="submit">
            Login
          </button>
          {showError && <p className="errorMessage">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
