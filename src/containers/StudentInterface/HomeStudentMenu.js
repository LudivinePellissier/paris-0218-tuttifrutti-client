import React from 'react'
import { Link } from 'react-router-dom'
import MenuTitle from '../../components/MenuTitle.js'
import '../style/HomeAdminMenu.css'

const HomeStudentMenu = () => (
	<div>
		<div className='home-student-menu'>
			<Link className='home-student-menu-block-linkto' to={`/student/missionslist`}>
				<div className='home-student-menu-currentmissions'>
					<MenuTitle text='Missions en cours' />
				</div></Link>
				<Link className='home-student-menu-block-linkto' to={`/student/oldmissions`}>
				<div className='home-student-menu-oldmissions'>
					<MenuTitle text='Missions terminées' />
				</div>
			</Link>
		</div>
	</div>
)

export default HomeStudentMenu
