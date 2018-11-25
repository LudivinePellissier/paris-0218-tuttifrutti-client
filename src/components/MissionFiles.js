import React from 'react'

const MissionFiles = ({files, download}) => {
return files.map(file => 
<div>
  <span>{file.name}</span>
  <span style={{cursor: 'pointer'}} onClick={() => download(file.id)}>Télécharger</span>
</div>)
}

export default MissionFiles
