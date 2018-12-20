import React from 'react'
import MissionTitle from '../components/MissionTitle.js'
import PictoAdd from '../components/PictoAdd.js'
import './style/HomeLawyerNewMission.css'

const HomeLawyerNewMission = () => (
  <div className='home-lawyer-newmission'>
    <div>
      <MissionTitle text='Créer une nouvelle mission' />
      <PictoAdd classStyle='picto-add-mission' />
    </div>
  </div>
)

export default HomeLawyerNewMission
