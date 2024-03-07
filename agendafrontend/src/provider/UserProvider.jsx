import React, { createContext, useState, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
