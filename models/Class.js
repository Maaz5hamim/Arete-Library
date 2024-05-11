const mongoose = require('mongoose')
const Section = require('./Section')

const classSchema = new mongoose.Schema
({
    className: { type: String, required: true, trim: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}] 
})

classSchema.pre('remove', async function (next) 
{
    try 
    {
      await Section.deleteMany({ _id: { $in: this.sections } })
      console.log('Deleted associated sections for class:', this.className)
    } 
    catch (error) {console.error('Error deleting sections:', error.message)}
    next()
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
