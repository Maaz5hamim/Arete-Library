const mongoose = require('mongoose')
const Section = require('./Section')

const classSchema = new mongoose.Schema
({
    className: { type: String, required: true, trim: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}] 
})

classSchema.pre('findOneAndDelete', async function (next) 
{

    const classId = this.getQuery() && this.getQuery()['_id']
    const deletedClass = await mongoose.model('Class').findById(classId)
    for (const id of deletedClass.sections) 
    {
        await mongoose.model('Section').findByIdAndDelete(id)
        console.log(`Deleted section with ID: ${id}`)
    }
    const teacher = await mongoose.model('User').findByIdAndUpdate(deletedClass.teacher, { $pull: { classes: classId } })
    if(!teacher){throw new Error('User not found')}
        
    next()
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
