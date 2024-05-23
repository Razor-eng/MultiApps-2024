import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import Notes from "./Pages/Notes"
import Apps from "./Pages/Apps"
import Signin from "./Pages/Signin"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "./firebase"
import Signup from "./Pages/Signup"
import Dashboard from "./Pages/Dashboard"
import PageNotFound from "./Pages/PageNotFound"
import { useEffect, useState } from "react"
import Spinner from "./Components/Spinner/Spinner"
import Passwords from "./Pages/Passwords"
import Expenses from "./Pages/Expenses"
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [user, loading] = useAuthState(auth);
  const [load, setLoad] = useState(false);

  const [notes, setNotes] = useState(0);
  const [passwords, setPasswords] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const isExpenses = async () => {
    await getDocs(collection(db, "expenses"))
      .then((querySnapshot) => {
        setExpenses(querySnapshot.docs.filter(doc => { return doc.data().id === user.uid }).length);
      })
  }

  const isNotes = async () => {
    await getDocs(collection(db, "notes"))
      .then((querySnapshot) => {
        setNotes(querySnapshot.docs.filter(doc => { return doc.data().id === user.uid }).length);
      })
  }

  const isPasswords = async () => {
    await getDocs(collection(db, "passwords"))
      .then((querySnapshot) => {
        setPasswords(querySnapshot.docs.filter(doc => { return doc.data().id === user.uid }).length);
      })
  }

  useEffect(() => {
    if (!loading) {
      if (user) {
        isExpenses();
        isNotes();
        isPasswords();
      }
    }
  }, [user, loading]);

  useEffect(() => {
    setLoad(true);
    if (!loading) {
      setTimeout(() => {
        setLoad(false);
      }, 500);
    }
  }, [loading, user]);

  return (
    <BrowserRouter>
      <Sidebar expenses={expenses} passwords={passwords} notes={notes} />
      <Navbar user={user} />
      <div className="py-28 md:pl-72 md:pr-10 z-0 px-2 md:px-0">
        {load ?
          <Spinner />
          :
          <Routes>
            <Route path="/" element={<Dashboard expenses={expenses} passwords={passwords} notes={notes} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/notes" element={<Notes user={user} />} />
            <Route path="/passwords" element={<Passwords user={user} />} />
            <Route path="/expenses" element={<Expenses user={user} />} />
            <Route path=":random" element={<PageNotFound />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  )
}

export default App
