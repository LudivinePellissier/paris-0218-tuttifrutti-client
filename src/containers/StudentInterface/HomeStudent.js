import React, { Component } from 'react'
import HomeStudentHeader from './HomeStudentHeader.js'
import HomeStudentMenu from './HomeStudentMenu.js'
import Footer from '../Footer.js'
import '../style/HomeAdmin.css'
import { verifToken } from '../../api.js';

class HomeStudent extends Component {
 
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
      <div className='home-admin'>
      <div><HomeStudentHeader /></div>
      <div><HomeStudentMenu /></div>
      <div><Footer /></div>
    </div>
    )
  }
}

export default HomeStudent
