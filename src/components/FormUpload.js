import React, { Component } from 'react'
import Button from './Button.js'
import './style/FormUpload.css'
import PictoAdd from './PictoAdd.js'
import Modal from 'react-responsive-modal'
import { missionUploadFile, missionStockUploadedFileInfos } from '../api.js'

class FormUpload extends Component {
    state = {
      missionId: this.props.missionId,
      description: '',
      selectedFile: '',
      fileUploaded: false,
      message: '',
      fileSended: '',
      userType: this.props.userType,
      open: false,
    }

    resetSelectedFile = () => {
      this.setState({ selectedFile: '', fileUploaded: false, description: '', message: '' }, () => this.onCloseModal())
      // document.getElementById('file').value = ''
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
      this.setState({ selectedFile: e.target.files[0], message: '' })
      break
      default:
      this.setState({ [e.target.name]: e.target.value, message: '' })
    }
  }
  
  afterChosenFile = async (e) => {
    this.onOpenModal(e)
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
        this.setState({ uploading: false })

        if (res.data.result === 'fail') {
          this.resetSelectedFile()
          this.setState({
            message: (
              <div>
                .pdf, .doc/docx, .jpg/jpeg uniquement
                <br /> <b> {'/ max 5mo'}</b>
              </div>
            ),
            selectedFile: '',
            fileUploaded: false
          })
        } else {
          this.setState({
            fileUploaded: true,
            fileSended : this.state.selectedFile.name
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
}
      }).catch(err => {
        this.resetSelectedFile()
        this.setState({
          message: (
            <div className='error-upload'>
              {err.response.data.split('body')[1].split('<br> &nbsp; ')[0].slice(7)}
              {/* <br />  */}
              {' / max 5mo'}
            </div>
          ),
          selectedFile: '',
          uploading: false,
          fileUploaded: false
        })
      })
  }

  render() {

    // const uploadFile = this.state.selectedFile === ''
    //   ? <label for='file'><div className='formupload-label-file'>
    //       <i class="fas fa-plus-circle picto-add-file"></i>
    //       <span>Ajouter un fichier</span></div>
    //     </label>
    //   : <span style={{ display: this.state.fileUploaded === true
    //       ? 'none'
    //       : 'block', textAlign: 'center' }}>{this.state.selectedFile.name} <span className='delete-file' onClick={() => this.resetSelectedFile()}> x</span>
    //     </span>

    const sendFile = (this.state.fileUploaded === false
      ? <div>
        <span>{this.state.selectedFile.name} <span className='delete-file' onClick={() => this.resetSelectedFile()}> x</span>
        </span>
      <Button>Envoyer le document</Button>
      </div>
      : <div> <span>Le fichier {this.state.selectedFile.name} a bien été envoyé</span>
        <div onClick={() => (this.resetSelectedFile())}><Button>Envoyer un autre document</Button></div></div>
    )

    return (
      <form onSubmit={this.onSubmit}>
        {/* {uploadFile} */}
        <label for='file'><div className='formupload-label-file'>
          <i class="fas fa-plus-circle picto-add-file"></i>
          <span>Ajouter un fichier</span></div>
        </label>
        
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
        {this.state.uploading ? 'Envoi en cours...' : ''}
        <input id='file' className='formupload-input-file'
          type="file"
          name="selectedFile"
          onChange={this.afterChosenFile}
        />
        <div style={{ display: this.state.selectedFile !== '' ? 'block' : 'none' }}>{sendFile}</div>
        <div>{this.state.message}</div>
        blablabla
        </Modal>

      </form>
    )

  }
}

export default FormUpload
