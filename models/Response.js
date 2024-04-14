const mongoose = require('mongoose')
const Question = require('./Question')

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

responseSchema.pre('save', function(next) {
    const responses = this.responses
    let totalScore = 0

    responses.forEach(response => 
    {
        Question.findById(response.questionId, (err, question) => 
        {
            if (err) {
                return next(err)
            }
            if (!question) {
                return next(new Error('Question not found'))
            }

            if (question.type === 'True/False') {
                if (response.answer[0] === 'false' && !question.isTrue || response.answer[0] === 'true' && question.isTrue) {
                    response.score = question.points
                    totalScore += question.points
                }
            } else if (question.type === 'MCQ') {
                const selectedOptions = response.answer

                const isAnswerCorrect = correctOptions.every(option => selectedOptions.includes(question.correctOptions))
                if (isAnswerCorrect) {
                    response.score = question.points
                    totalScore += question.points
                }
            }

            this.totalScore = totalScore

            next()
        })
    })
})

responseSchema.index({ 'assessment': 1 })

const Response = mongoose.model('Response', responseSchema)

module.exports = Response
