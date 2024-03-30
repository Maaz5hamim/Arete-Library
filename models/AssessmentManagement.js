const mongoose = require('mongoose')
const Question = require('./Questions')
const Class = require('./ClassManagement')
const Schema = mongoose.Schema

const questionBankSchema = new mongoose.Schema(
{
    questions: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Question
    }],
    reusedQuestions: 
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: Question
    }]
})

const assessmentSchema = new Schema(
{
    teacherID: { 
        type: String,
        required: true,
        validate: 
        {
            validator: function(value) {return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)},
            message: 'Invalid TeacherId'
        }},
    title: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: Class.sections }],
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
    questionBank: questionBankSchema, 
}, 
{
    timestamps: true,
})

assessmentSchema.set('toJSON', { getters: true });

const Assessment = mongoose.model('assessment', assessmentSchema)

module.exports = Assessment
