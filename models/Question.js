const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
{
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['MCQ', 'Short Answer', 'True/False'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: function() {
            return this.type === 'MCQ';
        }
    },
    correctOption: {
        type: String,
        required: function() {
            return this.type === 'MCQ';
        }
    },
    isTrue: {
        type: Boolean,
        required: function() {
            return this.type === 'True/False'
        }
    },
    explanation: {
        type: String
    },
    image: {
        type: String 
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
