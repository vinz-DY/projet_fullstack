import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [connected, setConnected] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ connected, setConnected }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
