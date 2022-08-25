import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import { getJoke } from '../../api/getData';
import messages from '../../api/messages.json';


export const MessageInput = React.memo(({updateMessages, recipientIdNum, changeLastMessage}) => {
  const user = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");

  const randomTime = () => Math.floor(Math.random() * (15001 - 10000) + 10000);

  const createMessage = (value, author, recipient) => {
    const presentDate = Date.now();
      messages = [...messages, { id: presentDate,
      text: value,
      createdAt: presentDate,
      authorId: author,
      recipientId: recipient
    }]
    changeLastMessage(recipientIdNum, value, presentDate);
    localStorage.setItem('messages', JSON.stringify(messages));
    updateMessages();
  };

  const createJokeMessage = () => {
    getJoke()
      .then(result => createMessage(result.value, recipientIdNum, user.id))
  }

  return (
  <div className="new-message">
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue) {
          createMessage(inputValue, user.id, recipientIdNum)
          setTimeout(createJokeMessage, randomTime())
        }
        setInputValue('');
      }}
    >
      <textarea
        className="new-message__input"
        name='message'
        placeholder="Type your message"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue) {
              createMessage(inputValue, user.id, recipientIdNum)
              setTimeout(createJokeMessage, randomTime())
            }
            setInputValue('');
          }
        }}
      />
      <button className="new-message__button" type="submit"></button> 
    </form>
  </div>
)});
