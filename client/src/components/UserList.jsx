import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { socket } from './socker'

export default function UserList() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('listUsers', users => {
            console.log(users)
            setUsers(users.names)
        })
    }, [users])
 
    return (
        <Box boxShadow={1} style={{padding: '20px', width: '25%'}} className='div-scroll'>
            <Typography variant='subtitle2'>Usuarios</Typography>
            { users.map((user, index) => (
                <Box key={index} display='flex' flexDirection='row' alignItems='center'>
                    <div className='circle'></div>
                    <Typography variant='subtitle1'>{user}</Typography>
                </Box>
            ))}
        </Box>
    )
}
