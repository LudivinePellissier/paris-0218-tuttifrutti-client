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
import { getOneMission, missionDownloadFile, getMessagesByMissionId, missionDeleteFile } from '../../api.js'

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
	
	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true })
	}
	
	onCloseModal = () => {
		this.setState({ open: false })
	}
	
	missionId = window.location.pathname.slice(8)

	async componentDidMount() {
		await getOneMission(this.missionId)
			.then(res => {
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
		if (lawyerFile !== undefined) {
			return lawyerFile.name
		} else {
			return studentFile.name
		}
	}

	downloadFile = id => {
		missionDownloadFile(id)
			.then(async res => {
				const dataFile = new Uint8Array(res.data)
				const blobDataFile = new Blob([dataFile], { type: res.type })
				const link = document.createElement('a')
				const fileName = this.getFileName(id)
				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
			})
	}

	deleteFile = id => {
		missionDeleteFile(id)
			.then(() => window.location.reload())
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
					<div className='mission-files'>
						<div className='mission-files-title'>
							<p>Fichiers envoyés par le cabinet</p>
							<hr></hr>
						</div>
						<MissionFiles files={this.state.filesFromLawyer} sendedBy='lawyer' downloadFile={this.downloadFile} deleteFile={this.deleteFile} userType={this.state.userType}/>
					</div>
					<div>
						<div className='mission-files'>
							<div className='mission-files-title'>
								<p>Fichiers envoyés au cabinet</p>
								<hr></hr>
								<FormUpload missionId={this.missionId} userType={this.state.userType} />
							</div>
							<MissionFiles files={this.state.filesFromStudent} sendedBy='student' downloadFile={this.downloadFile} deleteFile={this.deleteFile} userType={this.state.userType}/>
						</div>
					</div>
					<div className='missions-messages'>
						<p className='missions-messages-title'>Echanges avec le cabinet</p>
						<MissionMessages messages={this.state.messages} userType={this.state.userType} />
						<SendMessageStudent missionId={this.state.id} close={this.onCloseModal} userType={this.state.userType} />
					</div>
					<Modal open={open} onClose={this.onCloseModal} center>
						{/* <SendMessageStudent missionId={this.state.id} close={this.onCloseModal} userType={this.state.userType} /> */}
					</Modal>
				</div>
			</div>
		)
	}
}

export default MissionStudent
