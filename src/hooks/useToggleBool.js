import React from 'react';

export const useToggleBool = (value = false) => {
  const [bool, setBool] = React.useState(value);
  const toggle = React.useCallback(() => setBool(prevState => !prevState), []);
  return [bool, toggle];
};
