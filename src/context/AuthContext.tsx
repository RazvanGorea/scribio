import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { logOut as apiLogout } from "../api/auth";
import { clearBearerToken, setNewBearerToken } from "../api/axios";
import { getFollowings } from "../api/profile";
import { BasicUser, UserPrivate } from "../types/User.type";
import {
  clearCachedUser,
  getCachedUser,
  initAuth,
  setCachedUser,
} from "../utils/auth";

type AuthContextType = {
  user: UserPrivate | null;
  followings: BasicUser[] | null;
  isFinished: boolean;
  isUserInitialized: boolean;
  login: (user: UserPrivate, access_token: string) => void;
  logout: () => void;
  fetchFollowings: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  followings: null,
  isFinished: false,
  isUserInitialized: false,
  login: () => {},
  logout: () => {},
  fetchFollowings: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserPrivate | null>(null);
  const [followings, setFollowings] = useState<BasicUser[] | null>(null);
  const [isFinished, setIsFinished] = useState(false); // Used to check when auth api calls are done

  const login = useCallback((user: UserPrivate, access_token: string) => {
    // Send access token with all future requests
    setNewBearerToken(access_token);
    // Cache user in local storage
    setCachedUser(user);
    // Update context state
    setUser(user);
    setIsFinished(true);
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    clearCachedUser();
    clearBearerToken();
    setUser(null);
    setIsFinished(true);
  }, []);

  useEffect(() => {
    // Use cached profile until auth initialization
    const cachedUser = getCachedUser();
    if (cachedUser) setUser(cachedUser);

    initAuth()
      .then(({ user, access_token }) => login(user, access_token))
      .catch(() => logout());
  }, [logout, login]);

  const fetchFollowings = useCallback(async () => {
    try {
      setFollowings(null);
      const data = await getFollowings();
      setFollowings(data);
    } catch (error) {
      console.log(error);
      setFollowings([]);
    }
  }, []);

  useEffect(() => {
    if (user && isFinished) fetchFollowings();
  }, [user, isFinished, fetchFollowings]);

  const value = {
    user,
    followings,
    isFinished,
    isUserInitialized: user && isFinished ? true : false, // Used to check when auth api calls are done and user is logged in
    login,
    logout,
    fetchFollowings,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};
