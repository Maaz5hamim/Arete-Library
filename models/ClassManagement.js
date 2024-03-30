const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema(
{
    name: { type: String, required: true },
    erp: { type: Number, required: true },
    email: 
    {
        type: String,
        required: true,
        validate: 
        {
            validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
            message: 'Invalid Email'
        } 
    }
})

const sectionSchema = new Schema(
{
    sectionName: { type: String, required: true, trim: true },
    roster: [studentSchema] 
})

const classSchema = new Schema({
    className: { type: String, required: true, trim: true},
    teacherID: { 
        type: String,
        required: true,
        validate: 
        {
            validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
            message: 'Invalid TeacherId'
        }},
    sections: [sectionSchema] 
})

classSchema.index({ 'sections.roster.email': 1 })

const Class = mongoose.model('Class', classSchema)

module.exports = Class
