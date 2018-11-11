import React from 'react'
import { Link } from 'react-router-dom'
import MenuTitle from '../../components/MenuTitle.js'
import '../style/HomeAdminMenu.css'

const HomeStudentMenu = () => (
	<div>
		<div className='home-admin-menu'>
			<Link className='home-admin-menu-linkto' to={`/student/missionslist`}>
				<div className='home-admin-missionslist'>
					<MenuTitle text='Missions en cours' />
				</div></Link>
				<Link className='home-admin-menu-linkto' to={`/student/oldmissions`}>
				<div className='home-admin-lawyerslist'>
					<MenuTitle text='Missions terminées' />
				</div>
			</Link>
		</div>
	</div>
)

export default HomeStudentMenu
