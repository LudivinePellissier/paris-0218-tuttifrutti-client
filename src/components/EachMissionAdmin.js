import React from 'react'
import { Link } from 'react-router-dom'
import { getLawyerInfos } from '../api.js'
import Button from '../components/Button.js'
import MissionTitle from '../components/MissionTitle.js'
import MissionId from '../components/MissionId.js'
import MissionField from '../components/MissionField.js'
import MissionDeadline from '../components/MissionDeadline.js'
// import './style/AllMissions.css'

class EachMissionAdmin extends React.Component {
  state = {
    mission: {},
    cabinet: ''
  }

  componentDidMount() {
    this.setState({ mission: this.props.infos }, () => {
      getLawyerInfos(this.state.mission.author)
        .then(res => this.setState({ cabinet: res.cabinet }))
    })
  }

  render() {
    return (
      <div key={this.state.mission._id} className='each-mission-container'>
        <MissionTitle text={this.state.mission.name} />
        <MissionId text={this.state.mission._id} />
        <br />
        {this.state.cabinet}
        <br />
        <MissionField text={this.state.mission.field} />
        <MissionDeadline text={this.state.mission.deadline} />
        <div className='button-mission-more'>
          <Link to={`/admin/missions/${this.state.mission._id}`}><Button>Voir le détail</Button></Link>
        </div>
      </div>
    )
  }
}

export default EachMissionAdmin
