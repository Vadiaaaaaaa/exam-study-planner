const mongoose = require('mongoose');


const TopicSchema = new mongoose.Schema({
name: { type: String, unique: true },
subject: String,
estMinutes: Number,
remainingMinutes: Number,
weight: Number,
deadlineDay: Number,
prereqs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
completed: { type: Boolean, default: false }
});


module.exports = mongoose.model('Topic', TopicSchema);