import React, { useState, useEffect, useContext} from 'react';
import { Message } from '../Message/Message'
import { UserContext } from '../UserContext';
import { MessageInput } from '../MessageInput/MessageInput';


export const CurrentChat = React.memo(({recipient, changeLastMessage, allMessages, updateMessages}) => {
  const [messages, setMessages] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    setMessages(allMessages.filter(message => message.authorId === recipient.id || message.recipientId === recipient.id))
  }, [recipient.id, allMessages]);

  return (
  <div className="current-chat">
    <>
    <div className="current-chat__recipient">
      <img
        src={recipient.avatar}
        alt={`${recipient.firstName} ${recipient.lastName}`}
        className="current-chat__recipient-photo recipient-photo"
      />
      <div className="current-chat__avatar-label"></div>
      <h2 className="current-chat__recipient-name">
        {`${recipient.firstName} ${recipient.lastName}`}
      </h2>
    </div>
    <ul className="current-chat__chat-body">
      {messages.map(el => (
        <li
          key={el.createdAt}
          className={`message ${(el.authorId === user.id) ? 'message--out' : 'message--in'}`}
        >
          <img
          className='message__avatar'
            src={recipient.avatar}
            alt={recipient.firstName}
            hidden={user.id === el.authorId}
          />
          <Message message={el} />
        </li>
      ))}
    </ul>
      <MessageInput
        updateMessages={updateMessages}
        recipientIdNum={recipient.id}
        changeLastMessage={changeLastMessage}
      />
    </>
  </div>
)});
