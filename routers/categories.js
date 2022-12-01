const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');

router.get(`/`, async (req,res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);

})

router.get(`/:id`, async (req,res) => {
    Category.findById(req.params.id).then(category=>{
        if(!category) {
            res.status(500).json({success: false, message: 'the given category doesnt exist'})
        } 
        res.send(category);

    })

})

router.post(`/`,async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
    category = await category.save();
    if(!category)
    return res.status(404).send('the category cannt be created')
    res.send(category);
})

router.delete(`/:id`, (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success: true, messgae: 'the category deleted'})
         } else {
            return res.status(400).json({success: false, messgae: 'category doesnt exist'})
         }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

module.exports = router;
