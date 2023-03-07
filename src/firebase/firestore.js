import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import app from "./app"

const db = getFirestore(app)

export async function getUser(id) {
  const userRef = doc(db, "users", id)
  try {
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data()
    }
    return null
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export async function updateUser(id, user) {
  const userRef = doc(db, "users", id)
  try {
    await updateDoc(userRef, user)
  }
  catch (error) {
    console.log(error)
    return null
  }
}
