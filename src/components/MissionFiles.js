import React from 'react'
import Modal from 'react-responsive-modal'
import Button from './Button.js'

class MissionFiles extends React.Component {
  state = {
    files: '',
    fileToDelete: {
      id: '',
      name: ''
    },
    open: false
  }

	onOpenModal = (event, id, name) => {
    event.preventDefault()
		this.setState({ open: true, fileToDelete: { id: id, name: name,} })
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

  deleteConfirmation = (id, name) => {
    return (
    <div className='mission-files-delete-confirm'>
      <p>Voulez-vous vraiment supprimer ce fichier ?</p>
      <p>{name}</p>
      <br/>
      <div className='mission-files-delete-confirm-buttons'>
        <Button onClick={this.onCloseModal} >Annuler</Button>
        <Button onClick={() => this.props.deleteFile(id)}>Confirmer</Button>
      </div>
    </div>
    )
  }

  showDeleteOption = (id, name) => {
    if (this.props.userType === this.props.sendedBy) {
      return (
        <div>
          <i onClick={(e) => this.onOpenModal(e, id, name)} style={{cursor: 'pointer'}}  class='fas fa-trash-alt icons' title='Supprimer'></i>
        </div>
      )
    }
  }

  showFiles = files => {
    if (files.length === 0) {
      return <div className='mission-nocontentyet'><span>Aucun fichier n'a encore été partagé.</span></div>
    } if (typeof files[0] === 'string') {
      return <div className='mission-nocontentyet'><span>{files}</span></div>
    } else {
      return files.map(file => { 
        const filename = file.name.slice(0,20)
        const filetypeArray = file.name.split('.')
        const filetype = filetypeArray.slice(-1)
        return (
        <div className='mission-files-onefile'>
          <div>
            <span><i class='fas fa-circle icons-circle'></i></span>
      <span>{filename}[...].{filetype}</span>
          </div>
          <div>
            <i onClick={() => this.props.downloadFile(file.id, this.props.missionId)} style={{cursor: 'pointer'}} class='fas fa-file-download icons' title='Télécharger'></i>
            {this.showDeleteOption(file.id, file.name)}
          </div>
        </div> 
      )})
    } 
  }

  render() {

    return (
      <div>
        <div>{this.showFiles(this.props.files)}</div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          {this.deleteConfirmation(this.state.fileToDelete.id, this.state.fileToDelete.name)}
        </Modal>
      </div>
    )
  }
}

export default MissionFiles
