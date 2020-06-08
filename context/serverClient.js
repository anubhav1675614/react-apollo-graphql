import React, { createContext } from 'react';

const ServerClientContext = createContext();

function ServerClientProvider(props) {
  return <ServerClientContext.Provider value={{ ...props }} {...props} />;
}

export { ServerClientContext, ServerClientProvider };
