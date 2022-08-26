import { formatDate } from '../../dateExtractor';

export const Chat = ({companion, changeRecipient, visibleMessage, getDialogVisibility}) => {
  const message = (visibleMessage.hasOwnProperty('text'))
    ? {[companion.id]: visibleMessage}
    : visibleMessage;

  return (
    <li
      className="chat"
      onClick={() => {
        changeRecipient(companion);
        getDialogVisibility(true);
      }}
    >
      <img
        src={companion.avatar}
        alt={`${companion.firstName} ${companion.lastName}`}
        className="chat__img"
      />
      <div className="chat__avatar-label"></div>
      <p className="chat__name"> {`${companion.firstName} ${companion.lastName}`}</p>
      <p className="chat__last-message">{message[companion.id].text}</p>
      <p className="chat__date">{formatDate(message[companion.id].date, 'forChat')}</p>
    </li>
  )
};
