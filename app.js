const express = require('express');
const app = express();



app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index')
})

server = app.listen(3200);

const io = require('socket.io')(server);

io.on('connection', socket =>{
    console.log('New user connected');

    socket.username ="Anonymous";

    socket.on('change_username', (data) => {
        socket.username = data.username
        console.log(socket.username)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username:socket.username})
    })

    socket.on('typing_end', (data) => {
        socket.broadcast.emit('typing_end', {username:socket.username})
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message:data.message, username: socket.username})
    })
})