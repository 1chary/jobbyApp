import './index.css'

const FilterSalary = props => {
  const {salaryList, changeSalaryId} = props
  const {salaryRangeId, label} = salaryList

  const getSalaryId = () => {
    changeSalaryId(salaryRangeId)
  }

  return (
    <li className="employmentList" onClick={getSalaryId}>
      <input type="Radio" className="checkbox" id="radio" />
      <label className="labelText" htmlFor="radio">
        {label}
      </label>
    </li>
  )
}

export default FilterSalary
