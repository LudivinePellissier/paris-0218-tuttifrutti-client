import React from 'react'

const MissionFiles = ({files, download}) => {
  const showFiles = files => {
    if (files.length === 0) {
      return <div><span>Aucun fichier n'a encore été partagé.</span></div>
    } else {
      return files.map(file => 
        <div>
          <span>{file.name}</span>
          <span style={{cursor: 'pointer'}} onClick={() => download(file.id)}>Télécharger</span>
        </div>
      )
    } 
  }

  return (
    <div>
      <div>{showFiles(files)}</div>
    </div>
  )
}

export default MissionFiles
