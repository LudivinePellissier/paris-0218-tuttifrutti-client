import React from 'react'
import HomeStudentHeader from './HomeStudentHeader.js'
import OldMissionsStudent from './OldMissionsStudent.js'
import OldMissionsPageHeader from '../OldMissionsPageHeader.js'
import Footer from '../Footer.js'
import { verifToken } from '../../api.js'


class OldMissionsPageStudent extends React.Component {
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
        <HomeStudentHeader/>
        <OldMissionsPageHeader to='/student' text='< Retour au profil' />
        <OldMissionsStudent />
        <Footer />
      </div>
    )
  }
}

export default OldMissionsPageStudent
