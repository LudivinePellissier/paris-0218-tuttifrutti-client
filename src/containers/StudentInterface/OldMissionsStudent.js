import React from 'react'
import Modal from 'react-responsive-modal'
import { userInfoStudent, getOldMissionsStudent } from '../../api.js'
import Button from '../../components/Button.js'
import MissionTitle from '../../components/MissionTitle.js'
import MissionId from '../../components/MissionId.js'
import MissionDeadline from '../../components/MissionDeadline.js'
import MissionPrice from '../../components/MissionPrice.js'
import ReportProblem from '../../components/ReportProblem.js'
import '../style/OldMissions.css'

class OldMissionsStudent extends React.Component {
	state = {
		oldMissions: [],
		student: {},
		open: false,
		clickedMission: '',
		lawyerId: ''
	}

	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true})
	}

	addIdAndOpenModal = (mission, event) => {
			this.setState({clickedMission: mission._id, lawyerId: mission.author})
			this.onOpenModal(event)
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

	componentDidMount() {
		userInfoStudent()
			.then(res =>
				this.setState({
					student: {
						id: res._id
					}
				}))
			.then(() => {
				const studentId = this.state.student.id
				console.log(studentId)
				getOldMissionsStudent(studentId)
					.then(res => {
						this.setState({ oldMissions: res })
					})
					.catch((error) => {
						console.log(error)
					})
			})
	}

	render() {

		const eachMission = mission => {
				return (
					<div key={mission._id} className='each-mission-container'>
						<div className='old-mission-block-title'>
							<MissionTitle text={mission.name} />
							<MissionId text={mission._id} />
						</div>
						<MissionDeadline text={mission.deadline} />
						<MissionPrice text={mission.price} />
						<div className='old-missions-button'>
							<Button>Télécharger le recap</Button>
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
					<ReportProblem close={this.onCloseModal} missionId={this.state.clickedMission} lawyerId={this.state.lawyerId}/>
				</Modal>
			</div>
		)
	}
}

export default OldMissionsStudent
