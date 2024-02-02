import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import ProfileContainer from '../ProfileContainer'
import JobCard from '../JobCard'
import Header from '../Header'
import FilterItem from '../FilterItem'
import FilterSalary from '../FilterSalary'

import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    apiStatus: '',
    searchInput: '',
    employmentId: '',
    salaryId: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  filterBasedOnEmploymentId = id => {
    this.setState({employmentId: id}, this.getJobs)
  }

  filterBasedOnSalary = rangeId => {
    this.setState({salaryId: rangeId}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {searchInput, employmentId, salaryId} = this.state
    const token = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentId}&minimum_package=${salaryId}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const responseData = await fetch(jobsUrl, options)
    if (responseData.ok === true) {
      const data = await responseData.json()
      const updatedCasesData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedCasesData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loaderArrange">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failureJobContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops!Something Went Wrong</h1>
      <p>We cannot seen to find the page you are looking for</p>
      <button type="button" className="retryButton">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsData} = this.state
    return (
      <ul className="unOrderedJobItem">
        {jobsData.map(eachItem => (
          <JobCard key={eachItem.id} card={eachItem} />
        ))}
      </ul>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  search = event => {
    this.setState({searchInput: event.target.value})
  }

  enterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobsContainer">
          <div className="profileAndFilterContainer">
            <ProfileContainer />
            <hr className="lineInProfile" />
            <h1 className="typeOfEmploymentHeading">Type of Employment</h1>
            <ul>
              {employmentTypesList.map(eachItem => (
                <FilterItem
                  key={eachItem.employmentTypeId}
                  employmentDetails={eachItem}
                  changeEmploymentId={this.filterBasedOnEmploymentId}
                />
              ))}
            </ul>
            <h1 className="typeOfEmploymentHeading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachItem => (
                <FilterSalary
                  key={eachItem.salaryRangeId}
                  salaryList={eachItem}
                  changeSalaryId={this.filterBasedOnSalary}
                />
              ))}
            </ul>
          </div>
          <div className="displayJobsContainer">
            <div className="searchContainer">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="inputBox"
                onChange={this.search}
                onKeyDown={this.enterSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
              >
                <BsSearch className="searchIcon" aria-label="close" />
              </button>
            </div>
            {this.renderAllProducts()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
