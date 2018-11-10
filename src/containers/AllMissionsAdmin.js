import React from 'react'
import { getAllMissions } from '../api.js'
import EachMissionAdmin from '../components/EachMissionAdmin.js'
import './style/AllMissions.css'

class AllMissionsAdmin extends React.Component {
  state = {
    allMissions: []
  }

  componentDidMount() {
    getAllMissions()
      .then(res => {
        this.setState({ allMissions: res })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    
    const showEachMission = this.state.allMissions.map(mission => <EachMissionAdmin infos={mission}/>)
    
    return (
      <div className='all-missions-container'>
        {showEachMission}
      </div>
    )
  }
}

export default AllMissionsAdmin
