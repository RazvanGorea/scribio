import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { logOut as apiLogout } from "../api/auth";
import { clearBearerToken, setNewBearerToken } from "../api/axios";
import { User } from "../types/User.type";
import {
  clearCachedUser,
  getCachedUser,
  initAuth,
  setCachedUser,
} from "../utils/auth";

type AuthContextType = {
  user: User | null;
  login: (user: User, access_token: string) => void;
  logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((user: User, access_token: string) => {
    // Send access token with all future requests
    setNewBearerToken(access_token);
    // Cache user in local storage
    setCachedUser(user);
    // Update context state
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    clearCachedUser();
    clearBearerToken();
    setUser(null);
  }, []);

  useEffect(() => {
    // Use cached profile until auth initialization
    const cachedUser = getCachedUser();
    if (cachedUser) setUser(cachedUser);

    initAuth()
      .then(({ user, access_token }) => login(user, access_token))
      .catch(() => logout());
  }, [logout, login]);

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};
