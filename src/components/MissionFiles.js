import React from 'react'

const MissionFiles = ({files, sendedBy, downloadFile, deleteFile, userType}) => {
  const showDeleteOption = fileId => {
    console.log(fileId)
    if (userType === sendedBy) {
      return (
        <i onClick={() => deleteFile(fileId)} style={{cursor: 'pointer'}}  class='fas fa-trash-alt icons' title='Supprimer'></i>
      )
    }
  }

  const showFiles = files => {
    if (files.length === 0) {
      return <div className='mission-nocontentyet'><span>Aucun fichier n'a encore été partagé.</span></div>
    } else {
      return files.map(file => 
        <div className='mission-files-onefile'>
          <div>
            <span><i class='fas fa-circle icons-circle'></i></span>
            <span>{file.name}</span>
          </div>
          <div>
            <i onClick={() => downloadFile(file.id)} style={{cursor: 'pointer'}} class='fas fa-file-download icons' title='Télécharger'></i>
            {showDeleteOption(file.id)}
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
