const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
    // Solution 01: Basic
    // fs.readFile(`${__dirname}/test-file.txt`, "utf-8", (err, data) => {
    //     if (err) console.log(err);
    //     const fileData = data;
    //     res.end(fileData);
    // });
    // Problem: Slower for big files
    // Solution 02: Streams
    // const readable = fs.createReadStream(`${__dirname}/test-file.txt`);
    // readable.on("data", (chunk) => {
    //     res.write(chunk);
    // });
    // readable.on("end", () => {
    //     res.end();
    // });
    // readable.on("error", (err) => {
    //     console.log(err);
    // });
    // Problem: Backpressure.

    // Solution 03: Streams with Pipes
    const readable = fs.createReadStream("./test-file.txt");
    readable.pipe(res);
    // fs.createReadStream().pipe(writeableStream)
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening...");
});
