import React from 'react'
import { Link } from 'react-router-dom'
import MissionTitle from '../components/MissionTitle.js'
import './style/HomeLawyerMissions.css'

const HomeStudentMissions = () => (
  <div className='home-admin-missions'>
    <Link  className='home-lawyer-missions-linkto-block1' to={`/missions`}><div className='home-lawyer-currentmissions'>
      <MissionTitle text='Missions en cours' />
    </div></Link>
    <Link className='home-admin-missions-linkto-block1' to={`/oldmissions`}><div className='home-lawyer-oldmissions'>
      <MissionTitle text='Historique des missions' />
    </div></Link>
  </div>
)

export default HomeStudentMissions
