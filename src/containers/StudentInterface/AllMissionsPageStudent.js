import React from 'react'
import HomeStudentHeader from './HomeStudentHeader.js'
import AllMissionsStudent from './AllMissionsStudent.js'
import MissionPageHeader from '../MissionPageHeader.js'
import Footer from '../Footer.js'
import { verifToken } from '../../api.js'

class AllMissionsPageStudent extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('token')
    if (token === null) {
      window.location.replace('/loginstudent')
    } else {
      verifToken(token)
			.then(response => {
        response.json().then(responseJson => {
          if (responseJson === 'not logged') {
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
        <MissionPageHeader to='/student' text='< Retour au profil' title='Missions en cours'/>
        <AllMissionsStudent />
        <Footer />
      </div>
    )
  }
}

export default AllMissionsPageStudent
