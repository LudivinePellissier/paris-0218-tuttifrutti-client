import React from 'react'
import HomeAdminHeader from './HomeAdminHeader.js'
import MissionAdmin from '../containers/MissionAdmin.js'
import MissionPageHeader from '../containers/MissionPageHeader.js'
import Footer from '../containers/Footer.js'
import { verifToken } from '../api.js';

class MissionPageAdmin extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('token')
    if (token === null) { window.location.replace('/loginadmin') } else {
			verifToken(token)
			.then(response => {
        response.json().then(responseJson => {
          if (responseJson === 'notlogged') {
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
        <MissionPageHeader to='/admin/missionslist' text='< Retour à la liste des missions' title='Mission en cours'/>
        <MissionAdmin />
        <Footer />
      </div>
    )
  }
}

export default MissionPageAdmin
