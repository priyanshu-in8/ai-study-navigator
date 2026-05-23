import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { authApi } from "@/services/api";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  xpPoints?: number;
  level?: number;
  streakDays?: number;
  subjects?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  setAuth: (
    token: string,
    user: User
  ) => void;

  refreshUser: () => Promise<void>;

  signOut: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    token: null,
    loading: true,

    setAuth: () => {},

    refreshUser: async () => {},

    signOut: async () => {},
  });

export const useAuth = () =>
  useContext(AuthContext);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
    setToken(null);
    setLoading(false);
  };

  const restoreSession =
    async () => {
      const storedToken =
        localStorage.getItem(
          "token"
        );

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Render cold start fix
        let data;

        try {
          data =
            await authApi.getProfile();
        } catch {
          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                1500
              )
          );

          data =
            await authApi.getProfile();
        }

        setToken(
          storedToken
        );

        setUser(
          data.user
        );
      } catch (error) {
        console.log(
          "Session restore failed",
          error
        );

        clearAuth();
      } finally {
        setLoading(false);
      }
    };

  const setAuth = (
    newToken: string,
    newUser: User
  ) => {
    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    setToken(newToken);
    setUser(newUser);
    setLoading(false);
  };

  const refreshUser =
    async () => {
      try {
        const data =
          await authApi.getProfile();

        setUser(
          data.user
        );
      } catch (error) {
        console.log(
          "Refresh failed"
        );
      }
    };

  const signOut =
    async () => {
      try {
        await authApi.logout();
      } catch (error) {
        console.log(error);
      } finally {
        clearAuth();
      }
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setAuth,
        refreshUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}