const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 4;
const start = Date.now();

setTimeout(() => console.log("Timeout 1 Finished"), 0);
setImmediate(() => console.log("Immediate 1 Finished"));

fs.readFile(`${__dirname}/test-file.txt`, "utf-8", () => {
    console.log("I/O Finished");
    console.log("----------------");

    setTimeout(() => console.log("Timeout 2 Finished"), 0);
    setTimeout(() => console.log("Timeout 3 Finished"), 3000);
    setImmediate(() => console.log("Immediate 2 Finished"));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password Encrypted");
    });
});

console.log("Hello from top level code.");
