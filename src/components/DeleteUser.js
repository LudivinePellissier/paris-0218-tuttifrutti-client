import React from 'react'
import Button from './Button.js'
import './style/SendMessage.css'

class DeleteUser extends React.Component {
    state = {
      user: this.props.userData,
    }

  delete = (id) => {
    this.props.delete(id)
    .then(() => this.props.update())
    .then(() => this.props.close())
  }

  render() {
    const nameUserToDelete = this.state.user.cabinet ? this.state.user.cabinet : this.state.user.firstName + ' ' + this.state.user.lastName

    return (
      <div>
        <div style={{ display: this.state.displayForm }} className='send-message-content'>
          <div>
            <h1 className="title-send-message">Supprimer un compte</h1>
            <p>Attention, vous êtes sur le point de supprimer le compte de {nameUserToDelete}.</p>
            <div onClick={() => this.delete(this.state.user._id)}>
            <Button>Confirmer</Button>
            </div>
            <div onClick={this.props.close}>
            <Button>Annuler</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteUser
