import { createContext, useContext, useState, ReactNode } from "react";
import { authLogin, authRegister } from "../lib/api";

export type UserRole = "khach" | "admin";

export interface UserProfile {
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  driverLicense?: string;
  role?: UserRole;
}

interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (profile: UserProfile & { password?: string }) => Promise<UserProfile>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "ktshowroom_user";

function loadUser(): UserProfile | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(loadUser);

  const persist = (u: UserProfile) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
  };

  const login = async (email: string, password: string) => {
    const { user: apiUser } = await authLogin(email, password);
    const profile: UserProfile = {
      fullName: apiUser.fullName || email,
      idNumber: apiUser.idNumber || "",
      phone: apiUser.phone || "",
      email: apiUser.email,
      address: (loadUser()?.email === apiUser.email && loadUser()?.address) || "",
      driverLicense: apiUser.driverLicense || "",
      role: apiUser.role,
    };
    persist(profile);
    return profile;
  };

  const register = async (profileInput: UserProfile & { password?: string }) => {
    const { user: apiUser } = await authRegister(profileInput);
    const profile: UserProfile = {
      fullName: apiUser.fullName,
      idNumber: apiUser.idNumber || profileInput.idNumber || "",
      phone: apiUser.phone || profileInput.phone || "",
      email: apiUser.email,
      address: profileInput.address || "",
      driverLicense: apiUser.driverLicense || profileInput.driverLicense || "",
      role: apiUser.role,
    };
    persist(profile);
    return profile;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
