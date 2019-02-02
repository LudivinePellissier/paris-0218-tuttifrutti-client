import React from 'react'
import Modal from 'react-responsive-modal'
import { userInfoLawyer, getOldMissions, missionDownloadFile, } from '../api.js'
import Button from '../components/Button.js'
import MissionTitle from '../components/MissionTitle.js'
import MissionId from '../components/MissionId.js'
import MissionStudent from '../components/MissionStudent.js'
import MissionDeadline from '../components/MissionDeadline.js'
import MissionPrice from '../components/MissionPrice.js'
import ReportProblem from '../components/ReportProblem.js'
import './style/OldMissions.css'
import MissionFiles from '../components/MissionFiles.js'

class OldMissions extends React.Component {
	state = {
		oldMissions: [],
		lawyer: {},
		open: false,
		clickedMission: '',
		studentId: '',
		userType: 'lawyer',
	}

	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true })
	}

	addIdAndOpenModal = (mission, event) => {
		this.setState({ clickedMission: mission._id, studentId: mission.student })
		this.onOpenModal(event)
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

	componentDidMount() {
		userInfoLawyer()
			.then(res =>
				this.setState({
					lawyer: {
						id: res._id
					}
				}))
			.then(() => {
				const lawyerId = this.state.lawyer.id
				getOldMissions(lawyerId)
					.then(res => {
						this.setState({ oldMissions: res })
					})
					.catch((error) => {
						console.log(error);
					})
			})
	}

	getFileName = (id, missionId) => {
		const mission = this.state.oldMissions.find(mission => mission._id === missionId)
		const studentFile = mission.filesFromStudent.find(file => file.id === id)
		return studentFile.name
	}

	downloadFile = (id, missionId) => {
		missionDownloadFile(id)
			.then(async res => {
				const dataFile = new Uint8Array(res.data)
				const blobDataFile = new Blob([dataFile], { type: res.type })
				const link = document.createElement('a')
				const fileName = this.getFileName(id, missionId)
				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
			})
	}

	render() {

		const eachMission = mission => {
			const studentText = `La mission a été réalisée par ${mission.studentName}`

			const lastFileFromStudent = () => {
				if (mission.filesFromStudent.length !== 0) {
					const files = mission.filesFromStudent
					const lastFile = files.slice(files.length -1)
					return lastFile
				} else {
					return 'Aucun fichier disponible'
				}
			}

			return (
				<div key={mission._id} className='each-mission-container'>
					<div className='old-mission-block-title'>
						<MissionTitle text={mission.name} />
						<MissionId text={mission._id} />
					</div>
					<MissionDeadline text={mission.deadline} />
					<MissionPrice text={mission.price} />
					<MissionStudent text={studentText} />
					<MissionFiles files={lastFileFromStudent()} sendedBy='student' downloadFile={this.downloadFile} userType={this.state.userType} missionId={mission._id}/>
					<div className='old-missions-button'>
						<Button>Télécharger la facture</Button>
						<div onClick={event => this.addIdAndOpenModal(mission, event)
						}><Button>Signaler un problème</Button></div>
					</div>
				</div>
			)
		}


		const showEachMission = this.state.oldMissions.map(mission => eachMission(mission))

		const { open } = this.state

		return (
			<div className='old-missions-container'>
				{showEachMission}
				<Modal open={open} onClose={this.onCloseModal} center>
					<ReportProblem close={this.onCloseModal} missionId={this.state.clickedMission} studentId={this.state.studentId} />
				</Modal>
			</div>
		)
	}
}

export default OldMissions
