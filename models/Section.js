const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema(
{
    sectionName: { type: String, required: true, trim: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    roster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
},
{
    timestamps: true,
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section