import React from 'react'
import { Link } from 'react-router-dom'
import { userInfoLawyer, createNewMission } from '../api.js'
import Button from './Button.js'
import './style/NewMission.css'
import Fields from '../fields/fields.json'
import subFields from '../fields/subFields.json'

class NewMission extends React.Component {
  state = {
    newmission: {
      name: '',
      field: 'Sélectionnez votre domaine',
      subField: 'Sélectionnez votre sous-domaine',
      deadline: '',
      price: '',
      description: '',
      // finished: false,
      author: '',
      // student: null,
    },
    fields: Fields.mainFields,
    subFields: subFields,
    displayForm: 'block',
    displayConfirm: 'none',
    missionId: ''
  }

  componentDidMount () {
    userInfoLawyer().then(res =>
      this.setState({ newmission: { ...this.state.newmission, author: res._id } }))
  }

  UpdateField = event => {
    this.setState({ newmission: { ...this.state.newmission, [event.target.name]: event.target.value } })
  }

  HandleSubmit = event => {
    event.preventDefault()

    const mission = this.state.newmission

		createNewMission(mission)
      .then(res => {
        this.setState({missionId: res.data._id})
      })
      .then(() => {
        this.setState({ displayForm: 'none', displayConfirm: 'block'})
      })
  }

  render() {

    const showEachField =
      this.state.fields.map((field, index) => <option key={index} value={field}>{field}</option>)

    const choosenField = this.state.newmission.field
    const subField = this.state.subFields[choosenField]
    let showEachSubField = []

    if (subField) {
      showEachSubField =
        subField.map((subfield, index) => <option key={index} value={subfield}>{subfield}</option>)
    }

    return (
      <div>
        <div style={{display: this.state.displayForm}}className='new-mission-content'>
          <div>
            <h1 className="title-new-mission">Créer une nouvelle mission</h1>
            <div className='form-new-mission-container'>
              <form className="form-new-mission" onSubmit={this.HandleSubmit}>
                <div className='form-div'>
                  <input className='form-input-new-mission' type="text" name="name" placeholder="Intitulé de la mission" id="name" onChange={this.UpdateField} required />
                </div>
                <div className='form-div'>
                  <select value={this.state.newmission.field} className='form-select-new-mission ' name="field" placeholder="Domaine" id="field" onChange={this.UpdateField} required >
                    <option disabled >Sélectionnez votre domaine</option>
                    {showEachField}
                  </select>
                </div>
                <div className='form-div'>
                  <select value={this.state.newmission.subField} style={{display: this.state.newmission.field !== 'Sélectionnez votre domaine' ? 'block' : 'none'}} className='form-select-new-mission ' name="subField" placeholder="Sous-domaine" id="subField" onChange={this.UpdateField} required >
                    <option disabled >Sélectionnez votre sous-domaine</option>
                    {showEachSubField}
                  </select>
                </div>
                <div className='form-div'>
                  <input className='form-input-new-mission' type="date" name="deadline" placeholder="Deadline : MM-JJ-YYYY" id="deadline" onChange={this.UpdateField} required pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" />
                  <input className='form-input-new-mission' type="text" name="price" placeholder="Rémunération" id="price" onChange={this.UpdateField} required />
                </div>
                <div className='form-div'>
                  <textarea className='form-textarea-new-mission' name="description" placeholder="Description de la mission" id="description" onChange={this.UpdateField} required />
                </div>
                <Button>Valider</Button>
              </form>
            </div>
          </div>
        </div>
        <div style={{display: this.state.displayConfirm}} className='new-mission-content'>
          <p>Votre mission a bien été ajoutée.</p>
          <div>
            <Link to={`/missions/${this.state.missionId}`}>
              <Button>Voir la mission</Button>
            </Link>
          </div>
        </div>
      </div >
    )
  }
}

export default NewMission
