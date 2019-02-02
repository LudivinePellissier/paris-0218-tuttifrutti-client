import React from 'react'
import MissionTitle from '../components/MissionTitle.js'
import MissionId from '../components/MissionId.js'
import MissionField from '../components/MissionField.js'
import MissionFiles from '../components/MissionFiles.js'
import MissionDeadline from '../components/MissionDeadline.js'
import MissionPrice from '../components/MissionPrice.js'
import MissionStudent from '../components/MissionStudent.js'
import MissionLawyer from '../components/MissionLawyer.js'
import MissionDescription from '../components/MissionDescription.js'
import './style/Mission.css'
import { getOneMission, getStudentFirstName, missionDownloadFile, getOneMissionWithDetails, } from '../api.js'

class MissionAdmin extends React.Component {
	state = {
		id: '',
		name: '',
		field: '',
		subField: '',
		deadline: '',
		price: '',
		student: '',
		studentFisrtName: '',
		description: '',
		finished: '',
		filesFromLawyer: [],
		filesFromStudent: [],
		open: false,
		userType: 'admin',
	}

	missionId = window.location.pathname.slice(6)

	async componentDidMount() {
		const mission = await getOneMissionWithDetails(this.missionId)
		this.setState({ id: mission._id, ...mission})
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
		console.log(id)
		missionDownloadFile(id)
			.then(async res => {
				const dataFile = new Uint8Array(res.data)
				const blobDataFile = new Blob([dataFile], { type: res.type })
				const link = document.createElement('a')
				const fileName = this.getFileName(id)
				console.log(fileName)
				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
			})
	}

	render() {
		const studentText = this.state.student !== null
			? `La mission a été attribuée à ${this.state.studentFirstName}.`
			: `La mission n'a pas encore été attribuée.`

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
					<div class='mission-infos-block'>
						<div className='mission-block1'>
						<MissionLawyer name={this.state.cabinet} />
						</div>
						<div className='mission-block2'>
						<MissionStudent text={studentText} />
						</div>
					</div>
					{/* <div className='mission-student-name'>
						<MissionStudent text={studentText} />
					</div> */}
					<br />
					<div className='mission-description'>
						<MissionDescription text={this.state.description} />
					</div>
					<div className='mission-files'>
						<div className='mission-files-title'>
							<p>Fichiers remis par l'avocat</p>
							<hr></hr>
						</div>
						<MissionFiles files={this.state.filesFromLawyer} sendedBy='lawyer' downloadFile={this.downloadFile} userType={this.state.userType} />
					</div>
					<div className='mission-files'>
						<div className='mission-files-title'>
							<p>Fichiers remis par l'étudiant</p>
							<hr></hr>
						</div>
						<MissionFiles files={this.state.filesFromStudent} sendedBy='student' downloadFile={this.downloadFile} userType={this.state.userType} />
					</div>
					<br />
				</div>
			</div>
		)
	}
}

export default MissionAdmin
