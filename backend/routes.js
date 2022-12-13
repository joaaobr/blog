const UserController = require('./controllers/UserController')

module.exports = (app) => {
    app.post('/create', UserController.create)
    
    app.post('/delete', UserController.delete)
}