const mongoose = require('mongoose')
const { Schema } = mongoose

const NotesSchema = new Schema({
    user: { // will store the userId provided by the jwt
        type: mongoose.Schema.Types.ObjectId, // defines the data type as a MongoDB ObjectId
        ref: 'user'
        // With this configuration, the "user" field in the schema will store an ObjectId that represents the ID of a document from the "user" model
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notes', NotesSchema)