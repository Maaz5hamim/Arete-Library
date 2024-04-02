const mongoose = require('mongoose')

const classSchema = new mongoose.Schema
({
    className: { type: String, required: true, trim: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}] 
})

classSchema.index({ teacher: 1 });

const Class = mongoose.model('Class', classSchema)

module.exports = Class
