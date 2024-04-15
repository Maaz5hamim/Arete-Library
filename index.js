const Student = require('./models/Student')
const Assessment = require('./models/Assessment')
const Class = require('./models/Class')
const Question = require('./models/Question')
const Response = require('./models/Response')
const Section = require('./models/Section')
const Teacher = require('./models/Teacher')

console.log('Welcome to Arete Library')

module.exports = {Student, Assessment, Question, Response, Teacher, Section, Class}