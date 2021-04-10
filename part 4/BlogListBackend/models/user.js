const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    // passwordHash: { type: String, required: true },
    passwordHash: String,
    blogs: [
        {
            //generates id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

//uniqe validation template:
// var userSchema = mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, index: true, unique: true, required: true },
//     password: { type: String, required: true }
// });
 



userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

// const User = mongoose.model('User', userSchema)

// module.exports = User


module.exports = mongoose.model('User', userSchema)