import { useState, useEffect } from 'react'
import {db} from './firebase-config.js'
import {collection, getDocs, addDoc, doc, deleteDoc, orderBy, query,serverTimestamp} from 'firebase/firestore'
import UpdateUser from './UpdateUser.jsx'
import './App.css'

function App() {
//hooks
const [newName, setNewName] = useState('')
const [newAge, setNewAge] = useState(0)
const [users, setUsers] = useState([])
const [selectUser, setSelectUser] = useState(null)
const usersCollectionRef = collection(db, "users")

//logics
//pang Create ng data sa firebase
const createUser = async () => {
  await addDoc(usersCollectionRef, {
    name: newName,
    age: Number(newAge),
    createdAt: serverTimestamp(), // Add this line
  });
};
//pang get ng data sa Firebase
  useEffect(() => {
    const getUsers = async () => {
      const q = query(usersCollectionRef, orderBy("createdAt", "desc"))
      const data = await getDocs(q)
      // console.log(data)
      setUsers(data.docs.map((doc) =>({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

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
        {users.map((user) => <>
          <div key={user.id}><h1>Name: {user.name} </h1></div>
           <div><h1>Age: {user.age} </h1></div>
           <button onClick={() => setSelectUser(user)}>Update</button>
           <button onClick={() => {deleteUser(user.id)}} >Delete</button>
           </>
        )}
        </div>
    </div>

     {/* Show UpdateUser Component */}
      {selectUser && (
        <UpdateUser
          user={selectUser}
          onClose={() => setSelectUser(null)}
        />
      )}
    </>
  )
}

export default App
