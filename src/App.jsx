import { useState, useEffect } from 'react'
import {db} from './firebase-config.js'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import './App.css'

function App() {
//hooks
const [newName, setNewName] = useState('')
const [newAge, setNewAge] = useState(0)
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

//logics
//pang Create ng data sa firebase
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
  }
//pang get ng data sa Firebase
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      console.log(data)
      setUsers(data.docs.map((doc) =>({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])
// pang update ng mga data's
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }
//pang delete
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  return (
    <>
    <div className='main'>
{/* Insert Data's */}
    <div className='insert'>
    <input type='text' placeholder='Name' onChange={(event) => {setNewName(event.target.value)}}/>
    <input type='number' placeholder='Age' onChange={(event) => {setNewAge(event.target.value)}}/>
    <button onClick={createUser}>Create</button>
    </div>
{/* see Data's */}
    <div className='see data'>
        {users.map((user) => {
          return <><div><h1>Name: {user.name} </h1></div>
           <div><h1>Age: {user.age} </h1></div>
           <button onClick={() => {updateUser(user.id, user.age)}}>increase age</button>
           <button onClick={() => {deleteUser(user.id)}} >Delete</button>
           </>
        })}
           </div>
    </div>
    </>
  )
}

export default App
