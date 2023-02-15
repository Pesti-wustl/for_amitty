import React, {useEffect, useState} from 'react'
import io from "socket.io-client"
import Captionpage from './components/Captionpage'
import Mainpage from './components/Mainpage'

const user_socket = io.connect('http://localhost:3001')

function App() {

  const [currentScreen, setCurrentScreen] = useState("mainpage")
  const [socket, setSocket] = useState(user_socket)

  useEffect(() => {
    setSocket(user_socket)
    socket.emit("get_curr_screen")    
  })
  
  socket.on("get_curr_screen", (screen_grab) => {
    setCurrentScreen(screen_grab)
  })

  socket.on("change_screen", (new_screen) => {
    setCurrentScreen(new_screen)
  })

  useEffect(() => {
    setSocket(user_socket)
  }, [user_socket])

  function socketTest() {
    console.log("CLCIK TEST")
    let socket_id = socket.id
    socket.emit("clicktest", {id: socket_id})
    socket.emit('change_screens')
  }

  return (
    <div className="App">
      <p>Goodnight world</p>
      <h2>Hiii</h2>

      {currentScreen == 'mainpage' ? <Mainpage/> : <Captionpage/>}


      <button onClick={() => socketTest()}>Press me to change screens</button>
    </div>
  );


}

export default App;
