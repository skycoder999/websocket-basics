const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null;

// we all know this basic createServer function which takes request and sends a response
// here we are creating  a raw http server (this will help us to create TCP  which will then pass to the websockets to do the task)
const httpserver = http.createServer((req, res) => 
                console.log("we have received a request"))

 //pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res 
const websocket = new WebSocketServer({
    "httpServer": httpserver
})


httpserver.listen(8080, () => console.log("My server is listening on port 8080"))


//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
websocket.on("request", request=> {
// we decide whether we want to accept the request from the client or not
    connection = request.accept(null, request.origin)
    connection.on("open", () => console.log("Opened!!!"))
    connection.on("close", () => console.log("CLOSED!!!"))
    connection.on("message", message => {

        console.log(`Received message ${message.utf8Data}`)
        connection.send(`got your message: ${message.utf8Data}`)
    })


    //use connection.send to send stuff to the client 
   // sendevery5seconds();
    

})
 
function sendevery3seconds(){
    connection.send(`Message ${Math.floor(Math.random() * 10)}`);
    setTimeout(sendevery3seconds, 3000);
};


//Open console of your chrome or firefox browser, start debugging mode and in console type the following
//let myws = new WebSocket("ws://localhost:8080");
//myws.onmessage = message => console.log(`Received: ${message.data}`);

//Now come back to your vscode terminal and in debug console, below you will find debugger add the following and see the output in browser console.
//myws.send("Hello! I'm client")