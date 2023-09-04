const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Godzilla8126:Gautam8126@inotebook.bjlhzcp.mongodb.net/INoteBook"

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("connected to MongoDB"))
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectToMongo