import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import FrontPage from './containers/FrontPage.js'
import SignUp from './components//SignUp.js'
import Login from './components/Login.js'
import LoginAdmin from './components/LoginAdmin.js'
import HomeAdmin from './containers/HomeAdmin.js'
import HomeLawyer from './containers/HomeLawyer.js'
import AllMissionsPage from './containers/AllMissionsPage.js'
import AllMissionsPageAdmin from './containers/AllMissionsPageAdmin.js'
import MissionPage from './containers/MissionPage.js'
import MissionPageAdmin from './containers/MissionPageAdmin.js'
import OldMissionsPage from './containers/OldMissionsPage.js'
import SignUpStudent from './components/SignUpStudent.js'
import SignUpAdmin from './components/SignUpAdmin.js'
import MissionConfirm from './components/MissionConfirm.js'
import EmailConfirmLawyer from './components/EmailConfirmLawyer.js'
import EmailConfirmStudent from './components/EmailConfirmStudent.js'
import EmailConfirmAdmin from './components/EmailConfirmAdmin.js'
import AllStudentsPage from './containers/AllStudentsPage.js'
import AllLawyersPage from './containers/AllLawyersPage.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={FrontPage}/>
              <Route exact path="/reg" component={SignUp}/>
              <Route exact path="/login" component={Login}/>
							<Route exact path="/loginadmin" component={LoginAdmin}/>
							<Route exact path="/admin" component={HomeAdmin}/>
							<Route exact path="/admin/missionslist" component={AllMissionsPageAdmin}/>
              <Route exact path="/admin/missions/:missionId" component={MissionPageAdmin} />
              <Route exact path="/admin/studentslist" component={AllStudentsPage} />
							<Route exact path="/admin/lawyerslist" component={AllLawyersPage} />
              <Route exact path="/profile" component={HomeLawyer}/>
              <Route exact path="/missions" component={AllMissionsPage} />
              <Route exact path="/missions/:missionId" component={MissionPage} />
              <Route exact path="/oldmissions" component={OldMissionsPage} />
              <Route exact path="/signupstudent" component={SignUpStudent} />
							<Route exact path="/signupadmin" component={SignUpAdmin} />
              <Route path="/accept" component={MissionConfirm} />
              <Route path="/confirmationlawyer" component={EmailConfirmLawyer} />
							<Route path="/confirmationstudent" component={EmailConfirmStudent} />
							<Route path="/confirmationadmin" component={EmailConfirmAdmin} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
