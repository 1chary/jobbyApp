import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGeoAlt, BsBriefcase} from 'react-icons/bs'
import './index.css'
import SimilarJob from '../SimilarJob'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetailsRoute extends Component {
  state = {detailedJobView: [], apiStatus: '', similarJobsStorage: []}

  componentDidMount() {
    this.getDetailedProduct()
  }

  getDetailedProduct = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const detailedUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const getDetails = await fetch(detailedUrl, options)
    if (getDetails.ok === true) {
      const convertedData = await getDetails.json()
      console.log(convertedData)
      const jobDetails = {
        id: convertedData.job_details.id,
        companyLogoUrl: convertedData.job_details.company_logo_url,
        companyWebsiteUrl: convertedData.job_details.company_website_url,
        employmentType: convertedData.job_details.employment_type,
        jobDescription: convertedData.job_details.job_description,
        location: convertedData.job_details.location,
        packagePerAnnum: convertedData.job_details.package_per_annum,
        rating: convertedData.job_details.rating,
        title: convertedData.job_details.title,
        skills: convertedData.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: convertedData.job_details.life_at_company.description,
          imageUrl: convertedData.job_details.life_at_company.image_url,
        },
      }
      const similarJobs = convertedData.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        detailedJobView: jobDetails,
        similarJobsStorage: similarJobs,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobDetailsFailureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retryButton">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {similarJobsStorage, detailedJobView} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
    } = detailedJobView
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="jobDetailsContainer">
        <div className="interior insideJobDetailsContainer">
          <div className="detailsArrangeInRow">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="detailsLogo"
            />
            <div className="detailsArrangeInColumn">
              <h1 className="titleHeading">{title}</h1>
              <div className="starAndRating">
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationAndPackageContainer">
            <div className="locationContainer">
              <BsGeoAlt className="location" />
              <p className="locationPara">{location}</p>
              <BsBriefcase className="briefCase" />
              <p className="typeOfEmploy">{employmentType}</p>
            </div>
            <p className="locationPara">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="descriptionAndVisit">
            <h1 className="descriptionHeading">Description</h1>
            <a href={companyWebsiteUrl} className="visitHeading">
              visit
            </a>
          </div>
          <p className="descriptionPara">{jobDescription}</p>
          <h1 className="skillsHeading">Skills</h1>
          <ul className="unOrderedList">
            {skills.map(eachItem => (
              <li className="list">
                <img
                  src={eachItem.imageUrl}
                  className="skillImage"
                  alt={eachItem.name}
                />
                <p className="skillName">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="skillsHeading">Life at company</h1>
          <div className="lifeAtCompany">
            <div className="partPara">
              <p className="lifePara">{description}</p>
            </div>
            <img src={imageUrl} alt="life at company" className="lifeImage" />
          </div>
        </div>
        <h1 className="similarJobsHeading">Similar Jobs</h1>
        <ul className="similarJobList">
          {similarJobsStorage.map(eachItem => (
            <SimilarJob key={eachItem} similarJobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetailsContainer">
        <div className="insideJobDetailsContainer">{this.renderAll()}</div>
      </div>
    )
  }
}

export default JobItemDetailsRoute
