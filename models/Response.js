const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema
({
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, 
    status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete' }, 
    responses: 
    [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, 
        answer: String, 
        score: Number, 
        feedback: String 
    }]
}, 
{ timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
