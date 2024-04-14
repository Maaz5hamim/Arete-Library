const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema
({
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, 
    status: { type: String, enum: [ 'Active', 'Submitted'], default: 'Active' },  
    responses: 
    [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, 
        answer: [String], 
        score: Number, 
        feedback: String 
    }]
}, 
{ timestamps: true })

responseSchema.index({ 'assessment': 1 })

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
