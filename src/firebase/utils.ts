import config from "./config"
import firebase , { User } from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp(config)
const firestore = firebase.firestore()
const auth = firebase.auth()

const handelUser = async (userAuth: User | null, data: any) => {
  if(!userAuth) return;

  const { uid } = userAuth
  const user = firestore.doc(`users/${uid}`)
  const snapshot = await user.get()

  if(!snapshot.exists) {
    const { email } = userAuth
    const { displayName } = data
    const createdAt = new Date()

    try {
      await user.set({ displayName, email, createdAt, ...data })
    } catch (error) {
      console.log("[!] Error@firebase/utils: ", error)
    }
  }

  return user
}

export const authState = async (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged((user: User | null) => callback(user))
}

export const addUser = async (displayName: string, email: string, password: string) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password)
  await handelUser(user, { displayName })
}

export const login = async (email: string, password: string) => {
  await auth.signInWithEmailAndPassword(email, password)
}

export const logout = async () => { 
  await auth.signOut()
}