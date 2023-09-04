import React, { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'

function NoteItem({ note, updateNote }) {
    const { deleteNote, popUp, togglePopUp } = useContext(NotesContext)

    function handleDelete() {
        if (!popUp)
            deleteNote(note._id)
    }

    function handleEdit() {
        if (!popUp) {
            togglePopUp()
            updateNote(note)
        }
    }

    return (
        <article className="py-2 px-3 h-full bg-green-300 rounded-lg">
            <div className="pb-2.5 space-x-4 cursor-pointer flex justify-end border-b-2 border-dashed border-gray-700">
                {/* add date */}
                <i className="fa-regular fa-pen-to-square scale-125" onClick={handleEdit}></i>
                <i className="fa-regular fa-square-minus scale-125" onClick={handleDelete}></i>
            </div>
            <h3 className="break-words text-2xl capitalize font-bold text-gray-800">{note.title}</h3>

            <p className="break-words mt-1">{note.description}</p>

            <div className="tags my-2">
                <span className="py-1 px-2 py bg-green-600 text-white rounded-md capitalize text-sm">{note.tag}</span>
            </div>
        </article>
    )
}

export default NoteItem