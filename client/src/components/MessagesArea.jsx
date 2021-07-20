import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useRef } from 'react'

export default function MessagesArea({ messages }) {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])   
    
    return (
        <Box style={{padding: '20px', width: '100%'}} className='div-scroll'>
            { messages.map((e, i) => {
                return (
                    <Box 
                        border={1}
                        borderColor="grey.300"
                        key={i} 
                        display="flex" 
                        flexDirection="row" 
                        borderRadius={5}
                        className="message"
                    >
                        <Typography variant='subtitle1' style={{fontWeight: 'bold'}}>{e.name}</Typography>
                        <Typography variant='subtitle1'>{': '+e.message}</Typography>
                    </Box>
                )
            })}
            <div ref={messagesEndRef} />
        </Box>
    )
}
