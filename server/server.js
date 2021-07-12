const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express()

app.use(cors('*'))
const server = http.createServer(app)

const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})

io.on('connection', socket => {

    let name = ''
    socket.on('connected', (nombre) => {
        name = nombre
        console.log('usuario conectado', nombre)
        socket.broadcast.emit('message', {nombre: name, message: name+' has connected'})
    })
    socket.on('message', (name, message) => {
        io.emit('message', {name, message})
    })
    socket.on('disconnected', () => {
        io.emit('message', {server: 'server', message: 'has disconnected'})
    })
})

server.listen(3001, () => {
    console.log('server in port', 3001)
})