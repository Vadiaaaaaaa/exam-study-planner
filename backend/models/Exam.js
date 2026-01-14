const mongoose = require('mongoose');


const ExamSchema = new mongoose.Schema({
subject: { type: String, required: true },
day: { type: Number, required: true }
});


module.exports = mongoose.model('Exam', ExamSchema);