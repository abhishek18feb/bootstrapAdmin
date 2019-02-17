const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/product');
const StudentController = require('../controller/StudentController');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/students')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    console.log(req.body);
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const upload = multer({
                        storage: storage,
                        limits:{
                            fileSize: 1024*1024*5
                        },
                        fileFilter:fileFilter
                    });


//router.get('/', StudentController.get_all);

router.post('/add_student',   upload.single('studentImage'), StudentController.add_student);

//router.get('/get_single_branch/:branchId', BranchController.get_single_branch);

//router.patch('/update_branch/:branchid',  checkAuth, BranchController.update_branch);

//router.delete('/delete_branch/:branchid',  checkAuth, BranchController.delete_branch);

module.exports = router;
