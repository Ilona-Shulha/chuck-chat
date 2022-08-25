import React, { useContext} from 'react';
import { UserContext } from '../UserContext';

export const Header = React.memo(({searchPattern, getSearch}) => {
  const user = useContext(UserContext);

  return (
  <div className="header">
    <div className="header__owner-info">
      <img
        src={user.avatar}
        className="header__owner-avatar"
        alt=""
      />
      <div className="header__avatar-label"></div>
      <h2 className="header__owner-name">
        {`${user.firstName} ${user.lastName}`}
      </h2>
    </div>
    <input
      value={searchPattern}
      type="text"
      className="header__search"
      placeholder="Search or start new chat"
      onChange={(e) => getSearch(e)}
    />
  </div>
)});
