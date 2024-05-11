const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
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
            enum: ['Teacher', 'Student'],
            required: true
        },
        password:
        {
            type:String, 
            required: function() {
                return this.role === 'Teacher';
            }
        },
        erp: 
        { 
            type: Number, 
            unique: true, 
            required: function() {
                return this.role === 'Student';
            } 

        },
        enrolledSections: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
            required: function() {return this.role === 'Student'}
        },
        attemptedAssessments: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
            required: function() {return this.role === 'Student'}
        },
        classes: 
        {
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],  
            required: function() {
                return this.role === 'Teacher';
            }
        }
    })
    
    userSchema.index({ 'email': 1 })
    
    const User = mongoose.model('User', userSchema)

    module.exports = User
