const mongoose = require('mongoose')
const debug = require('debug')('mongoose')

const classSchema = new mongoose.Schema
({
    className: { type: String, required: true, trim: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}] 
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
