const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const MainController = require('./controller/MainController')


app.set('view engine', 'hbs')
require('hbs').registerPartials(__dirname + '/views/component/')

app.get('/register', MainController.registerPage)
app.get('/', MainController.loginPage)
app.get('/settings/:id',MainController.settingsPage)

app.post('/register', MainController.register)
app.post('/login', MainController.login)
app.post('/changePassword/:id',MainController.changePassword)

app.listen(8080)