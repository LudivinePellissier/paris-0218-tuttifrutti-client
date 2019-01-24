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
import { getOneMission, getStudentFirstName, missionDownloadFile } from '../api.js'

class MissionAdmin extends React.Component {
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
		userType: 'admin',
	}

	missionId = window.location.pathname.slice(6)

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
				.then(firstName =>
					this.setState({ ...this.state, studentName: firstName })
				)
		}
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
				const blobDataFile = new Blob([dataFile], { type: res.type })
				const link = document.createElement('a')
				const fileName = this.getFileName(id)
				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
			})
	}

	render() {
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
					<div class='mission-infos-block'>
						<div className='mission-block1'>
						<MissionLawyer text={studentText} />
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
