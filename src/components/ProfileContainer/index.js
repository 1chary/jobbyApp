import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProfileContainer extends Component {
  state = {profile: [], apiStatus: ''}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const profileData = await fetch(profileUrl, options)
    if (profileData.ok === true) {
      const convertedData = await profileData.json()
      const updatedProfile = {
        name: convertedData.profile_details.name,
        profileImageUrl: convertedData.profile_details.profile_image_url,
        shortBio: convertedData.profile_details.short_bio,
      }
      this.setState({profile: updatedProfile, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <button type="button" className="retryButton">
      Retry
    </button>
  )

  renderSuccessViews = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="imageContainer">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessViews()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return <div className="profileContainer">{this.renderAllViews()}</div>
  }
}

export default ProfileContainer
