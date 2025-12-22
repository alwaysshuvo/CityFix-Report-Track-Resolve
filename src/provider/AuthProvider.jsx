import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  /** Save user into DB safely */
  const saveUserToDB = async (userInfo) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    } catch (err) {
      console.log("DB save failed:", err);
    }
  };

  /** Register user */
  const createUser = async (email, password, name) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await saveUserToDB({
      name,
      email,
      role: "citizen",
    });

    return result;
  };

  /** Login user */
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /** Google Login */
  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);

    await saveUserToDB({
      name: result.user.displayName,
      email: result.user.email,
      role: "citizen",
    });

    return result;
  };

  /** Logout */
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  /** Monitor Auth State */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE}/users/${currentUser.email}`
          );
          if (!res.ok) {
            setRole("citizen");
          } else {
            const data = await res.json();
            setRole(data?.role || "citizen");
          }
        } catch (err) {
          console.log("Role fetch failed:", err);
          setRole("citizen");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
