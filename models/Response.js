const mongoose = require('mongoose')
const Question = require('./Question')

const flaggingSchema = new mongoose.Schema
({
    type: { type: String },
    timestamp: { type: Number },
    duration: { type: Number }, 
    image: {type: String} 
  })

const responseSchema = new mongoose.Schema
({
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true }, 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true},
    responses: 
    [{ 
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, 
        answer: [String],
        responseTime: Number, 
        score: Number, 
        feedback: String,
    }],
    submittedAt: Date,
    status: { type: String, enum: [ 'Active', 'Submitted'], default: 'Active' },  
    totalScore: Number,
    previousScore: Number,
    previousTotal: Number,
    flaggings: [flaggingSchema],
    penalty: {type: Number, default: 1}

}, 
{ timestamps: true })

responseSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function(next) {
    const responses = this._update.responses
    const status = this._update.status
    const score = this._update.totalScore

    if (!status) {return next()}

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
    if(score && score != null){this._update.totalScore = score}
    else{this._update.totalScore = totalScore}
    

    next()
})

responseSchema.index({ 'assessment': 1 })

const Response = mongoose.model('Response', responseSchema)

module.exports = Response
