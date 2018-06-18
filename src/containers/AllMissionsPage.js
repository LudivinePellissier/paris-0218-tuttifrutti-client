import React from 'react'
import HomeLawyerHeader from './HomeLawyerHeader.js'
import AllMissions from '../containers/AllMissions.js'
import MissionPageHeader from '../containers/MissionPageHeader.js'
import Footer from '../containers/Footer.js'
import './style/AllMissionsPage.css'

class AllMissionsPage extends React.Component {

    render() {
        return (
            <div>
                <HomeLawyerHeader />
                <MissionPageHeader />
                <AllMissions />
                <Footer />
            </div>
        )
    }

}

export default AllMissionsPage