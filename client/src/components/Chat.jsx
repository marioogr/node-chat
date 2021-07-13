import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import MessagesArea from './MessagesArea';
import UserList from './UserList';
import { socket } from './socker'

export default function Chat({ nombre }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        socket.emit('connected', nombre)
    }, [nombre])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })

        return () => {socket.off()}
    }, [messages])

    const submit = (e) => {
        e.preventDefault()
        if(message) {
            socket.emit('message', nombre, message)
        }
        setMessage('')
    }

    return (
        <div>
            <Box display="flex" flexDirection='row'>
                <MessagesArea messages={messages}></MessagesArea>
                <UserList></UserList>
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
