// Write your code here
import './index.css'

const starUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const filledStarUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarIcon} = props
  const {title, date, isFavorite, id} = appointmentDetails

  const imgUrl = isFavorite ? filledStarUrl : starUrl

  const onClickStar = () => {
    onClickStarIcon(id)
  }

  return (
    <li className="list-item">
      <div className="list-item-top-section">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={onClickStar}
          testid="star"
        >
          <img src={imgUrl} alt="star" onClick={onClickStar} />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
