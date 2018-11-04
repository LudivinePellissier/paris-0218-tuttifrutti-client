import React from 'react'
import axios from 'axios'
import HeaderSite from '../containers/HeaderSite.js'
import Button from './Button.js'
import PageTitle from './PageTitle.js'
import LinkSignUpConnect from './LinkSignUpConnect.js'
import Footer from '../containers/Footer.js'
import './style/LoginSignUpForm.css'
import Fields from '../fields/fields.json'
import { signUpLawyer } from '../api.js';

class SignUp extends React.Component {
  state = {
    lawyer: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      cabinet: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      toque: '',
      field: '',
      activated: false,
      approved: true
    },
    fields: Fields.mainFields,
    displayForm: 'block',
    displayMessage: 'none',
    hasErrorNotIdentic: false,
    hasErrorTooShort: false
  }

  UpdateField = event => { this.setState({ lawyer: { ...this.state.lawyer, [event.target.name]: event.target.value } }) }

  HandleSubmit = event => {
    event.preventDefault()

    const user = this.state.lawyer


    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value

    if (password.length < 6) {
      this.setState({ hasErrorNotIdentic: false, hasErrorTooShort: true })
    } else if (password !== passwordConfirm) {
      this.setState({ hasErrorNotIdentic: true, hasErrorTooShort: false })
    } else {
			signUpLawyer(user)
      this.setState({ displayForm: 'none', displayMessage: 'block' })
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token !== null) { window.location.replace('/profile') }
  }

  render() {
    let notIdentic = ''
    if (this.state.hasErrorNotIdentic === true) {
      notIdentic = `Attention, les mots de passe ne sont pas identiques.`
    }

    let tooShort = ''
    if (this.state.hasErrorTooShort === true) {
      tooShort = `Attention, le mot de passe doit contenir au moins 6 caractères.`
    }

    const eachField = (field, index) => {
      return (
        <option key={index} value={field}>{field}</option>
      )
    }

    const showEachField =
      this.state.fields.map(eachField)

    return (
      <div>
        <HeaderSite redirect='/' />
        <div className='signup-content'>
          <div>
            <div className='title-signup'>
              <PageTitle espace='Espace avocat' title='Inscription' />
            </div>
            <div style={{ display: this.state.displayForm }}>
              <div className='form-signup-container'>
                <form className="form-signup" onSubmit={this.HandleSubmit}>
                  <div className='form-div'>
                    <input className='form-input-signup' type="text" name="firstName" placeholder="Prénom" id="firstName" onChange={this.UpdateField} required/>
                    <input className='form-input-signup' type="text" name="lastName" placeholder="Nom" id="lastName" onChange={this.UpdateField} required/>
                  </div>
                  <div className='form-div'>
                    <input className='form-input-signup' type="email" name="email" placeholder="Email" id="email" onChange={this.UpdateField} required/>
                    <input className='form-input-signup' type="text" name="phone" placeholder="Téléphone" id="phone" onChange={this.UpdateField} required />
                  </div>
                  <div className='form-div'>
                    <input className='form-input-signup' type="text" name="cabinet" placeholder="Nom du cabinet" id="cabinet" onChange={this.UpdateField} required/>
                    <input className='form-input-signup' type="text" name="toque" placeholder="N° de toque" id="toque" onChange={this.UpdateField} required/>
                  </div>
                  <div className='form-div'>
                    <input className='form-input-signup' type="text" name="address" placeholder="Adresse" id="address" onChange={this.UpdateField} required/>
                  </div>
                  <div className='form-div'>
                    <input className='form-input-signup' type="text" name="zipCode" placeholder="Code postal" id="zipCode" onChange={this.UpdateField} required/>
                    <input className='form-input-signup' type="text" name="city" placeholder="Ville" id="city" onChange={this.UpdateField} required/>
                  </div>
                  <div className='form-div'>
                    <select className='form-select-signup' name="field" placeholder="Domaine" id="field" onChange={this.UpdateField} required>
                      <option value="" disabled selected>Sélectionnez votre domaine</option>
                      {showEachField}
                    </select>
                  </div>
                  <div className='form-div'>
                    <input className='form-input-signup' type="password" name="password" placeholder="Mot de passe" id="password" onChange={this.UpdateField} required/>
                    <input className='form-input-signup' type="password" name="passwordConfirm" placeholder="Confimer le mot de passe" id="passwordConfirm" required/>
                  </div>
                  <div className='identic'><p>{notIdentic}</p></div>
                  <div className='identic'><p>{tooShort}</p></div>
                  <Button>S'inscrire</Button>
                </form>
              </div>
              <div className='link-signup-connect'><LinkSignUpConnect text1='Déjà inscrit ?' text2='Connectez-vous' linkRoute='/login' />
              </div>
            </div>
            <div style={{ display: this.state.displayMessage }}>
              <p className='signup-message'>Votre inscription a bien été prise en compte,<br />vous recevrez la confirmation de votre demande sur votre boite mail. </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SignUp
