
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile 
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const register = async (name, email, password, photoURL) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL });
  };

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
