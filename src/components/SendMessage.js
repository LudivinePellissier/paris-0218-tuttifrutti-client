import React from 'react'
import { userInfoLawyer, missionSendMessage } from '../api.js'
import Button from './Button.js'
import './style/SendMessage.css'

class SendMessage extends React.Component {
    state = {
      userType: '',
			authorId: '',
			authorName: '',
      message: '',
			missionId: '',
      displayForm: 'block',
      displayConfirm: 'none',
    }

    componentDidMount() {
      console.log(this.props)
      userInfoLawyer()
        .then(res => this.setState({ 
          authorId: res._id, 
          authorName: res.cabinet.slice(0,1) + '.',
			    missionId: this.props.missionId,
          userType: this.props.userType,
        }))
    }

    UpdateField = event => {
      this.setState({ [event.target.name]: event.target.value })
    }

    HandleSubmit = event => {
      event.preventDefault()

      this.setState({ displayForm: 'none', displayConfirm: 'block' })
      

			const message = {
        date: Date.now(),
				authorName: this.state.authorName,
        authorId: this.state.authorId,
        authorType: this.state.userType,
				missionId: this.state.missionId,
        message: this.state.message,
			}

			const id = this.state.missionId
			missionSendMessage(message)
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
