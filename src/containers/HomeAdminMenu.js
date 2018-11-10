import React from 'react'
import { Link } from 'react-router-dom'
import MenuTitle from '../components/MenuTitle.js'
import './style/HomeAdminMenu.css'

const HomeAdminMenu = () => (
	<div>
		<div className='home-admin-menu'>
			<Link className='home-admin-menu-linkto-block1' to={`/admin/missionslist`}>
				<div className='home-admin-missionslist'>
					<MenuTitle text='Missions' />
				</div></Link>
		</div>
		<div className='home-admin-menu'>
			<Link className='home-admin-menu-linkto' to={`/admin/lawyerslist`}>
				<div className='home-admin-lawyerslist'>
					<MenuTitle text='Avocats' />
				</div></Link>
			<Link className='home-admin-menu-linkto' to={`/admin/studentslist`}>
				<div className='home-admin-studentslist'>
					<MenuTitle text='Etudiants' />
				</div>
			</Link>
		</div>
	</div>
)

export default HomeAdminMenu
