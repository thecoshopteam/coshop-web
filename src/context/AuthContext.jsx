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
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredentials.user;
      await createUserDocument(user);
      console.log(`${user.email} was successfully registered.`);
    } catch (error) {
      throw new Error(`registerUser failed: ${error.message}`);
    }
  };

  const createUserDocument = async (user) => {
    try {
      await setDoc(doc(db, `users/${user.uid}`), {
        email: user.email,
      });
    } catch (error) {
      throw new Error(`createUserDocument failed: ${error.message}`);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredentials.user;
      console.log(`${user.email} was successfully logged in.`);
    } catch (error) {
      throw new Error(`loginUser failed: ${error.message}`);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log(`User was successfully logged out.`);
    } catch (error) {
      throw new Error(`logoutUser failed: ${error.message}`);
    }
  };

  const updateUserEmail = async (newEmail) => {
    try {
      await updateEmail(user, newEmail);
      console.log(`User email was successfully updated.`);
    } catch (error) {
      throw new Error(`updateUserEmail failed: ${error.message}`);
    }
  };

  const updateUserPassword = async (newPassword) => {
    try {
      await updatePassword(user, newPassword);
      console.log(`User password was successfully updated.`);
    } catch (error) {
      throw new Error(`updateUserPassword failed: ${error.message}`);
    }
  };

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Update loading state after getting user state
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
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        updateUserEmail,
        updateUserPassword,
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
