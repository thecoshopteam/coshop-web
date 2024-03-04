import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";

// Firebase imports
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      createUserDocument(user);
      console.log(`${user.email} was successfully registered.`);
    } catch (error) {
      console.error("Error during createUser:", error);
    }
  };

  const createUserDocument = async (user) => {
    try {
      await setDoc(doc(db, `users/${user.uid}`), {
        email: user.email,
      });
    } catch (error) {
      console.error("Error during createUserDocument:", error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log(`${user.email} was successfully logged in.`);
    } catch (error) {
      console.error("Error during loginUser:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log(`User was successfully logged out.`);
    } catch (error) {
      console.error("Error during logoutUser:", error);
    }
  };

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup: Unsubscribe from the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []); // Empty array to only run once on mount

  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <UserContext.Provider value={{ registerUser, loginUser, logoutUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
