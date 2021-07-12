import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Button, FormControl, TextField } from '@material-ui/core';
import MessagesArea from './MessagesArea';

let socket = io("http://localhost:3001")


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
        socket.emit('message', nombre, message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <MessagesArea messages={messages}></MessagesArea>
            </div>
            <form onSubmit={submit} style={{width: '100%'}}>
                <FormControl style={{width: '100%'}}>
                    <TextField 
                        width="100%"
                        id="standard-basic" 
                        variant='outlined'
                        label="Mensaje" 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        style={{marginTop: '18px'}}
                    />
                    <Button type='submit'>Enviar</Button>
                </FormControl>                
            </form>
        </div>
        
    )
}
