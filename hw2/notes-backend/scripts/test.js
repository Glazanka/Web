const db = require('../config/db');
const User = require('../models/user');
const Note = require('../models/note');
const Todo = require('../models/todo');

async function run() {
    console.log('🚀 Стартиране на теста с новата структура...');

    // Създаваме потребител
    const user = await User.create({ username: 'newUser', email: 'newuser@mail.com', password: 'pass1234' });

    // Създаваме ToDo списък
    const todo = await Todo.create({
        tasks: [
            { task: 'Купи мляко' },
            { task: 'Напиши домашното', completed: true }
        ]
    });

    // Създаваме бележка с връзка към ToDo и notificationDate
    const note = await Note.create({
        userId: user._id,
        title: 'Бележка с ToDo',
        description: 'Тази бележка е свързана със задачи.',
        notificationDate: new Date(Date.now() + 2 * 3600000),  // Напомняне след 2 часа
        taskListId: todo._id,
        sharedWith: []
    });

    console.log('Създадена бележка с ToDo:', note);
    process.exit();
}

run();

