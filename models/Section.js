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

sectionSchema.pre('remove', async function (next) 
{ 
    try 
    {
      const studentsToUpdate = this.roster

      await User.updateMany
      (
        { _id: { $in: studentsToUpdate } }, 
        { $pull: { enrolledSections: this._id } }
      )

      console.log('Updated enrolledSections for students on section deletion')
    } 
    catch (error) {console.error('Error updating student enrolledSections:', error.message)}
    next()
})
  
const Section = mongoose.model('Section', sectionSchema)

module.exports = Section