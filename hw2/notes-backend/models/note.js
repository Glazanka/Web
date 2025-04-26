const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },   
    creationDate: { type: Date, default: Date.now },
    notificationDate: { type: Date },   // Ново поле за напомняния
    taskListId: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' },  // Връзка с ToDo списък
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Споделяне
});

module.exports = mongoose.model('Note', NoteSchema);
