import React from 'react'
import Modal from 'react-responsive-modal'
import MissionTitle from '../../components/MissionTitle.js'
import MissionId from '../../components/MissionId.js'
import MissionField from '../../components/MissionField.js'
import MissionFiles from '../../components/MissionFiles.js'
import MissionMessages from '../../components/MissionMessages.js'
import MissionDeadline from '../../components/MissionDeadline.js'
import MissionPrice from '../../components/MissionPrice.js'
import MissionDescription from '../../components/MissionDescription.js'
import Button from '../../components/Button.js'
import FormUpload from '../../components/FormUpload.js'
import SendMessageStudent from '../../components/StudentInterface/SendMessageStudent.js'
import '../style/Mission.css'
import { getOneMission, missionDownloadFile, getMessagesByMissionId } from '../../api.js'

class MissionStudent extends React.Component {
	state = {
		id: '',
		lawyer: '',
		name: '',
		field: '',
		subField: '',
		deadline: '',
		price: '',
		description: '',
		finished: '',
		filesFromLawyer: [],
		filesFromStudent: [],
		open: false,
		userType: 'student',
		messages: [],
	}

	missionId = window.location.pathname.slice(8)

	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true })
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

	async componentDidMount() {
		console.log(this.missionId)
		await getOneMission(this.missionId)
			.then(res => {
				console.log(res.data)
				this.setState({
					id: res.data._id,
					lawyer: res.data.author,
					name: res.data.name,
					field: res.data.field,
					subField: res.data.subField,
					deadline: res.data.deadline,
					price: res.data.price,
					description: res.data.description,
					finished: res.data.finished,
					filesFromLawyer: res.data.filesFromLawyer,
					filesFromStudent: res.data.filesFromStudent,
				})
			})
			.catch((error) => {
				console.log(error)
			})

			getMessagesByMissionId(this.missionId)
			.then(res => {
				this.setState({ ...this.state, messages: res })
			})
	}


	getFileName = id => {
		const lawyerFile = this.state.filesFromLawyer.find(file => file.id === id)
		const studentFile = this.state.filesFromStudent.find(file => file.id === id)
		if (lawyerFile != undefined) {
			return lawyerFile.name
		} else {
			return studentFile.name
		}
	}

	downloadFile = id => {
		missionDownloadFile(id)
			.then(async res => {
				const dataFile = new Uint8Array(res.data)
				const blobDataFile = new Blob([dataFile], {type: res.type})
				const link = document.createElement('a')
				const fileName = this.getFileName(id)
				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
		})
	}

	render() {

		const { open } = this.state

		return (
			<div className='mission-container'>
				<div className='mission-content'>
					<br />
					<div className='mission-title-id'>
						<MissionTitle text={this.state.name} />
						<MissionId text={this.state.id} />
					</div>
					<br />
					<div class='mission-infos-block'>
						<div className='mission-block1'>
							<MissionField field={this.state.field} subfield={this.state.subField} />
						</div>
						<div className='mission-block2'>
							<div>
								<MissionDeadline text={this.state.deadline} />
								<MissionPrice text={this.state.price} />
							</div>
						</div>
					</div>
					<br />
					<div className='mission-description'>
						<MissionDescription text={this.state.description} />
					</div>
					<div>
					<p>Fichiers envoyés par le cabinet :</p>
					<MissionFiles files={this.state.filesFromLawyer} download={this.downloadFile}/>
					</div>
					<div>
					<p>Fichiers que vous avez envoyé :</p>
					<MissionFiles files={this.state.filesFromStudent} download={this.downloadFile}/>
					</div>
					<div>
						<p>Messages</p>
						<MissionMessages messages={this.state.messages}/>
					</div>
					<div className='buttons-mission'>
						<div className='mission-student-block'>
							<div onClick={this.onOpenModal} className='mission-student-message'>
								<Button>Envoyer un message</Button></div>
							<div className='mission-student-doc-upload'><FormUpload missionId={this.missionId} userType={this.state.userType}/></div>
						</div>
					</div>
					<Modal open={open} onClose={this.onCloseModal} center>
						<SendMessageStudent missionId={this.state.id} lawyerId={this.state.lawyer} close={this.onCloseModal} />
					</Modal>
				</div>
			</div>
		)
	}
}

export default MissionStudent
