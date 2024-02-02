import {Link} from 'react-router-dom'
import './index.css'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="homeContainer">
      <div className="insideContainer">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="findJobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
