const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    snippet:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet"
        
    },
    text:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:300
    }



}, { timestamps: true })

const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;