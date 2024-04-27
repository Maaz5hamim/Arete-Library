const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema(
{
    participants:
    [
        {
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
    totalMarks: Number,
    generated: Date
})


const assessmentSchema = new mongoose.Schema(
{
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    class: {type: String},
    title: { type: String, required: true },
    totalMarks: {type: Number},
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
    [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        reuse: { type: Boolean, default: false } 
    }],
    summary: summarySchema
}, 
{
    timestamps: true,
})

assessmentSchema.post(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function(doc) {
    try {
      const updatedAssessment = await this.model.findOne(this.getQuery()).populate({
        path: 'questionBank.question',
        select: 'points'
      });
  
      if (updatedAssessment.questionBank) {
        const totalMarks = updatedAssessment.questionBank.reduce((total, question) => {
          return total + question.points;
        }, 0);
        
        await this.model.findByIdAndUpdate(doc._id, { totalMarks: totalMarks });
      }
    } catch (error) {
      console.error('Error updating totalMarks:', error);
    }
  });

assessmentSchema.index({ teacher: 1 });

const Assessment = mongoose.model('assessment', assessmentSchema)

module.exports = Assessment
