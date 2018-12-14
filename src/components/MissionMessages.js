import React from 'react'

const MissionMessages = ({messages}) => {
  const showMessages = messages => {
    if (messages.length === 0) {
      return <div><span>Aucun message n'a encore été échangé.</span></div>
    } else {
      const sortedMessages = messages.sort((a,b) => b.date - a.date)
      return sortedMessages.map(message => {
        const formatedDate = new Date(message.date).toLocaleString('fr-FR')
        return (
          <div>
            <div>
              <p>{message.authorName}</p>
              <p>{formatedDate}</p>
              <p>{message.message}</p>
            </div>
          </div>
        )
      })
    } 
  }

  return (
    <div>
      <div>{showMessages(messages)}</div>
    </div>
  )
}

export default MissionMessages
