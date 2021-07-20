import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function UserList({ users }) {
    
    return (
        <Box className='users-area'>
            { users.map((user, index) => (
                <Box key={index} display='flex' flexDirection='row' alignItems='center' padding={1}>
                    <div className='circle'></div>
                    <Typography variant='subtitle1'>{user.client}</Typography>
                </Box>
            ))}
        </Box>
    )
}
