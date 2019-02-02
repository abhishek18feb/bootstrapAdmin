const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/product');
const BranchController = require('../controller/BranchController');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


router.get('/', BranchController.get_all);

router.post('/add_branch',  checkAuth, BranchController.add_branch);

//router.get('/:productId', BranchController.products_get_product);

//router.patch('/:productId',  checkAuth, BranchController.products_update_product);

//router.delete('/:productId',  checkAuth, BranchController.products_delete_product);

module.exports = router;
