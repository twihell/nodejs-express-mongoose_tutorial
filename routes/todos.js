const {Router} = require('express');
const Todo = require('../models/Todo');

const router = Router();


router.get('/', async (request, response) => {
    const todos = await Todo.find({}).lean();

    response.render('index', { //second parameter - additional html configurations;
        title: 'Todos List',
        isIndex: true, /*creating visual lighting over active nav element; these are like flags that need
        to be used in the corresponding layout */
        todos
    }); //render() is an express.response method to paint html pages;
})

router.get('/create', (request, response) => {
    
    response.render('create', {
        title: 'Create todo',
        isCreate: true
    });
})

router.post('/create', async (request, response)=> {
    const todo = new Todo({
        title: request.body.title
    })

    await todo.save();
    response.redirect('/');
})

router.post('/complete', async (request, response) => {
    const todo = await Todo.findById(request.body.id);

    todo.completed = !!request.body.completed;
    await todo.save();
    response.redirect('/');
})

router.post('/delete', async (request, response) => {
    const todo = await Todo.findById(request.body.id);

    await todo.remove((err, item) => { //remove the item from the database
        if (err) {
            throw err;
        }
        console.log('items deleted: ', item); 
    });

    response.redirect('/');
})

module.exports = router; //this command will export this router for it to be imported elsewhere in the project;