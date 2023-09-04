import React, { useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { NotesContext } from './NotesContext'

function ContextProvider({ children }) {
  const host = 'http://localhost:5000'

  const [darkTheme, setdarkTheme] = useState(false)
  const toggleTheme = () => {
    setdarkTheme(prev => !prev)
  }

  const[popUp, setpopUp] = useState(false)
  const togglePopUp = () => {
    setpopUp(prev => !prev)
  }

  const [notes, setNotes] = useState([])

  // fetch notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZiN2YyODFkZGRjMjViOWU3YWM5ZGIiLCJpYXQiOjE2ODQ5MTg4MTh9.cOLZXaWFqVK4R1M0IZ4Pl2eikQO5oaWK0GYVDuWsqiw"
      },
    })

    const data = await response.json()
    setNotes(data)
  }

  //Add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZiN2YyODFkZGRjMjViOWU3YWM5ZGIiLCJpYXQiOjE2ODQ5MTg4MTh9.cOLZXaWFqVK4R1M0IZ4Pl2eikQO5oaWK0GYVDuWsqiw"
      },
      body: JSON.stringify({ title, description, tag })
    })

    const addedNote = await response.json()
    setNotes(notes.concat(addedNote))
  }

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZiN2YyODFkZGRjMjViOWU3YWM5ZGIiLCJpYXQiOjE2ODQ5MTg4MTh9.cOLZXaWFqVK4R1M0IZ4Pl2eikQO5oaWK0GYVDuWsqiw"
      },
    })

    const newNotes = notes.filter(note => note._id !== id)
    setNotes(newNotes)
  }
  //Edit note
  const editNote = async(id, title, description, tag) => {
    const response = await fetch(`${host}/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZiN2YyODFkZGRjMjViOWU3YWM5ZGIiLCJpYXQiOjE2ODQ5MTg4MTh9.cOLZXaWFqVK4R1M0IZ4Pl2eikQO5oaWK0GYVDuWsqiw"
      },
      body: JSON.stringify({title, description, tag})
    })
    fetchNotes()
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, popUp, togglePopUp }}>
      <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </NotesContext.Provider>
  )
}

export default ContextProvider