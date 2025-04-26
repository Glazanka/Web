const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://elenkaptieva:ElenaK12345@cluster0.2matsfp.mongodb.net/notesdb?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Свързване с MongoDB успешно!'))
.catch(err => console.error('Грешка при свързване:', err));

module.exports = mongoose;
