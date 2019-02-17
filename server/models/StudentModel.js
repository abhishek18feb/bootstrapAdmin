const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    firstName: {type: String, required: true, max: 100},
    middleName: {type: String, max: 100},
    lastName: {type: String, max: 100},
     aadhaar: {type: String, required: true, max: 100},
    dob: {type: String, required: true, max: 100},
    gender: {type: String, required: true, max: 100},
    religion: {type: String, required: true, max: 100},
    nationality: {type: String, required: true, max: 100},
    class: {type: String, required: true, max: 100},
    section: {type: String, required: true, max: 100},
    branch: {type: String, required: true, max: 100},
    previousSchool: {type: String,  max: 100},
    previousClass: {type: String,  max: 100},
    previousSchoolAddress: {type: String,  max: 100},
    studentImage: {type: String,  max: 100},
    //sibling: [{name: String, class: String, school: String}],
});


// Export the model
module.exports = mongoose.model('Student', StudentSchema);
