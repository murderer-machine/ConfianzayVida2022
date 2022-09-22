import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

const App = () => {

  const [fecha, setFecha] = useState('')
  useEffect(() => {
    const messageListener = (args) => {
      setFecha(args)
    }
    socket.on('message', messageListener)
    return () => {
      socket.off('message', messageListener);

    }
  }, [socket])

  return (
    <div>
      <h1>Socket.io</h1>
      <h2>Fecha: {fecha}</h2>
    </div>
  );
}

export default App;