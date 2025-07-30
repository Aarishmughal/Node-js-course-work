const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
    console.log("There was a new Sale!");
});
myEmitter.on("newSale", () => {
    console.log("Customer Name: Aarish");
});
myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${stock} items left in stock.`);
});
myEmitter.emit("newSale", 9);

////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request Recieved.");
    res.end("Request Recieved");
});
server.on("request", (req, res) => {
    console.log("Another Request.");
});
server.on("close", () => {
    console.log("500 Server Closed");
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Server is Listening on PORT: 8000");
});
