import './index.css'

const FilterItem = props => {
  const {employmentDetails, changeEmploymentId} = props
  const {employmentTypeId, label} = employmentDetails

  const getEmploymentId = () => {
    changeEmploymentId(employmentTypeId)
  }

  return (
    <li className="employmentList" onClick={getEmploymentId}>
      <input type="CheckBox" className="checkbox" id="boxes" />
      <label className="labelText" htmlFor="boxes">
        {label}
      </label>
    </li>
  )
}

export default FilterItem
