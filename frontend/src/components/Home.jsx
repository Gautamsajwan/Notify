import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

function Home() {
  return (
    <div className="home w-full h-full relative p-5 flex flex-col sm:flex-row gap-4">
      <AddNote />
      <Notes />
    </div>
  )
}

export default Home