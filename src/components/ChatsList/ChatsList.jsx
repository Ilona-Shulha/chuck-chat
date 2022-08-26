import React, { useState, useEffect, useContext } from 'react';
import users from '../../api/users.json'
import { UserContext } from '../UserContext';
import { Header } from '../Header/Header'
import { Chat } from '../Chat/Chat'

export const ChatsList = React.memo(({changeRecipient, lastMessages, allMessages, getDialogVisibility}) => {
  const [companions, setCompanions] = useState([]);
  const [searchPattern, setSearchPattern] = useState('');
  const user = useContext(UserContext);

  const getSearch = (event) => setSearchPattern(event.target.value);

  useEffect(() => {
        setCompanions(users.filter(el => Object.keys(user.contacts).includes(el.id)))
  }, [user.contacts]);

  return (
    <>
    <Header getSearch={getSearch} searchPattern={searchPattern} />
    <h1 className="chats-title">Chats</h1>
    <div className="chats">
      {searchPattern ? (
      <>
      <ul className="chats__chats-search">
        {companions.sort((first, second) => lastMessages[second.id].date - lastMessages[first.id].date).filter(item => {
          return item.firstName.toLowerCase().includes(searchPattern.toLowerCase()) || item.lastName.toLowerCase().includes(searchPattern.toLowerCase())
        }).map(companion => (
          <React.Fragment key={companion.id}>
            <Chat
              companion={companion}
              changeRecipient={changeRecipient}
              visibleMessage={lastMessages}
              getDialogVisibility={getDialogVisibility}
            />
          </React.Fragment>
      ))}
      </ul>
      <ul className="chats__messages-search">
        {allMessages.filter(el => el.text.toLowerCase().includes(searchPattern.toLowerCase())).sort((first, second) => second.createdAt - first.createdAt).map(message => (
          <React.Fragment key={message.id}>
          <Chat
            companion={companions.find(el => el.id === message.authorId || el.id === message.recipientId)}
            changeRecipient={changeRecipient}
            visibleMessage={{text: message.text, date: message.createdAt}}
            getDialogVisibility={getDialogVisibility}
          />
        </React.Fragment>
        ))
        }
      </ul>
      </>
      )
      : (<>
        <ul className="chats__list">
          {companions.sort((first, second) => lastMessages[second.id].date - lastMessages[first.id].date).map(companion => (
            <React.Fragment key={companion.id}>
              <Chat
                companion={companion}
                changeRecipient={changeRecipient}
                visibleMessage={lastMessages}
                getDialogVisibility={getDialogVisibility}
              />
            </React.Fragment>
          ))}
        </ul>
      </>)}
  </div>
  </>
)});
