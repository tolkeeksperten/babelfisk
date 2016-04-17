var mongoose = require('mongoose');  

var connection = mongoose.connect('mongodb://localhost:27017/test');

var languageSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

var proficiencyTypeSchema = new mongoose.Schema({
    id: Number,
    name: String,
});

var userSchema = new mongoose.Schema({ 
    id: Number,
    name: { firstName: String, lastName: String },
    email: String,
    phoneNumber: String,
    languages: [{languageId: Number, proficiencyType: Number}],
    
});

var User = connection.model('User', userSchema);

exports.User = User;
