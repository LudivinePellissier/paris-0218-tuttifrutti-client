import React from 'react'
import { userInfoStudent, missionSendMessageToLawyer } from '../../api.js'
import Button from '../Button.js'
import '../style/SendMessage.css'

class SendMessage extends React.Component {
    state = {
      objet: '',
      message: '',
			lawyerId:  this.props.lawyerId,
			student: '',
			missionId: this.props.missionId,
			studentId: '',
      displayForm: 'block',
      displayConfirm: 'none',
    }

    componentDidMount() {
      userInfoStudent().then(res => this.setState({ studentId: res._id, student: res.firstName + ' ' + res.lastName }))
    }

    UpdateField = event => {
      this.setState({ [event.target.name]: event.target.value })
    }

    HandleSubmit = event => {
      event.preventDefault()

			this.setState({ displayForm: 'none', displayConfirm: 'block' })

			const messageContent = {
				student: this.state.student,
				objet: this.state.objet,
      	message: this.state.message,
      	lawyerId: this.state.lawyerId,
				missionId: this.state.missionId,
				studentId: this.state.studentId
			}

      const id = this.state.missionId
      console.log(messageContent)
			missionSendMessageToLawyer(id, messageContent)
    }

  render() {
    return (
      <div>
        <div style={{ display: this.state.displayForm }} className='send-message-content'>
          <div>
            <h1 className="title-send-message">Envoyer un message</h1>
            <div className='form-send-message-container'>
              <form className="form-send-message" onSubmit={this.HandleSubmit}>
                <div className='form-div'>
                  <input className='form-input-send-message' type="text" name="objet" placeholder="Objet du message" id="objet" onChange={this.UpdateField} required />
                </div>
                <div className='form-div'>
                  <textarea className='form-textarea-send-message' name="message" placeholder="Message" id="message" onChange={this.UpdateField} required />
                </div>
                <Button>Envoyer</Button>
              </form>
            </div>
          </div>
        </div>
        <div style={{ display: this.state.displayConfirm }} className='send-message-content'>
          <p>Votre message a bien été envoyé.</p>
          <div onClick={this.props.close}>
            <Button>Retour à la mission</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SendMessage
