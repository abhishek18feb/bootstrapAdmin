const Branch = require('../models/BranchModel');
const mongoose = require('mongoose');

exports.get_all = (req, res, next)=>{
    Branch.find()
    .select('branchName branchAddress _id')
    .exec()
    .then(result=>{
        const response = {
            count: result.length,
            branches: result.map(result=>{
                return {
                    branchName: result.branchName,
                    branchAddress: result.branchAddress,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/branch/'+result._id
                    }
                }
            })
        }
             res.status(200).json({
                message: 'Handling GET request to /branches',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

exports.add_branch = (req, res, next)=>{
    console.log(req.userData);
    Branch.find({branchName: req.body.branchName, branchAddress: req.body.branchAddress})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "You have already added this branch and address"
            });
        }else{
          const branch = new Branch({
              _id: new mongoose.Types.ObjectId,
              branchName: req.body.branchName,
              branchAddress: req.body.branchAddress
          });
          branch.save().then(result => {
              console.log(result)
              res.status(201).json({
                  message: "Handling POST request to /products",
                  createdBranch: {
                      name: result.name,
                      price: result.price,
                      _id: result._id,
                      request: {
                          type: 'GET',
                          url: 'http://localhost:3000/branch/'+result._id
                      }
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

// exports.products_get_product = (req, res, next) =>{
//     var id = req.params.productId;
//     console.log(id);
//     Product.findById({"_id":id})
//     .select("name price _id productImage")
//     .exec()
//     .then(doc =>{
//         console.log(doc)
//         if(doc){
//             res.status(201).json({
//                 message: "Handling GET request to /products/:id",
//                 createdProduct: doc,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/products/'+doc._id
//                 }
//             });
//         }else{
//             res.status(404).json({
//                  message: "No valid entry found for this provided id",
//             });
//         }
//     }).catch(err=>{ res.status(500).json({ error:err}); });
// }
//
// exports.products_update_product = (req, res, next) =>{
//     const id = req.params.productId;
//     const updateOps = {};
//     for(const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({"_id":id}, {$set: updateOps})
//     .exec()
//     .then(doc=>{
//         res.status(200).json({
//             message: "Product with "+id+" updated",
//             request: {
//                 type: 'GET',
//                 url: 'http://localhost:3000/products/'+doc._id
//             }
//         })
//     })
//     .catch(err=>{
//         res.status(500).json({
//             message: "There was an error in updating the product",
//             error: err
//         })
//     });
// }
//
// exports.products_delete_product = (req, res, next) =>{
//     const id = req.params.productId;
//     Product.remove({_id: id})
//     .exec()
//     .then(result=>{
//         res.status(200).json({
//             message: 'Deleted Products',
//             request:{
//                 type: "POST",
//                 body: {
//                     type: 'POST',
//                     url: "localhost:3000/products",
//                     body: {name: 'String', price: 'Number'}
//                 }
//             }
//         });
//     })
//     .catch(err=>{
//         res.status(500).json({
//             error: err
//         });
//     });
//
// }
