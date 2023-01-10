const express = require('express')
const app = express();
//The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

//intialisng server using http module 
const server = http.createServer(app);

//connecting our server to socketio server 
const io = new Server(server, {
    cors: {
        //which url will be calling with our server i.e our react web 
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


//to know if someone connected to this socketio server 
//socket io works on events the below runs when a connection is established 
// Connect
// Message
// Disconnect
// Reconnect
io.on("connection", (socket) => {
    //when someone connects(evrryone will have differnet socket id)to the server we console out socket id 
    console.log(`User connected ${socket.id}`);

    //we want to join a room with room passed as a data 
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id :${socket.id} joined room:${data}`)
    })
    socket.on("send_message", (data) => {
        console.log(data)
    
        //emit data to only connected room peeps 
        io.in('0').fetchSockets().then((data)=>{
            console.log(data)
            console.log(data.length)
        })
        socket.to(data.room).emit("receive_message", data);
        

    })
    socket.on("disconnect", () => {
        // socket.leave(0);
        console.log("user disconnected", socket.id)
        io.disconnectSockets()
    })
})

//listening to server 
server.listen(3001, () => {
    console.log('listening to 3001')
})


