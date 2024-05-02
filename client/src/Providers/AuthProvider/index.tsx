import { FC, useState, useEffect, PropsWithChildren, createContext, useContext } from "react";

import { User } from "../../types";
import { axiosClient } from "../../axiosClient";
import { useWs } from "../../Pages/Home/Providers/wsProvider";

interface AuthContextType {
  user: User | null,
  isLoading: boolean,
  login: (username: string, password: string) => Promise<string>,
  signin: (fullname: string, username: string, password: string) => Promise<string>,
  logout: () => void
}

interface AuthTokens {
  accessToken: string | null,
  refreshToken: string | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState<AuthTokens>(() => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }));

  const { sendMessage } = useWs()


  useEffect(() => {
    const asyncEffect = async () => {
      if (authTokens.accessToken) {
        const { data: user } = await axiosClient.get('me')
        setUser(user)
        sendMessage(JSON.stringify({ userId: user.id, action: 'connected' }))
      }
      setLoading(false);
    }

    asyncEffect();
  }, []);

  const login = async (username: string, password: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    const { data: { access_token, refresh_token, user } } = await axiosClient.post('login',
      bodyFormData
    )
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    setAuthTokens({ accessToken: access_token, refreshToken: refresh_token })
    setUser(user);
    sendMessage(JSON.stringify({ userId: user.id, action: "connected" }))

    return user.id;
  };

  const signin = async (fullname: string, username: string, password: string) => {
    const { data: { access_token, refresh_token, user } } = await axiosClient.post('signin',
      {
        fullname, username, password
      }
    )
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    setAuthTokens({ accessToken: access_token, refreshToken: refresh_token })
    setUser(user);

    return user.id;
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    sendMessage(JSON.stringify({ userId: user?.id, action: "disconnected" }))
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const { data } = await axiosClient.post('refresh',
        { refresh_token: authTokens.refreshToken });

      if (data) {
        setAuthTokens((prev) => ({ ...prev, access_token: data.access_token }));
        localStorage.setItem('accessToken', data.access_token);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        refreshAccessToken();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signin }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider
