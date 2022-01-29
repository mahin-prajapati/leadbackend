const Tag = require("../models/tags")
const mongoose = require("mongoose")

// Get Id of Tag in controller
exports.getTagById = (req, res, next, id) => {
    try{
        Tag.findById(id).exec((err, tag) => {
            if(err) {
                return res.status(400).json({
                    error: "Tag not found"
                })
            }
            req.tag = tag
            next()
        })
    } catch(error){
        console.log(error)
    }
}

//Store Tag data in DB
exports.createTag = (req, res) => {
    try{
        const tag = new Tag(req.body)
        tag.save((err, tag) => {
            if(err){
                return res.status(400).json({
                    error: "Tag not able to save"
                })
            }
            res.json({tag}) 
        })
    } catch(error) {
        console.log(error)
    }
}

//Get Tag Data
exports.getTag = (req, res) => {
    try{
        return res.json(req.tag)
    } catch(error) {
        console.log(error)
    }
}

//Get All Tag Data
exports.getAllTag = (req, res) => {
    try{
        Tag.find().exec((err, tag) => {
            if(err) {
                return res.status(400).json({
                    error: "No Tag found"
                })
            }
            res.json(tag)
        })
    } catch(error) {
        console.log(error)
    }
}

//Update Tag Data
exports.updateTag = async(req, res) => {
    try{
        let tag = await Tag.findOne({ _id: mongoose.Types.ObjectId(req.body.tagId) })
        if(!tag){
            return res.send("something went wrong")
        } else {
            let editTag = await Tag.updateMany({ _id: req.body.tagId },{
                tagName: req.body.tagName,
                status: req.body.status
            })
            if(editTag.nModified > 0){
                let tag = await Tag.findOne({ _id: mongoose.Types.ObjectId(req.body.tagId) })
                return res.send("Tag data updated successfully")
            }
        }
    }catch(error){
        console.log(error)
    }
}

//Delete Tag Data
exports.deleteTag = (req, res) => {
    try{
        let tag = req.tag
        Tag.deleteOne(tag, (err, tag) => {
            if(err){
                return res.status(400).json({
                    error: "No Tag Type found"
                })
            }
            return res.send("Tag details deleted successfully")
        })
    }catch(error){
        console.log(error)
    }
}