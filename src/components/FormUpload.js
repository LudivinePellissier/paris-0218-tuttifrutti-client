import React, { Component } from 'react'
import Button from './Button.js'
import './style/FormUpload.css'
import PictoAdd from './PictoAdd.js'
import Modal from 'react-responsive-modal'
import { missionUploadFile, missionStockUploadedFileInfos } from '../api.js'
import { throws } from 'assert';

class FormUpload extends Component {
  state = {
    missionId: this.props.missionId,
    description: '',
    selectedFile: '',
    fileUploaded: false,
    errorMessage: '',
    fileSended: '',
    userType: this.props.userType,
    open: false,
  }

  resetSelectedFile = () => {
    this.setState({ selectedFile: '', fileUploaded: false, description: '', errorMessage: '' })
  }

  onOpenModal = (e) => {
    e.preventDefault()
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
  }


  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0], errorMessage: '' })
        break
      default:
        this.setState({ [e.target.name]: e.target.value, errorMessage: '' })
    }
  }

  afterChosenFile = async (e) => {
    if (this.state.open === false) {
      this.onOpenModal(e)
    }
    this.onChange(e)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description, selectedFile } = this.state
    let formData = new FormData()
    formData.append('description', description)
    formData.append('selectedFile', selectedFile)

    this.setState({ uploading: true })

    missionUploadFile(formData)
      .then(res => {
          this.setState({
            uploading: false,
            fileUploaded: true,
            fileSended: this.state.selectedFile.name
          },
            async () => {
              const fileId = res.data.fileId
              const fileName = await this.state.fileSended
              const mission = await this.state.missionId
              const userType = await this.state.userType
              missionStockUploadedFileInfos(mission, fileName, fileId, userType)
                .then(() => {
                  window.location.reload()
                })

            }
          )
      }).catch(err => {
        console.log(err.response)
        this.resetSelectedFile()
        this.setState({
          errorMessage:
            err.response.data.split('body')[1].split('<br> &nbsp; ')[0].slice()
            + ' / maximum 5mo',
          selectedFile: '',
          uploading: false,
          fileUploaded: false
        })
      })
  }
  
  showRetryAddFileSystem = () => {
    return (
      <form onSubmit={this.onSubmit}>
      <label for='file'><div className='formupload-label-file'>
        <i class="fas fa-plus-circle picto-add-file"></i>
        <span>Choisir un nouveau fichier</span></div>
      </label>
      <input id='file' className='formupload-input-file'
        type="file"
        name="selectedFile"
        onChange={this.afterChosenFile}
        />
      </form>
    )
  }
  
  displayModalContent = () => {
    if (this.state.fileUploaded === false) {
      if (this.state.errorMessage !== '') {
        return (
          <div className='mission-upload-error'>
            <p>Désolée, votre fichier n'est pas approprié.</p>
            <p className='error-upload'>{this.state.errorMessage}</p>
            <br />
            <div className='mission-upload-confirm-buttons'>
              <Button onClick={this.onCloseModal} >Annuler</Button>
              <div>{this.showRetryAddFileSystem()}</div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <p>
              {this.state.selectedFile.name}
              <span className='delete-file' onClick={() => this.resetSelectedFile()}> x</span>
            </p>
            {this.state.uploading
              ? <p>Envoi en cours...</p>
              : <div onClick={this.onSubmit}>
                <Button>Envoyer le document</Button>
              </div>
            }
          </div>
        )
      }
    } else {
      return (
        <div>
          <span>Le fichier {this.state.selectedFile.name} a bien été envoyé</span>
        </div>
      )
    }
  }

  showAddFileSystem = () => {
    return (

      <form onSubmit={this.onSubmit}>
      <label for='file'><div className='formupload-label-file'>
        <i class="fas fa-plus-circle picto-add-file"></i>
        <span>Ajouter un fichier</span></div>
      </label>
      <input id='file' className='formupload-input-file'
        type="file"
        name="selectedFile"
        onChange={this.afterChosenFile}
      />

      <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div>{this.displayModalContent()}</div>
      </Modal>
    </form>

    )
  }

  render() {

    return (
      <div>{this.showAddFileSystem()}</div>
    )
  }
}

export default FormUpload
