import { Box, Typography } from '@material-ui/core'
import React from 'react'

export default function MessagesArea({ messages }) {
    return (
        <Box boxShadow={1} style={{padding: '5px'}}>
            { messages.map((e, i) => {
                return (
                    <Box key={i} display="flex" flexDirection="row">
                        <Typography variant='subtitle1' style={{fontWeight: 'bold'}}>{e.name}</Typography>
                        <Typography variant='subtitle1'>{': '+e.message}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}
