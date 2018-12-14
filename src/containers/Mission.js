import React from 'react'
import Modal from 'react-responsive-modal'
import Button from '../components/Button.js'
import MissionTitle from '../components/MissionTitle.js'
import MissionId from '../components/MissionId.js'
import MissionField from '../components/MissionField.js'
import MissionFiles from '../components/MissionFiles.js'
import MissionMessages from '../components/MissionMessages.js'
import MissionDeadline from '../components/MissionDeadline.js'
import MissionPrice from '../components/MissionPrice.js'
import MissionStudent from '../components/MissionStudent.js'
import MissionDescription from '../components/MissionDescription.js'
import SendMessage from '../components/SendMessage.js'
import './style/Mission.css'
import FormUpload from '../components/FormUpload.js'
import { changeStatusMission, getOneMission, getStudentFirstName, missionDownloadFile, getMessagesByMissionId } from '../api.js'

class Mission extends React.Component {
	state = {
		id: '',
		name: '',
		field: '',
		subField: '',
		deadline: '',
		price: '',
		student: ``,
		studentName: '',
		description: '',
		finished: '',
		filesFromLawyer: [],
		filesFromStudent: [],
		open: false,
		userType: 'lawyer',
		messages: [],
	}

	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true })
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

	missionId = window.location.pathname

	async componentDidMount() {
		await getOneMission(this.missionId)
			.then(res => {
				this.setState({
					id: res.data._id,
					name: res.data.name,
					field: res.data.field,
					subField: res.data.subField,
					deadline: res.data.deadline,
					price: res.data.price,
					student: res.data.student,
					description: res.data.description,
					finished: res.data.finished,
					filesFromLawyer: res.data.filesFromLawyer,
					filesFromStudent: res.data.filesFromStudent,
				})
			})
			.catch((error) => {
				console.log(error)
			})
		if (this.state.student === '') {
			this.setState({ ...this.state, student: `La mission n'a pas encore été attribuée.` })
		} else {
			const id = this.state.student
			getStudentFirstName(id)
				.then(firstName => {
					this.setState({ ...this.state, studentName: firstName })
				})
		}

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
		const changeStatus = (event) => {
			event.preventDefault()
			this.setState({ ...this.state, finished: true })
			changeStatusMission(this.missionId)
				.then(res => {
					window.location.replace('/missions')
				})
		}

		const { open } = this.state

		const noStudent = this.state.student === `La mission n'a pas encore été attribuée.`

		const styleSendMessage = {
			cursor: 'auto',
			backgroundColor: '#add',
			fontWeight: '400'
		}

		const studentText = this.state.student !== `La mission n'a pas encore été attribuée.`
			?
			`La mission a été attribuée à ${this.state.studentName}.`
			:
			this.state.student

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
						<p>Fichiers envoyés à l'étudiant</p>
						<hr></hr>
						<div className='mission-files-newfile'><FormUpload missionId={this.missionId} userType={this.state.userType}/></div>
					</div>
					<MissionFiles files={this.state.filesFromLawyer} download={this.downloadFile}/>
					</div>
					<div className='mission-files'>
					<div className='mission-files-title'>
						<p>Fichiers remis par l'étudiant</p>
						<hr></hr>
					</div>
					<MissionFiles files={this.state.filesFromStudent} download={this.downloadFile}/>
					</div>
					<div className='mission-student-name'><MissionStudent text={studentText} /></div>
					{/* <hr className='separator' /> */}
					<div>
						<p>Messages</p>
						<MissionMessages messages={this.state.messages}/>
					</div>
					<div className='buttons-mission'>
						<div className='mission-student-block'>
							<div onClick={noStudent ? undefined : this.onOpenModal} className='mission-student-message'>
								<Button
									style={{
										cursor: noStudent ? 'auto' : undefined,
										backgroundColor: noStudent ? '#add' : undefined,
										fontWeight: noStudent ? '400' : undefined
									}}
								>Envoyer un message</Button></div>
							{/* <div className='mission-student-doc-upload'><FormUpload missionId={this.missionId} userType={this.state.userType}/></div> */}
							<div onClick={noStudent ? undefined : changeStatus} className='mission-student-finished'>
							<Button
									style={{
										cursor: noStudent ? 'auto' : undefined,
										backgroundColor: noStudent ? '#add' : undefined,
										fontWeight: noStudent ? '400' : undefined
									}}
									>Mission terminée</Button>
							</div>
						</div>
					</div>
					{/* <hr className='separator' /> */}

					<Modal open={open} onClose={this.onCloseModal} center>
						<SendMessage missionId={this.state.id} studentId={this.state.student} close={this.onCloseModal} />
					</Modal>
				</div>
			</div>
		)
	}
}

export default Mission
