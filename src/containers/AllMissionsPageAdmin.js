import React from 'react'
import HomeAdminHeader from './HomeAdminHeader.js'
import AllMissionsAdmin from '../containers/AllMissionsAdmin.js'
import MissionPageHeader from '../containers/MissionPageHeader.js'
import Footer from '../containers/Footer.js'
import { verifToken } from '../api.js'

class AllMissionsPageAdmin extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('token')
    if (token === null) {
      window.location.replace('/loginadmin')
    } else {
      verifToken(token)
			.then(response => {
        response.json().then(responseJson => {
          if (responseJson === 'not logged') {
            window.location.replace('/loginadmin')
          }
        })
			})
		}
  }

  render () {
    return (
      <div>
        <HomeAdminHeader />
        <MissionPageHeader to='/admin' text='< Retour au profil' title='Missions en cours'/>
        <AllMissionsAdmin />
        <Footer />
      </div>
    )
  }
}

export default AllMissionsPageAdmin
