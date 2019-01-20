import React from 'react'
import { userInfoLawyer, missionSendMessage } from '../api.js'
import './style/SendMessage.css'

class SendMessage extends React.Component {
    state = {
      userType: '',
			authorId: '',
			authorName: '',
      message: '',
			missionId: '',
    }

    componentDidMount() {
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
			const message = {
        date: Date.now(),
				authorName: this.state.authorName,
        authorId: this.state.authorId,
        authorType: this.state.userType,
				missionId: this.state.missionId,
        message: this.state.message,
			}

      missionSendMessage(message)
        .then(() => window.location.reload())
    }

  render() {
    return (
      <div className='form-send-message-container'>
        <form className="form-send-message" onSubmit={this.HandleSubmit}>
          <textarea className='form-textarea-send-message' name="message" placeholder="Message" id="message" onChange={this.UpdateField} required />
          <button className='send-message-button' title='Envoyer' type='submit'>
            <span className='far fa-share-square'></span>
          </button>
        </form>
      </div>
    )
  }
}

export default SendMessage
