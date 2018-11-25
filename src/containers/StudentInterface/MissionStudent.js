import React from 'react'
import MissionTitle from '../../components/MissionTitle.js'
import MissionId from '../../components/MissionId.js'
import MissionField from '../../components/MissionField.js'
import MissionFiles from '../../components/MissionFiles.js'
import MissionDeadline from '../../components/MissionDeadline.js'
import MissionPrice from '../../components/MissionPrice.js'
import MissionDescription from '../../components/MissionDescription.js'
import '../style/Mission.css'
import { getOneMission, missionDownloadFile } from '../../api.js'

class MissionStudent extends React.Component {
	state = {
		id: '',
		name: '',
		field: '',
		subField: '',
		deadline: '',
		price: '',
		description: '',
		finished: '',
		filesSended: [],
		open: false
	}

	missionId = window.location.pathname.slice(8)

	async componentDidMount() {
		console.log(this.missionId)
		await getOneMission(this.missionId)
			.then(res => {
				this.setState({
					id: res.data._id,
					name: res.data.name,
					field: res.data.field,
					subField: res.data.subField,
					deadline: res.data.deadline,
					price: res.data.price,
					description: res.data.description,
					finished: res.data.finished,
					filesSended: res.data.filesSended
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	downloadFile = id => {
		missionDownloadFile(id)
			.then(async res => {
				const dataFile = new Uint8Array(res.data)
				const blobDataFile = new Blob([dataFile], {type: res.type})
				const link = document.createElement('a')
				console.log(this.state.filesSended.find(file => file.id === id).name)
				const fileName = this.state.filesSended.find(file => file.id === id).name

				link.href = window.URL.createObjectURL(blobDataFile)
				link.download = fileName
				link.click()
		})
	}

	render() {
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
					<MissionFiles  files={this.state.filesSended} download={this.downloadFile}/>
					</div>
				</div>
			</div>
		)
	}
}

export default MissionStudent
