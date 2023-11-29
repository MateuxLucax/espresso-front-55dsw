import React from "react";
import { User } from "../../models/User";

export type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = React.createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export default UserContext;
