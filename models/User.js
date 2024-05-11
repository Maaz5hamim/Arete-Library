const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
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
        role:
        {
            type: String,
            enum: ['teacher', 'student'],
            required: true
        },
        password:
        {
            type:String, 
            required: function() {
                return this.role === 'teacher';
            }
        },
        erp: 
        { 
            type: Number, 
            unique: true, 
            required: function() {
                return this.role === 'student';
            } 

        },
        enrolledSections: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
            default: undefined
        },
        attemptedAssessments: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
            default: undefined
        },
        classes: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],  
            default: undefined
        }
    })
    
    userSchema.index({ 'email': 1 })
    
    const User = mongoose.model('User', userSchema)

    module.exports = User
