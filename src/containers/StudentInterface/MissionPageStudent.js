import React from 'react'
import HomeStudentHeader from './HomeStudentHeader.js'
import MissionStudent from './MissionStudent.js'
import MissionPageHeader from '../MissionPageHeader.js'
import Footer from '../Footer.js'
import { verifToken } from '../../api.js';

class MissionPageStudent extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('token')
    if (token === null) { window.location.replace('/loginstudent') } else {
			verifToken(token)
			.then(response => {
        response.json().then(responseJson => {
          if (responseJson === 'notlogged') {
            window.location.replace('/loginstudent')
          }
        })
      })
    }
  }
  render () {
    return (
      <div>
        <HomeStudentHeader />
        <MissionPageHeader to='/student/missionslist' text='< Retour à la liste des missions' title='Mission en cours'/>
        <MissionStudent />
        <Footer />
      </div>
    )
  }
}

export default MissionPageStudent
