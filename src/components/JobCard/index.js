import './index.css'
import {BsGeoAlt, BsBriefcase} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {card} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = card
  return (
    <Link to={`/jobs/${id}`} className="cardDecoration">
      <li className="individualJobCard">
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
        <h1 className="descriptionHeading">Description</h1>
        <p className="descriptionPara">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
