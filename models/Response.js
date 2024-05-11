const mongoose = require('mongoose')
const Question = require('./Question')

const responseSchema = new mongoose.Schema
({
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true},
    responses: 
    [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, 
        answer: [String], 
        score: Number, 
        feedback: String,
    }],
    submittedAt: Date,
    status: { type: String, enum: [ 'Active', 'Submitted'], default: 'Active' },  
    totalScore: Number,
    responseTime: Number,
    previousScore: Number,
    previousTotal: Number
}, 
{ timestamps: true })

responseSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function(next) {
    const responses = this._update.responses
    if (!responses) {return next()}

    let totalScore = 0

    for (const response of responses) 
    {
        const question = await Question.findById(response.questionId)

        if (question.type === 'True/False') 
        {
            if (response.answer[0] === 'False' && !question.isTrue || response.answer[0] === 'True' && question.isTrue) {
                response.score = question.points
                totalScore += question.points
            }
            else{response.score = 0}
        } 
        else if (question.type === 'MCQ') 
        {
            const isAnswerCorrect = question.correctOptions.every(option => response.answer.includes(option))
            if (isAnswerCorrect) {
                response.score = question.points
                totalScore += question.points
            }
            else{response.score = 0}
        }
    }

    this._update.submittedAt = Date.now()
    this._update.totalScore = totalScore

    next()
})

responseSchema.index({ 'assessment': 1 })

const Response = mongoose.model('Response', responseSchema)

module.exports = Response
