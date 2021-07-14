import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function UserList({ users }) {
    
    return (
        <Box style={{ padding: '20px', width: '25%' }} className='div-scroll'>
            <Typography variant='subtitle2'>Usuarios</Typography>
            { users.map((user, index) => (
                <Box key={index} display='flex' flexDirection='row' alignItems='center'>
                    <div className='circle'></div>
                    <Typography variant='subtitle1'>{user.client}</Typography>
                </Box>
            ))}
        </Box>
    )
}
