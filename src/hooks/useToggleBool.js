import React from 'react';

export const useToggleBool = () => {
  const [bool, setBool] = React.useState(false);
  const toggle = React.useCallback(() => setBool(prevState => !prevState), []);
  return [bool, toggle];
};
