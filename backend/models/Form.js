const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    type: String,  // 'Categorize', 'Cloze', 'Comprehension'
    question: String,
    options: [String],  // For Categorize or Cloze
    answer: String,  // Answer for Cloze or Comprehension
    image: String,  // URL for an image related to the question
});

const FormSchema = new mongoose.Schema({
    title: String,
    headerImage: String,  // Header image for the form
    questions: [QuestionSchema],
    responses: [{
        userId: String,
        answers: [{
            questionId: String,
            answer: String,
        }],
    }],
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;
