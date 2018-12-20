import React from 'react'
import './style/MissionMessages.css'

const MissionMessages = ({userType, messages}) => {
  const setStyleOfOneMessage = (userType, authorType) => {
    let classOfOneMessage = 'mission-messages-onemessage'
    if (userType === authorType) {
      classOfOneMessage = 'mission-messages-onemessage-reverse'
    }
    return classOfOneMessage
  }

  const setStyleOfOneMessageContent = (userType, authorType) => {
    let classOfOneMessageContent = 'mission-messages-onemessage-message'
    if (userType === authorType) {
      classOfOneMessageContent = 'mission-messages-onemessage-message-reverse'
    }
    return classOfOneMessageContent
  }

  const showMessages = messages => {
    if (messages.length === 0) {
      return <div className='mission-nocontentyet'><span>Aucun message n'a encore été échangé.</span></div>
    } else {
      const sortedMessages = messages.sort((a,b) => a.date - b.date)
      return sortedMessages.map(message => {
        const formatedDate = new Date(message.date).toLocaleDateString('fr-FR')
        const formatedTime = new Date(message.date).toLocaleTimeString('fr-FR').slice(0,5)
          
        return (
            <div className={setStyleOfOneMessage(userType, message.authorType)}>
                <div className='mission-messages-onemessage-infos'>
                  <div>
                    <span>{message.authorName}</span>
                  </div>
                  <div>
                    <span>{formatedDate}</span>
                    <span>{formatedTime}</span>
                  </div>
                </div>
                <div className={setStyleOfOneMessageContent(userType, message.authorType)}>
                  <span>{message.message}</span>
                </div>
            </div>
        )
      })
    } 
  }

  return (
  	<div className='mission-messages-container'>
      {showMessages(messages)}
    </div>
  )
}

export default MissionMessages
