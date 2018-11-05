import React from 'react'
import Modal from 'react-responsive-modal'
import './style/AllLawyers.css'
import { getAllLawyers, approvedLawyer, deleteLawyer } from '../api.js'
import Button from '../components/Button.js'
import DeleteUser from '../components/DeleteUser.js'

class AllLawyers extends React.Component {
	state = {
		allUsers: [],
		lawyerToDelete: '',
		open: false
	}

	componentWillMount() {

		getAllLawyers()
			.then((res) => {
				this.setState({ allUsers: res })
			})
			.catch((error) => {
				console.log(error);
			})
	}

	Submit = async (lawyer) => {
		const clickedLawyer = this.state.allUsers.indexOf(lawyer)
		const status = lawyer.approved === false ? true : false
		let allUsersCopy = this.state.allUsers
		allUsersCopy[clickedLawyer] = {...allUsersCopy[clickedLawyer], approved: status}
		this.setState({allUsers: allUsersCopy})

		const user = this.state.allUsers[clickedLawyer]

		approvedLawyer(user)
			.then((res) => {
				console.log(res)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	onOpenModal = (event) => {
		event.preventDefault()
		this.setState({ open: true })
	}

	onCloseModal = () => {
		this.setState({ open: false })
	}

	updateAllLawyersAfterDeleteOne = () => {
		getAllLawyers()
			.then((res) => {
				this.setState({ allUsers: res })
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {

		const { open } = this.state

		const EachUser = (lawyer, key) => {

			return (
				<div key={key} className='each-lawyer-container'>
					<div>
						<p>
							{lawyer.cabinet}
							<br />
							{lawyer.field}
						</p>
						<p>
							{lawyer.firstName} {lawyer.lastName}
							<br />
							{lawyer.email}
							<br />
							{lawyer.phone}
						</p>
						<p>
							{lawyer.address}
							<br />
							{lawyer.zipCode} {lawyer.city}
						</p>
						<p>
							{lawyer.activated === true ? "Email vérifié" : "Email non vérifié"}
							<br />
							{lawyer.approved === true ? "Compte actif" : "Compte inactif"}
						</p>
					</div>
					<div onClick={() => this.Submit(lawyer)}>
						<Button>{lawyer.approved === true ? "Désactiver" : "Activer"}</Button></div>
					<div onClick={(e) => this.setState({lawyerToDelete: lawyer},this.onOpenModal(e))}>
					<Button>Supprimer le compte</Button></div>
				</div>
			)
		}

		const ShowEachUser = this
			.state
			.allUsers
			.map(EachUser)

		return (
			<div className='all-lawyers-container'>
				{ShowEachUser}
				<Modal open={open} onClose={this.onCloseModal} center>
						<DeleteUser  userData={this.state.lawyerToDelete} delete={deleteLawyer} update={this.updateAllLawyersAfterDeleteOne} close={this.onCloseModal} />
					</Modal>
			</div>
		)
	}
}

export default AllLawyers
