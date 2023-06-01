const mongoose = require('mongoose')

const Workers = new mongoose.Schema(
    {
        fullname: {
            type: "string", 
            required: true, 
            trim:true
        },
        status: {
            type: "string", 
            required: false, 
            trim:false, 
        },
        birth: {
            type: "string", 
            required: false, 
            trim:false, 
        },
        date: {
            type: "string", 
            required: true
        },
        amount: {
            type: "number", 
            required: false
        },
        groups: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Groups'
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Workers', Workers)