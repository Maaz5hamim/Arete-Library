const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema(
{
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    title: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    description : {type: String},
    coverImage: { type: String },
    status : {type: String},
    configurations: 
    {
        openDate: { type: Date, required: true },
        duration: { type: Number, required: true },
        closeDate: { type: Date, required: true },
        adaptiveTesting: { type: Boolean, default: false },
        monitoring: { type: Boolean, default: false },
        instantFeedback: { type: Boolean, default: false },
        navigation: { type: Boolean, default: false },
        releaseGrades: { type: Boolean, default: false },
        viewSubmission: { type: Boolean, default: false },
        randomizeQuestions: { type: Boolean, default: false },
        randomizeAnswers: { type: Boolean, default: false },
        finalScore: { type: Boolean, default: false },
    },
    questionBank: 
    {
        questions: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }],
        reusedQuestions: 
        [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Question'
        }], 
    }
}, 
{
    timestamps: true,
})

const Assessment = mongoose.model('assessment', assessmentSchema)

module.exports = Assessment
