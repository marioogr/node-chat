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

let names = []

io.on('connection', socket => {
    let name = ''
    socket.on('connected', (nombre) => {
        names.push(nombre)
        name = nombre
        console.log('usuario conectado', nombre)
        console.log(names)
        socket.broadcast.emit('message', { nombre: name, message: name+' has connected' })
        io.emit('listUsers', { names })
    })
    socket.on('message', (name, message) => {
        io.emit('message', { name, message })
    })
    socket.on('disconnect', (reason) => {
        console.log(reason, name)
        names = names.filter(item => item === name)
        io.emit('message', { server: 'server', message: 'has disconnected' })
    })
})

server.listen(3001, () => {
    console.log('server in port', 3001)
})

