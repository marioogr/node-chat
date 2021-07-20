import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, TextField } from '@material-ui/core';
import MessagesArea from './MessagesArea';
import UserList from './UserList';
import { socket } from './socker'
import { ToastContainer, toast } from 'react-toastify';
import TipingAlert from './TipingAlert';


export default function Chat({ nombre }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)
    const [writingName, setWritingName] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
        socket.emit('writing', nombre)
    }

    useEffect(() => {
        socket.emit('connected', nombre)
    }, [nombre])

    useEffect(() => {
        socket.on('message', message => {
            if (message.name === 'server') {
                toast(message.name+': '+message.message)
            }
            setMessages([...messages, message])
        })
        socket.on('listUsers', sockets => {
            setUsers(sockets.sockets)
        })
        socket.on('writing', name => {
            setCount(2)
            setWritingName(name.name)
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

    useEffect(() => {
        if (count !== 0) {
            setTimeout(() => {
                setCount(count-1)
            }, 1000)
        }
    }, [count])

    return (
        <div>
            <ToastContainer></ToastContainer>
            <Box display="flex" flexDirection='row' className='div-shadows'>
                <MessagesArea messages={messages}></MessagesArea>
                <UserList users={users}></UserList>
            </Box>
            <Box style={{height: '50px'}}>
                <TipingAlert life={count} name={writingName}></TipingAlert>
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
                        onChange={e => handleChange(e)}
                        style={{marginTop: '20px'}}
                    />
                    <Button type='submit'>Enviar</Button>
                </FormControl>                
            </form>
        </div>
        
    )
}
