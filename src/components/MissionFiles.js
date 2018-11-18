import React from 'react'

const MissionFiles = ({files}) => {
return files.map(file => <div><span>{file.name}</span></div>)
}

export default MissionFiles
