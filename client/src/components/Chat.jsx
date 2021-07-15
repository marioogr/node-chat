import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import MessagesArea from './MessagesArea';
import UserList from './UserList';
import { socket } from './socker'
import { ToastContainer, toast } from 'react-toastify';


export default function Chat({ nombre }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        socket.emit('connected', nombre)
    }, [nombre])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
            toast(message.name+': '+message.message)
        })
        socket.on('listUsers', sockets => {
            setUsers(sockets.sockets)
           
        })
        return () => {socket.off()}
    }, [messages, users])

    const submit = (e) => {
        e.preventDefault()
        if(message) {
            socket.emit('message', nombre, message)
        }
        setMessage('')
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <Box display="flex" flexDirection='row' className='div-shadows'>
                <MessagesArea messages={messages}></MessagesArea>
                <UserList users={users}></UserList>
            </Box>
            <form onSubmit={submit} style={{width: '100%'}}>
                <FormControl style={{width: '100%'}}>
                    <TextField 
                        autoComplete='off'
                        width="100%"
                        id="standard-basic" 
                        variant='outlined'
                        label="Mensaje" 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        style={{marginTop: '20px'}}
                    />
                    <Button type='submit'>Enviar</Button>
                </FormControl>                
            </form>
        </div>
        
    )
}
