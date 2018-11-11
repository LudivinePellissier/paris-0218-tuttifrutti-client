import React from 'react'
import { Link } from 'react-router-dom'
import { userInfoStudent, getMissionsByStudentId } from '../../api.js'
import Button from '../../components/Button.js'
import MissionTitle from '../../components/MissionTitle.js'
import MissionId from '../../components/MissionId.js'
import MissionField from '../../components/MissionField.js'
import MissionDeadline from '../../components/MissionDeadline.js'
import '../style/AllMissions.css'

class AllMissionsStudent extends React.Component {
  state = {
    allMissions: [],
    student: {}
  }

  componentDidMount() {
    userInfoStudent()
    .then(res =>
      this.setState({
        student: {
          id: res._id
        }
      }))
    .then(() => {
      const studentId = this.state.student.id
			getMissionsByStudentId(studentId)
        .then(res => {
          this.setState({ allMissions: res })
        })
        .catch((error) => {
          console.log(error);
        })
      }
    )
  }

  render() {

    const eachMission = mission => {
      return (
        <div key={mission._id} className='each-mission-container'>
          <MissionTitle text={mission.name} />
          <MissionId text={mission._id} />
					<br />
          <MissionField text={mission.field} />
          <MissionDeadline text={mission.deadline} />
					<div className='button-mission-more'>
            <Link to={`/student/missions/${mission._id}`}><Button>Voir le détail</Button></Link>
          </div>
        </div>
      )
    }

    const showEachMission = this.state.allMissions.map(eachMission)

    return (
      <div className='all-missions-container'>
        {showEachMission}
      </div>
    )
  }
}

export default AllMissionsStudent
