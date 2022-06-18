import { createContext, useState } from 'react';

export const contexts = createContext({
  setup: '',
  setStup: () => {},
});

const Provider = ({ children }) => {
  const [setup, setSetup] = useState('');
  return (
    <contexts.Provider value={{ setup, setSetup }}>
      {children}
    </contexts.Provider>
  );
};

export default Provider;
