const express = require('express');
const http = require('http');
const app = express()

const server = http.createServer(app)

const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
        origin: "*",
    }
})

let sockets = []

io.on('connection', socket => {
    let name = ''
    socket.on('connected', (nombre) => {
        name = nombre
        console.log('usuario conectado', nombre)
        
        socket.broadcast.emit('message', { nombre: name, message: name+' has connected' })
        
        sockets.push({client: name, socketId: socket.id})
        io.emit('listUsers', { sockets })

        console.log(sockets)
    })

    socket.on('message', (name, message) => {
        console.log('mensaje', message)
        io.emit('message', { name, message })
    })
    socket.on('disconnect', (reason) => {
        console.log(reason, name)
        io.emit('message', { server, message: name+' has disconnected' })

        sockets = sockets.filter(item => item.socketId !== socket.id)
        console.log(sockets)
        io.emit('listUsers', { sockets })

    })
})

server.listen(3001, () => {
    console.log('server in port', 3001)
})

