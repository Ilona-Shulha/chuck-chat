import React, { useContext } from 'react';
import { formatDate } from '../../dateExtractor';
import { UserContext } from '../UserContext';

export const Message = React.memo(({ message }) => {
  const user = useContext(UserContext);

  return (
  <div className='message__data'>
    <p className={`message__text text ${(message.authorId === user.id) ? 'text--light' : 'text--dark'}`}>
      {message.text}
    </p>
    <p className={`message__date date ${(message.authorId === user.id) && 'date--out'}`}>
      {formatDate(message.createdAt, 'forMessage')}
    </p>
  </div>
)});
