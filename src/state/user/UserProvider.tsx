import React, { useState, useEffect, ReactNode } from "react";
import UserContext from "./UserContext";
import { Request } from "../../services/request";
import { User } from "../../models/User";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function checkUser() {
      const currentUser = localStorage.getItem("user");
      if (!currentUser) return;

      try {
        const parsedUser = JSON.parse(currentUser) as User;
        const response = await Request.get("artisan/me", {
          Authorization: `Bearer ${parsedUser.token}`,
        });
        if (!response) return;

        setUser(parsedUser);
      } catch (error) {
        console.warn(error);
        setUser(undefined);
        localStorage.removeItem("user");
      }
    }

    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
