import {BsGeoAlt, BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="individualJobs">
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
      <h1 className="descriptionHeading">Description</h1>
      <p className="descriptionPara">{jobDescription}</p>
      <div className="similarJobsLocationContainer">
        <BsGeoAlt className="location" />
        <p className="locationPara">{location}</p>
        <BsBriefcase className="briefCase" />
        <p className="typeOfEmploy">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJob
