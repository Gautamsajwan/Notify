import React, { useContext, useEffect, useState } from 'react'
import { NotesContext } from '../context/NotesContext'

function AddNote() {
    const { addNote, popUp } = useContext(NotesContext)
    const [userInput, setUserInput] = useState({ title: '', description: '', tag: '' })
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        let timer
        if(invalid) {
            timer = setTimeout(() => {
                setInvalid(false)
            }, 1500)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [invalid])

    function handleChange(e) {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(userInput.title.length < 3 || userInput.description.length < 10 || userInput.tag.length == 0) {
            setInvalid(true)
            return;
        } else {
            setInvalid(false)
            addNote(userInput.title, userInput.description, userInput.tag)

            setUserInput({ title: '', description: '', tag: '' })
        }
    }

    return (
        <section className={`${popUp && 'blur-sm'} mt-2.5 sm:w-1/2 md:w-2/5 lg:w-1/3`}>
            {invalid && (
                <div className="p-3 bg-neutral-700 fixed top-20 left-1/2 -translate-x-1/2 z-10 text-white rounded-lg">
                    Invalid input ❌
                </div>
            )}
            <form className="mb-7 p-2.5 relative rounded-lg border-2 border-dashed border-gray-400" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold leading-7 text-gray-900">Add Note</h2>
                <p className="mt-1 py-1.5 px-2 bg-red-200 rounded-md text-sm leading-6 text-gray-600">This note will be visible here so be careful what you post</p>

                <div className="mt-3 flex flex-col gap-1">
                    <label htmlFor="title" className="text-lg block font-semibold leading-6 text-gray-900">Title ✨</label>
                    <input type="text" name="title" id="title" className="block flex-1 border-2 border-gray-400 rounded-md outline-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6" placeholder="enter the title" onChange={handleChange} value={userInput.title}/>

                    <label htmlFor="description" className="mt-3 block text-lg font-semibold leading-6 text-gray-900">Description 📑</label>
                    <textarea id="description" name="description" rows="3" className="block w-full border-2 border-gray-400 rounded-md outline-0 py-1.5 pl-1 text-gray-900 shadow-md placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6" placeholder="enter the description" onChange={handleChange} value={userInput.description}></textarea>

                    <label htmlFor="tag" className="mt-3 block text-lg font-semibold leading-6 text-gray-900">Tag 🏷️</label>
                    <input type="text" name="tag" id="tag" className="block flex-1 border-2 border-gray-400 rounded-md outline-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 sm:text-sm sm:leading-6" placeholder="enter the tag" onChange={handleChange} value={userInput.tag}/>
                </div>

                <button className="py-2 px-3 mt-2 w-full font-bold text-white bg-blue-400 rounded-md hover:scale-95 transition duration-100 active:bg-blue-500" type="submit">Create Note</button>
            </form>
        </section>
    )
}

export default AddNote