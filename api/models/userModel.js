var mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    'id': {
        type: Number,
        require: true,
        unique: true
    },
    'username': {
        type: String,
        require: true,
        unique: true
    },
    'email': {
        type: String,
        require: true,
        unique: true,
        validator: (value) => {
            return validator.isEmail(value)
        }
    },
    'birthdate': {
        type: Date
    }
});

let Users = new mongoose.model('users', userSchema);

module.exports = Users;
