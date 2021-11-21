/* eslint-disable import/no-unused-modules */

import React, { useContext, useState, useEffect } from "react"
import { firebase, auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const createUser = (userData) => {
  const dataSa = { ...userData, userId: firebase.auth().currentUser.uid }
  console.log(dataSa)
  userData && dataSa.userId &&
    firebase
      .firestore()
      .collection("users")
      .add(userData, { merge: true }).then(() => {
        console.log("User successfully added to the DB!");
      })
      .catch((e) => {
        console.log("Error adding user to the DB: ", e);
      });
}