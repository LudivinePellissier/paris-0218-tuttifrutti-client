import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { userInfoStudent } from '../../api.js'
import HeaderSite from '../HeaderSite.js'
import HeaderName from '../../components/HeaderName.js'
import HeaderParameters from '../../components/HeaderParameters.js'
import '../style/HomeLawyerHeader.css'
import ParametersStudent from '../../components/StudentInterface/ParametersStudent.js'

class HomeStudentHeader extends Component {
  state = {
    fisrtName: '',
    openModal: false
  }

  LogOut = (req, res) => {
    localStorage.removeItem('token')
    window.location.replace(`${window.location.origin}/loginstudent`)
  }

  onOpenModal = (e) => {
    e.preventDefault()
    this.setState({ openModal: true })
  }

  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  componentDidMount () {
    userInfoStudent().then(res =>
      this.setState({ firstName: res.firstName }))
	}

	parametersUpdated = (firstName) => {
		this.setState({ firstName: firstName })
}

  render () {
    const { openModal } = this.state

    return (
      <div>
        <HeaderSite click={this.LogOut} logout='Déconnexion' redirect='/student' />
        <div className='home-lawyer-header'>
          <div>
            <HeaderName text={this.state.firstName} />
            <HeaderParameters click={this.onOpenModal} />
          </div>
        </div>

        {/* Modal */}

        <Modal open={openModal} onClose={this.onCloseModal} center>
          <ParametersStudent update={this.parametersUpdated}/>
        </Modal>
      </div>
    )
  }
}
export default HomeStudentHeader
