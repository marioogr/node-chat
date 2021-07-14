import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/Chat';

function App() {
  const [name, setName] = useState('')
  const [register, setRegister] = useState(false)

  const registrar = (e) => {
      e.preventDefault()
      if (name !== '') {
          setRegister(true)
      }
  }
  return (
    <div style={{margin: '20px'}}>
      <Typography variant='h5'>Chat</Typography>
      {register ? (
        <>
        <Typography variant='subtitle1'>Estas conectado como: {name}</Typography>
        <Chat nombre={name}></Chat>
        </>
      ):(
        <form onSubmit={e => registrar(e)}>
          <FormControl>
            <TextField 
              id="standard-basic" 
              variant='outlined'
              label="Nombre" 
              onChange={e => setName(e.target.value)}
            />
            <Button type="submit">Ingresar</Button>
          </FormControl>
        </form>
      )}
     
    </div>
  );
}

export default App;
