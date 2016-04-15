var mongoose = require('mongoose');  

var connection = mongoose.connect('mongodb://localhost:27017/test');

var userSchema = new mongoose.Schema({ 
    id: String,
    name: { firstName: String, lastName: String },
    email: String,
    phoneNumber: String,
    languages: [{ name: String, proficiency: Number }]
});
var User = connection.model('User', userSchema);

exports.User = User;
