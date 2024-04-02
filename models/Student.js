const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema
({
  name: {type: String, required: true},
  email: 
    {
        type: String,
        required: true,
        unique: true,
        validate: 
        {
            validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
            message: 'Invalid Email'
        } 
    },
  erp: { type: Number, unique: true, required: true },
  enrolledSections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section'}]
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student
