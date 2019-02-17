const Student = require('../models/StudentModel');
const mongoose = require('mongoose');

exports.add_student = (req, res, next)=>{
    console.log(req.file);
    console.log('nuhhuhn',req.body);
    Student.find({firstName: req.body.firstName, aadhaar: req.body.aadhaar})
    .exec()
    .then(student=>{
        if(student.length>=1){
            return res.status(409).json({
                message: "You have already added this student"
            });
        }else{
          const student = new Student({
              _id: new mongoose.Types.ObjectId,
              firstName: req.body.firstName,
              middleName: req.body.middleName,
              lastName: req.body.lastName,
              aadhaar: req.body.aadhaar,
              dob: req.body.dob,
              gender: req.body.gender,
              religion: req.body.religion,
              nationality: req.body.nationality,
              class: req.body.class,
              section: req.body.section,
              branch: req.body.branch,
              previousSchool: req.body.previousSchool,
              previousClass: req.body.previousClass,
              previousSchoolAddress: req.body.previousSchoolAddress,
              //sibling: req.body.sibling,
              studentImage: req.file.path
            });
          student.save().then(result => {
              console.log(result)
              res.status(201).json({
                  message: "Handling POST request to /products",
                  createdStudent: {
                      firstName: result.firstName,
                      middleName: result.middleName,
                      lastName: result.lastName,
                      aadhaar: result.aadhaar,
                      dob: result.dob,
                      gender: result.gender,
                      religion: result.religion,
                      nationality: result.nationality,
                      class: result.class,
                      section: result.section,
                      branch: result.branch,
                      previousSchool: result.previousSchool,
                      previousClass: result.previousClass,
                      previousSchoolAddress: result.previousSchoolAddress,
                      //sibling: result.sibling,
                      studentImage: result.path,
                      _id: result._id
                  }
              });
          }).catch(err=>{
              console.log(err)
              res.status(500).json({
                  error: err
              });
          });
        }
    });
}
