const express = require('express')
const path = require('path')
const {engine} = require('express-handlebars')
require('dotenv').config()
//  REQUIRE DB function
const configDB = require('./configDB/config')
// session registry
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

// server configuration
const server = express()

// DB configuration
configDB()

// JSON configuration
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// HBS configuration
server.engine('.hbs', engine({extname: '.hbs'}))
server.set('view engine', '.hbs')

// session configuration
const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI 
})
server.use(session({
    secret: process.env.SECTION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store  
})) 

// STATIC FILES configuration
server.use(express.static( path.join(__dirname, 'public') ))

server.get('/', require('./controls/pagesControls').getDashboard )
server.get('/child/order', require('./controls/pagesControls').getOrder )
server.post('/child/order', require('./controls/pagesControls').newOrderCreate )

server.get('/child/order/table', require('./controls/pagesControls').getOrderTable )

// Router configuration
server.use('/admin',require('./routers/authRouters'))
// server.use('/',  require('./routers/pagesRouters'))
server.use('/', require('./middleware/auth').protuctedAdmin, require('./routers/pagesRouters'))

// SERVER LISTENING configuration
const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => { 
    if (err) {  
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})





