import React from 'react';

export const useSubModal = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return { visible, showModal, hideModal };
};
