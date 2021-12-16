import { MeQuery, useMeQuery } from "@/src/generated/graphql";
import { createContext, useContext, useEffect, useState } from "react";

interface IContextProps {
  user: MeQuery["me"];
  setUser: React.Dispatch<React.SetStateAction<MeQuery["me"]>>;
  authLoading: boolean;
  authError?: string;
  loadUser: () => void;
}

const AuthContext = createContext<IContextProps>(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<MeQuery["me"]>(null);

  const [{ fetching: authLoading, data, error }] = useMeQuery();

  useEffect(() => loadUser(), [data]);

  // Stores logged-in user's info in the global state
  const loadUser = () => {
    try {
      if (data) {
        setUser(data.me);
      }
    } catch (err) {
      console.error(error, err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
