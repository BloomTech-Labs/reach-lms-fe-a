import React from 'react';

export const useToggleBool = () => {
  const [bool, setBool] = React.useState(false);
  const toggle = () => setBool(prevState => !prevState);

  return [bool, toggle];
};
