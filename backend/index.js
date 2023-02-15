const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
app.use(cors())

const server = http.createServer(app)
let current_screen = 'mainpage'
let already_changing = false;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

//const http = require('http').Server(app)
//const io = require('socket.io')(http)

app.use(express.json())

app.get('/', (request, response) => {
    response.send("this is the test webpage")
})

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on("clicktest", async (user_socket) => {
        console.log(`the click test to the backend worked, from user ${user_socket.id}`)
    })

    socket.on("change_screens", async () => {

        if (already_changing) {
            console.log("already changing bitch!!!!")
            return 
        }

        console.log("wait to change...")
        already_changing = true;
        setTimeout(() => {
            current_screen = 'captionpage'
            socket.emit("change_screen", current_screen)
            already_changing = false;
        }, "10000")
    })

    socket.on("get_curr_screen", async () => {
        
        let temp_screen_grab = current_screen
        socket.emit("get_curr_screen", temp_screen_grab)
    })
})

server.listen(3001, function() {
    console.log('listening to 3001')
})