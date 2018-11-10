import React from 'react'
import './style/MissionId.css'

const MissionId = ({text}) => {
  return ( text 
  ? <div>
      <p className='mission-id'>Mission n°{text.slice(-5)}</p>
    </div>
  : <div>Mission ID</div>
)}
export default MissionId
