import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import jwt_decode from "jwt-decode";
import { UserContext } from './components/UserContext';
import { CurrentChat } from './components/CurrentChat/CurrentChat';
import { ChatsList } from './components/ChatsList/ChatsList';
import './App.scss';
import messages from './api/messages.json';
import users from './api/users.json';

function App() {
  const [activeUser, setActiveUser] = useState({});
  const [activeRecipient, setActiveRecipient] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [dialogsActive, setDialogsActive] = useState(false);


  const isMobile = useMediaQuery({ maxWidth: 700 });

  const getDialogVisibility = (visibility) => {
    setDialogsActive(visibility);
  }

  const updateMessages = () => {
    setAllMessages(JSON.parse(localStorage.getItem('messages')))
  }

  const changeLastMessage = (idKey, textValue, dateValue) => {
    setLastMessages((prevValue) => (
      { ...prevValue, [idKey]: {text: textValue, date: dateValue}}
    ));
  };

  const changeRecipient = (data) => {
    setActiveRecipient(data);
  };

  function handleCallbackResponse(res) {
    let userObject = jwt_decode(res.credential);
    const { family_name, given_name, sub, picture } = userObject;
    const newUser = {
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
            id: sub,
            contacts: []
          }
      if (users.some(el => el.id !== sub)) {
        users = [...users, newUser]
      }
        setActiveUser(users.find(el => el.id === sub));
        setLastMessages(users.find(el => el.id === sub).contacts);
        updateMessages();

        document.getElementById("signInDiv").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "213851041335-t5vuqvgg4b30an96prtb9cpsphh9j7tm.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    }, [])

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )
    localStorage.setItem('messages', JSON.stringify(messages));
      }, []);

      useEffect(() => {
        updateMessages();
      }, [activeUser])

      return (
    <UserContext.Provider value={activeUser}>
    <div className="App">
      <div className="log-in-out">
        <div id="signInDiv"></div>
        <img
          src="./favicon.png"
          alt="Chuck chat"
          className="logo"
          hidden={activeUser.id}
        />
      </div>

      {activeUser.id && (
        <>
        {(!isMobile || !dialogsActive) && (
        <div className="sidebar">
          <ChatsList
            changeRecipient={changeRecipient}
            lastMessages={lastMessages}
            allMessages={allMessages}
            getDialogVisibility={getDialogVisibility}
          />
        </div>)}
        {(!isMobile || dialogsActive) && 
          ((activeRecipient.id) ?
            (<CurrentChat
              recipient={activeRecipient}
              changeLastMessage={changeLastMessage}
              allMessages={allMessages}
              updateMessages={updateMessages}
              getDialogVisibility={getDialogVisibility}
            />
            ) : (
            <div className="backgraund-for-current-chat">
            </div>
          ))
        }
        </>
      )}
    </div>
    </UserContext.Provider>
  );
}

export default App;
