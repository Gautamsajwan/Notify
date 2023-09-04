const express = require('express')
const fetchUser = require('../middlewares/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const router = express.Router()

// fetch all notes
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.send(notes)
    } catch (err) {
        res.status(500).send("internal server error")
    }
})

// add new notes
router.post('/addnote', fetchUser, [
    body('title', 'title too short').isLength({ min: 3 }),
    body('description', 'description too short').isLength({ min: 10 })
], async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() })
    }

    try {
        const { title, description, tag } = req.body
        const user = req.user
        const note = await Notes.create({ user, title, description, tag })
        res.send(note) // its an array which we are sending back
    } catch (err) {
        console.error(err.message)
        res.status(500).send("internal server error")
    }
})

// update a note from the collection
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    // here id signify the unique id of the note that is to be updated
    const { title, description, tag } = req.body // updates to be done
   
    try {
        const newNote = { title, description, tag }

        let note = await Notes.findById(req.params.id) // fetching the note to be updated using the id

        if (!note) {
            return res.status(404).send("note not found")
        }

        if(note.user.toString() != req.user) { // comparing the current user id to the id by which note was created
            return res.status(401).send("unauthorized access")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) // code for updating the fiels
        res.json({ note })
    } catch (err) {
        res.status(500).send("internal server error")
    }
})

// delete a note from the collection
router.delete('/deletenote/:id', fetchUser, async(req, res) => {
    try {
        const note = await Notes.findById(req.params.id)

        if(!note) {
            return res.status(404).send("note not found")
        }

        if(note.user.toString() !== req.user) {
            return res.status(401).send("unauthorized access")
        }

        await Notes.findByIdAndDelete(req.params.id)

        res.json({status: "note deleted", note})
    } catch(err) {
        res.status(500).send("internal server error")
    }
})

module.exports = router