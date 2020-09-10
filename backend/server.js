let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');
const app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
    // Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('数据库连接成功')
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
)

// Setting up port with express js
const employeeRoute = require('../backend/routes/employee.route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute)
io.on('connection', function(socket) {
        socket.emit('newMessage', { systemMsg: '欢迎来访' });
        socket.on('sendMessage', function(msg) {
            console.log(msg);
        });
    })
    // Create port
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log('服务器启动成功 ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});