import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="headerContainer">
      <Link to="/">
        <button type="button" className="websiteLogoButton">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logoSettings"
          />
        </button>
      </Link>

      <ul className="homeAndJobs">
        <Link to="/" className="linkItem">
          <li className="listStyleType">Home</li>
        </Link>
        <Link to="/jobs" className="linkItem">
          <li className="listStyleType">Jobs</li>
        </Link>
      </ul>
      <button className="logOutButton" type="button" onClick={onClickLogOut}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
