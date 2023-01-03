// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isFilterActive: false,
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const formattedDate =
      date !== '' ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    console.log(formattedDate)
    console.log(date)
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onChangedate = event => {
    this.setState({date: event.target.value})
  }

  onClickStarIcon = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(eachObj => eachObj.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const starBtn = isFilterActive ? 'starred-btn' : ''
    const filteredAppointmentList = this.getFilteredList()

    return (
      <div className="app-container">
        <form className="appointments-container" onSubmit={this.addAppointment}>
          <div className="top-section">
            <div className="inputs-container">
              <div className="text-container">
                <h1>Add Appointment</h1>
                <div className="field-container">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="title-element"
                    placeholder="TITLE"
                    value={title}
                    onChange={this.onChangetitle}
                  />
                </div>
                <div className="field-container">
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="date-element"
                    value={date}
                    onChange={this.onChangedate}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>

            <hr className="saperator" />
            <div className="bottom-section">
              <h1>Appointments</h1>
              <button
                className={`btn ${starBtn}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  onClickStarIcon={this.onClickStarIcon}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </form>
      </div>
    )
  }
}

export default Appointments
