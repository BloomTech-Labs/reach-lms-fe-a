import React from 'react';
import { useEffectAfterMount } from '../../../hooks';
import { Button as AntButton } from 'antd';

const ToggleContext = React.createContext();

function Toggle(props) {
  const [on, setOn] = React.useState(false);
  const toggle = React.useCallback(() => setOn(oldOn => !oldOn), []);
  useEffectAfterMount(() => {
    props.onToggle(on);
  }, [on]);
  const value = React.useMemo(() => ({ on, toggle }), [on]);
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  );
}

function useToggleContext() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the toggle component`
    );
  }
  return context;
}

function On({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
}
function Off({ children }) {
  const { on } = useToggleContext();
  return on ? null : children;
}
function Button(props) {
  const { on, toggle } = useToggleContext();
  return <AntButton on={on} onClick={toggle} {...props} />;
}

Toggle.On = On;
Toggle.Off = Off;
Toggle.Button = Button;
