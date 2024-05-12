const mongoose = require('mongoose')
const User = require('./User')

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

sectionSchema.pre('findOneAndDelete', async function (next) 
{ 
    const sectionId = this.getQuery() && this.getQuery()['_id']
    const deletedSection = await mongoose.model('Section').findById(sectionId)

    await mongoose.model('User').updateMany
    (
      { _id: { $in: deletedSection.roster } }, 
      { $pull: { enrolledSections: sectionId } }
    )

    const classId = deletedSection.class
    const updatedClass = await mongoose.model('Class').findByIdAndUpdate( classId, { $pull: { sections: sectionId } })
    if(!updatedClass){throw new Error('Class not found')}

    next()
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section