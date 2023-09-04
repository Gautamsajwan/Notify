import React, { useContext, useEffect, useState } from 'react'
import { NotesContext } from '../context/NotesContext'

function EditNote({ note, updateNote }) {
    const [editInput, setEditInput] = useState({ _id: '', title: '', description: '', tag: '' })
    const { popUp, togglePopUp } = useContext(NotesContext)

    useEffect(() => {
        setEditInput(note)
    }, [note])

    const handleChange = (e) => {
        setEditInput({ ...editInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        togglePopUp()
        updateNote(editInput)
    }

    return (
        <section className={`w-1/2 ${!popUp && 'hidden'} bg-gray-900 text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 rounded-lg`}>
            <form className="p-2.5" onSubmit={handleSubmit}>
                <div className="pb-1 flex justify-between items-center border-b-2 border-dashed">
                    <h2 className="text-xl font-bold leading-7">Edit Note</h2>
                    <i className="fa-regular fa-circle-xmark fa-lg cursor-pointer" onClick={() => { togglePopUp() }}></i>
                </div>


                <div className="mt-3 flex flex-col gap-1">
                    <label htmlFor="title" className="text-lg block font-semibold leading-6">Title ✨</label>
                    <input type="text" name="title" id="title" className="block caret-white bg-transparent flex-1 border-2 border-blue-400 rounded-md outline-0 py-1.5 pl-1 placeholder:text-gray-400 focus:border-green-400 sm:text-sm sm:leading-6" placeholder="enter the title" onChange={handleChange} value={editInput.title ? editInput.title : ''} />

                    <label htmlFor="description" className="mt-3 block text-lg font-semibold leading-6">Description 📑</label>
                    <textarea id="description" name="description" rows="3" className="block caret-white bg-transparent w-full border-2 border-blue-400 rounded-md outline-0 py-1.5 pl-1 shadow-md placeholder:text-gray-400 focus:border-green-400 sm:text-sm sm:leading-6" placeholder="enter the description" onChange={handleChange} value={editInput.description ? editInput.description : ''}></textarea>

                    <label htmlFor="tag" className="mt-3 block text-lg font-semibold leading-6">Tag 🏷️</label>
                    <input type="text" name="tag" id="tag" className="block caret-white bg-transparent flex-1 border-2 border-blue-400 rounded-md outline-0 py-1.5 pl-1 placeholder:text-gray-400 focus:border-green-400 sm:text-sm sm:leading-6" placeholder="enter the tag" onChange={handleChange} value={editInput.tag ? editInput.tag : ''} />
                </div>

                <button className="py-2 px-3 mt-2.5 w-full font-bold text-white bg-red-400 rounded-md hover:scale-95 transition duration-100 active:bg-blue-500" type="submit" onClick={handleSubmit}>Update Note</button>
            </form>
        </section>
    )
}

export default EditNote