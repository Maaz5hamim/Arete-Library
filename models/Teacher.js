const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
{
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: 
    {
        type: String,
        required: true,
        validate: 
        {
            validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
            message: 'Invalid Email'
        } 
    },
    organization: { type: String, trim: true},
    classes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}] 
})

teacherSchema.index({ 'email': 1 })

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher