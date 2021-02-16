const {Schema, model} = require('mongoose');

const schema = new Schema({ //id fieled is set by default so there is no need to specify it explicitly
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean, 
        default: false
    }
});

module.exports = model('Todo', schema); //it will be later used in the 'routes'/todos.js file