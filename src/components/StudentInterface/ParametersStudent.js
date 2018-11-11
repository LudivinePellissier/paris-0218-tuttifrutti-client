import React from 'react'
import { userInfoStudent, updateInfoStudent } from '../../api.js'
import Button from '../Button.js'
import '../style/Parameters.css'
import Fields from '../../fields/fields.json'

class ParametersStudent extends React.Component {
	state = {
		student: {},
		fields: Fields.mainFields,
		displayInfo: 'block',
		displayForm: 'none',
		confirmUpdate: false
	}
	componentDidMount() {
		userInfoStudent()
			.then(res =>
				this.setState({
					student: {
						id: res._id,
						email: res.email,
						password: res.password,
						firstName: res.firstName,
						lastName: res.lastName,
						phone: res.phone,
						levelStudy: res.levelStudy,
						field: res.field
					}
				}))
	}

	UpdateField = event => { this.setState({ student: { ...this.state.student, [event.target.name]: event.target.value } }) }

	showUpdateForm = () => {
		this.setState({ displayInfo: 'none', displayForm: 'block', confirmUpdate: this.state.confirmUpdate ? false : false })
	}

	hideUpdateForm = () => {
		this.setState({ displayInfo: 'block', displayForm: 'none' })
	}

	updateOk = () => <div>Vos informations ont bien été mise à jour.</div>

	HandleSubmit = event => {
		event.preventDefault()

		const user = this.state.student

		const password = document.getElementById("password").value
		const passwordConfirm = document.getElementById("passwordConfirm").value

		if (password === passwordConfirm) {
			updateInfoStudent(user)
			this.setState({ confirmUpdate: true })
			this.props.update(this.state.student.firstName, this.state.student.lastName)
			this.hideUpdateForm()
		} else {
			console.log('Les mots de passe ne sont pas identiques.')
		}
	}

	render() {
		const eachField = field => {
			return (
				<option value={field}>{field}</option>
			)
		}

		const showEachField =
			this.state.fields.map(field => eachField(field))

		return (
			<div>
				<div className="parameters-content">
					<div>
						<div>
							<h1 className="title-parameters">Paramètres du compte</h1>
						</div>
						<div className="parameters-profile" style={{ display: this.state.displayInfo }}>
							<div>
								<p>{this.state.confirmUpdate ? this.updateOk() : undefined}</p>
							</div>
							<div>
								<h2>Identifiants</h2>
								<div className="parameters-id">
									<p className="parameters-p">Email&nbsp;:&emsp;{this.state.student.email}</p>
									<p className="parameters-p">Mot de passe&nbsp;:&emsp;******</p>
								</div>
							</div>
							<div>
								<h2>Informations personnelles</h2>
								<div className="parameters-info-half">
									<p className="parameters-p">Prénom&nbsp;:&emsp;{this.state.student.firstName}</p>
									<p className="parameters-p">Nom&nbsp;:&emsp;{this.state.student.lastName}</p>
								</div>
								<div className="parameters-info">
									<p className="parameters-p">Spécialité en droit&nbsp;:&emsp;{this.state.student.field}</p>
									<p className="parameters-p">Numéro de téléphone&nbsp;:&emsp;{this.state.student.phone}</p>
								<p className="parameters-p">Niveau d'étude&nbsp;:&emsp;{this.state.student.levelStudy}</p>
								</div>
							</div>
						</div>
						<div onClick={this.showUpdateForm} className="parameters-button">
							<Button>Modifier</Button>
						</div>
					</div>
					<div style={{ display: this.state.displayForm }}>
						<div className='form-parameters-container'>
							<form className="form-parameters" onSubmit={this.HandleSubmit}>
								<div className='form-div'>
									<input className='form-input-parameters' type="text" name="firstName" value={this.state.student.firstName || ''} placeholder={this.state.student.firstName} id="firstName" onChange={this.UpdateField} />
									<input className='form-input-parameters' type="text" name="lastName" value={this.state.student.lastName || ''} placeholder={this.state.student.lastName} id="lastName" onChange={this.UpdateField} />
								</div>
								<div className='form-div'>
									<input className='form-input-parameters' type="email" name="email" value={this.state.student.email || ''} placeholder={this.state.student.email} id="email" onChange={this.UpdateField} />
									<input className='form-input-parameters' type="text" name="phone" value={this.state.student.phone || ''} placeholder={this.state.student.phone} id="phone" onChange={this.UpdateField} />
									<select className='form-select-signup' name="levelStudy" placeholder="Niveau d'études" id="levelStudy" onChange={this.UpdateField} defaultValue={this.state.student.levelStudy} required>
                      <option disabled>Sélectionnez votre niveau d'études</option>
                      <option>Master 1</option>
                      <option>Master 2</option>
                      <option>Ms/LLM</option>
                      <option>Elève avocat</option>
                    </select>
								</div>
								<div className='form-div'>
									<select className='form-select-parameters' name="field" value={this.state.student.field || ''} placeholder={this.state.student.field} id="field" onChange={this.UpdateField} >
										<option value={this.state.student.field} disabled>{this.state.student.field}</option>
										{showEachField}
									</select>
								</div>
								<div className='form-div'>
									<input className='form-input-parameters' type="password" name="password" placeholder='Nouveau mot de passe' id="password" onChange={this.UpdateField} />
									<input className='form-input-parameters' type="password" name="passwordConfirm" placeholder="Confirmez le nouveau mot de passe" id="passwordConfirm" />
								</div>
								<div>
									<Button>Enregistrer</Button>
								</div>
							</form>
						</div>
						<div onClick={this.hideUpdateForm}>
							<Button>Annuler</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ParametersStudent
