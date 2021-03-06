import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-responsive-modal'
import { userInfoAdmin } from '../api.js'
import HeaderSite from './HeaderSite.js'
import HeaderName from '../components/HeaderName.js'
import HeaderParameters from '../components/HeaderParameters.js'
import './style/HomeAdminHeader.css'
import ParametersAdmin from '../components/ParametersAdmin.js'

class HomeAdminHeader extends Component {
	state = {
    admin: '',
    openModal: false
  }

  LogOut = (req, res) => {
    localStorage.removeItem('token')
    window.location.replace(`${window.location.origin}/loginadmin`)
  }

  onOpenModal = (e) => {
    e.preventDefault()
    this.setState({ openModal: true })
  }

  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  componentDidMount () {
    userInfoAdmin().then(res =>
      this.setState({ admin: res.firstName + ' ' + res.lastName }))
	}

	parametersUpdated = (firstname, lastname) => {
      this.setState({ admin: firstname + ' ' + lastname })
	}

  render () {
    const { openModal } = this.state

    return (
      <div>
        <HeaderSite click={this.LogOut} logout='Déconnexion' redirect='/loginadmin' />
        <div className='home-admin-header'>
          <div>
						<HeaderName text=
						{this.state.admin}
						/>
						<HeaderParameters
						click={this.onOpenModal}
						/>
          </div>
        </div>

        {/* Modal */}

        <Modal open={openModal} onClose={this.onCloseModal} center>
          <ParametersAdmin update={this.parametersUpdated}/>
        </Modal>
      </div>
    )
  }
}
export default HomeAdminHeader
