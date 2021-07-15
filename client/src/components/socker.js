import io from 'socket.io-client'

export let socket = io(process.env.REACT_APP_API_BASE_URL)
console.log(process.env.REACT_APP_API_BASE_URL)