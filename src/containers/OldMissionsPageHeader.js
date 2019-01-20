import React from 'react'
import { Link } from 'react-router-dom'
import GoBack from '../components/GoBack.js'
import MissionPageTitle from '../components/MissionPageTitle.js'
import './style/MissionPageHeader.css'

class OldMissionsPageHeader extends React.Component {
	render() {
		return (
			<div>
				<div className='header-mission-page'>
					<div className='header-goback'>
						<Link to={this.props.to}><GoBack text={this.props.text} /></Link>
					</div>
					<div className='header-title'>
						<MissionPageTitle text='Missions terminées' />
					</div>
					<div className='header-right'></div>
				</div>
			</div>
		)
	}
}

export default OldMissionsPageHeader
