import React, { useContext, useEffect, useState } from 'react'
import { NotesContext } from '../context/NotesContext'
import EditNote from './EditNote'
import NoteItem from './NoteItem'

function Notes() {
    const { notes, fetchNotes, editNote, popUp } = useContext(NotesContext)
    const [targetNote, setTargetNote] = useState({})

    useEffect(() => {
        fetchNotes()
    }, [])

    const updateNote = (note) => { // this func. retreives the value of the selected note from NoteItem component & sends that value to EditNote component
        if (popUp) {
            console.log(popUp, 'edited')
            editNote(note._id, note.title, note.description, note.tag)
        } else {
            console.log(popUp, 'setting up values')
            setTargetNote(note)
        }
    }

    const notesArray = notes.map(note => {
        return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
        )
    })
    return (
        <div className="flex-1">
            <EditNote note={targetNote} updateNote={updateNote} />
            <section className={`${popUp && 'blur-sm'} h-96 sm:h-full` }>
                <h1 className="pb-1 py text-2xl text-gray-700 font-bold border-b-2">Your Notes 📝</h1>
                <div className="py-2 px-2.5 h-5/6 overflow-y-scroll mt-2 grid gap-2.5 bg-green-200 rounded-xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {(notesArray.length == 0)? <h3 className="font-bold text-gray-600">Add a note to start viewing</h3> : notesArray}
                </div>
            </section>
        </div>
    )
}

export default Notes