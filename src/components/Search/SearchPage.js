import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import UserList from './UserList';

const SearchPage = props => {
  const [input, setInput] = useState('');
  const [userListDefault, setUserListDefault] = useState();
  const [userList, setUserList] = useState();

  const fetchData = async () => {
    return await fetch(
      'https://reach-team-a-be.herokuapp.com/v2/api-docs/users/user/name/{userName}'
    )
      .then(response => response.json())
      .then(data => {
        setUserList(data);
        setUserListDefault(data);
      });
  };

  const updateInput = async input => {
    const filtered = userListDefault.filter(user => {
      return user.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setUserList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>User List</h1>
      <SearchBar input={input} onChange={updateInput} />
      <UserList userList={userList} />
    </>
  );
};

export default SearchPage;
