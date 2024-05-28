const mongoose = require('mongoose')
const Response = require('./Response')

const summarySchema = new mongoose.Schema(
{
    participants:
    [
        {
            sectionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
            sectionName: String,
            responses: Number,
            averageScore: Number,
            highestScore: Number,
            responseTime: Number,
            students: 
            [
                {
                    name: String,
                    erp: Number,
                    response:{type: mongoose.Schema.Types.ObjectId, ref: 'Response'}
                }
            ],
            questions: 
            [
                {
                    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
                    totalResponses: Number,
                    totalSkipped: Number,
                    totalCorrect: Number,
                    averageResponseTime: Number,
                    highestScore: Number,
                    averageScore: Number
                }
            ]    
        }
    ],
    generated: Date
})

const assessmentSchema = new mongoose.Schema(
{
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    class: {type: String},
    title: { type: String, required: true },
    totalMarks: {type: Number},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    description : {type: String},
    coverImage: { type: String },
    status : {type: String},
    stoppingCriteria: {type: Number},
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
    [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        reuse: { type: Boolean, default: false } 
    }],
    summary: summarySchema
}, 
{
    timestamps: true,
})

assessmentSchema.pre('remove', async function (next) 
{
    const assessmentToDelete = this
    try 
    {
      await Response.deleteMany({ assessment: new mongoose.Types.ObjectId(this._id) })
      console.log('Deleted associated responses for assessment:', classToDelete.className)
    } 
    catch (error) {console.error('Error deleting responses:', error.message)}
    next()
})

assessmentSchema.index({ teacher: 1 });

const Assessment = mongoose.model('assessment', assessmentSchema)

module.exports = Assessment
