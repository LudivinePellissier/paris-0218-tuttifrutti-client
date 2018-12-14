import React from 'react'

const MissionFiles = ({files, download}) => {
  const showFiles = files => {
    if (files.length === 0) {
      return <div><span>Aucun fichier n'a encore été partagé.</span></div>
    } else {
      return files.map(file => 
        <div className='mission-files-onefile'>
          <div>
            <span><i class='fas fa-circle icons-circle'></i></span>
            <span>{file.name}</span>
          </div>
          <div>
            <i onClick={() => download(file.id)} style={{cursor: 'pointer'}} class='fas fa-file-download icons' title='Télécharger'></i>
            <i class='fas fa-trash-alt icons' title='Supprimer'></i>
          </div>
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
