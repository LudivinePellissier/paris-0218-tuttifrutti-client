import React from 'react'
import MissionTitle from '../components/MissionTitle.js'
import MissionId from '../components/MissionId.js'
import MissionField from '../components/MissionField.js'
import MissionFiles from '../components/MissionFiles.js'
import MissionDeadline from '../components/MissionDeadline.js'
import MissionPrice from '../components/MissionPrice.js'
import MissionStudent from '../components/MissionStudent.js'
import MissionDescription from '../components/MissionDescription.js'
import './style/Mission.css'
import { getOneMission, infoStudent } from '../api.js'

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
		filesSended: [],
		open: false
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
					filesSended: res.data.filesSended
				})
			})
			.catch((error) => {
				console.log(error)
			})
		if (this.state.student === '') {
			this.setState({ ...this.state, student: `La mission n'a pas encore été attribuée.` })
		} else {
			const id = this.state.student
			infoStudent(id)
				.then(stud =>
					this.setState({ ...this.state, studentName: stud })
				)
		}
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
					<br />
					<div className='mission-description'>
						<MissionDescription text={this.state.description} />
					</div>
					<div>
					<p>Fichiers envoyés à l'étudiant :</p>
					<MissionFiles names={this.state.filesSended}/>
					</div>
					<div className='mission-student-name'><MissionStudent text={studentText} /></div>
				</div>
			</div>
		)
	}
}

export default MissionAdmin