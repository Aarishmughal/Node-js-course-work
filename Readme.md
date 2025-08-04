# Node.JS Setup

My own notes/progres reports regarding the Node.JS Bootcamp course.

## Table of Contents

-   [Notes](#NOTES)
-   [Node Modules](#node-modules)
    -   [`fs` Module for File System](#fs-module-for-file-system)
    -   [`http` Module for HTTP Requests](#http-module-for-http-requests)
    -   [`url` Module for URL Queries](#url-module-for-url-queries)
-   [Techniques in Node.JS](#techniques-in-nodejs)
    -   [Restarting Server Automatically](#restarting-server-automatically)
    -   [Rendering Content Dynamically](#rendering-content-dynamically)
    -   [Getting URL Parameters](#getting-url-parameters)
    -   [Understanding Node Single-Event Loop](#understanding-node-single-event-loop)
    -   [Event-Driven Architechture](#event-driven-architechture)
    -   [Using Streams in Node.JS](#using-streams-in-nodejs)
    -   [How Requiring Modules Really works in Node.JS?](#how-requiring-modules-really-works-in-nodejs)
    -   [Using Promises to Avoid Callback Hell](#using-promises-to-avoid-callback-hell)
    -   [Understanding Aync/Await to further Improve Codebase](#understanding-ayncawait-to-further-improve-codebase)
    -   [Making Codebase consistent with Async/Await and IIFE pattern](#making-codebase-consistent-with-asyncawait-and-iife-pattern)
    -   [Fullfilling Multiple Promises using `Promise.all()`](#fullfilling-multiple-promises-using-promiseall)
-   [Coming Soon](#)

## NOTES

1. Always try to load files via the **SYNCHRONOUS ROUTINE** to make sure that files are read only once and not on each request.
2. `res.end` method for the createServer method accepts only **STRING** data
3. Javascript Variables can be created directly using the syntax:

    ```javascript
    const { query, pathname } = url.parse(req.url, true);
    ```

    This will create **TWO** constants `query` and `pathname` _iff there are properties of the object `url.parse` with the names `query` & `pathname`._

4. `__dirname`: It is a global variable in Node.js that provides the absolute path of the directory where the currently executing script resides. <br>
   `./`: Refers to the current working directory of the Node.js process, which is where the script is executed from.
5. Functions can be exported and imported as separate files/modules such as:

    ```javascript
    //Separate File `replaceTemplates.js`
    module.exports = (temp, product) => {

    //In `index.js`
    const replaceTemplate = require("./modules/replaceTemplates");
    ```

6. Using the flag `--save-dev` will install a certain npm package to be installed as a Development Dependency.
7. npm Packages that support terminal commands should be installed GLOBALLY on the machine using the flag `--global`.

## Node Modules

### `fs` Module for File System

```javascript
const fs = require("fs");
```

Important Methods of this Module:

1. `readFileSync()` _Used for reading files from system SYNCHRONOUSLY._
    - Arguments:
        1. File Path
        2. Buffering Options
    - Example Use:
        ```javascript
        const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
        ```
2. `writeFileSync()` _Used for writing files onto system SYNCHRONOUSLY._
    - Arguments:
        1. File Path
        2. Value to Store in file
    - Example Use:
        ```javascript
        fs.writeFileSync("./txt/output.txt", textOut);
        ```
3. `readFile()` _Use for reading files from system ASYNCHRONOUSLY._
    - Arguments:
        1. File Path
        2. Buffering Options
        3. Callback Function, called AFTER file is read.
            - `err` argument holds any error that occured.
            - `data` argument holds the data from the read file.
    - Example Use:
        ```javascript
        fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
            if (err) return console.log(err);
            console.log("File 01 Read Successfully:\n", data1);
        }
        ```
4. `writeFile()` _Use for writing files onto system ASYNCHRONOUSLY._
    - Arguments:
        1. File Path
        2. Value to Write
        3. Buffering Options
        4. Callback Function, called AFTER file is read.
            - `err` Argument that holds any error occured.
    - Example Use:
        ```javascript
        fs.writeFile(
            "./txt/final.txt",
            `${data2}\n${data3}`,
            "utf-8",
            (err) => {
                console.log("Your File has been written!");
            }
        );
        ```

### `http` Module for HTTP Requests

```javascript
const http = require("http");
```

Important Methods for this Module:

1. `createServer()` used for making a **SERVER OBJECT**.
    - Arguments:
        1. Callback Function
            - `req` Argument is for holding request parameters.
                1. `req.url` returns the url of the request.
            - `res` Argument is for holding response parameters.
                1. `res.writeHead(STATUS_CODE, HEADER)` use for writing the response's header.
                    - `STATUS_CODE` Integer to tell the client the status code.
                    - `HEADER` Object that contains the response headers.
                2. `res.end` use for writing the actual response.
    - Example Use `WITH LITTLE ROUTING`:
        ```javascript
        const server = http.createServer((req, res) => {
            const pathName = req.url;
            if (pathName === "/" || pathName === "/overview") {
                res.end("This is the Overview!");
            } else if (pathName === "/product") {
                res.end("This is the Product!");
            } else {
                res.writeHead(404, {
                    "content-type": "text/html",
                });
                res.end("<h1 style='color:red'>Page was NOT Found!</h1>");
            }
        });
        ```
2. `SERVER_OBJECT` used for accessing various methods for server.
    - `listen(PORT_NUMBER, LOCALHOST_URL, ARROW_FUNCTION)`
        1. `PORT_NUMBER` gives the subdomain to run the server on.
        2. `LOCALHOST_URL` gives the domain for the server. _Usually is `127.0.0.1`_
        3. `ARROW_FUNCTION` keeps node Running the application.
    - Example use:
        ```javascript
        server.listen("8000", "127.0.0.1", () => {
            console.log("Listening to requests on Port: 8000");
        });
        ```

### `url` Module for URL Queries

```javascript
const url = require("url");
```

Important Methods for this Module:

1. `parse(url, true)` used for making a **SERVER OBJECT**.
    - Arguments:
        1. `url` is the actual url to parse.
        2. `true` When set, the query property will be an object.
    - Example Use:
        ```javascript
        const { query, pathname } = url.parse(req.url, true);
        ```

### `slugify` Module for Generating SLUGS

```bash
npm install slugify
```

```javascript
const slugify = require("slugify");
```

Important Methods for this Module:

1. `slugify()` is used to generate slugs.
    - Arguments:
        1. `string` to be converted to slug.
        2. `options: Object` for different slug options.
    - Example Use:
        ```javascript
        const slugs = productDataObj.map((product) =>
            slugify(product.productName, { lower: true })
        );
        ```

## Techniques in Node.JS

Different techniques to perform different tasks in Node.JS.

### Restarting Server Automatically

1. Install the package `nodemon` globally via the terminal command.
    ```bash
    npm i --global nodemon
    ```
    Follow along, if installing the dependency is preferred to be installed locally for the project.
2. Install the package `nodemon` locally via the terminal command.
    ```bash
    npm i --save-dev nodemon
    ```
3. In the `packages.json` file, make changes to the `scripts` object:

    ```json
    //..
    "scripts": {
        "start": "nodemon index.js",
    },
    //..
    ```

4. Use `nodemon` in the terminal when in the project directory:
    ```bash
    npm start
    ```
    _`npm start` is a special npm command that doesn't need the `run` command to run._

### Rendering Content Dynamically

1.  Create a Standard BLANK `html` template/file/Code to render content in.
2.  Make sure to use PLACEHOLDERS instead of actual content. For example
    ```xml
    <div class="product__hero">
        <span class="product__emoji product__emoji--1">{%PRODUCT_IMAGE%}</span>
        <h2 class="product__name">{%PRODUCT_NAME%}</h2>
    </div>
    ```
3.  Import the template into the server file.
    ```javascript
    const templateOverview = fs.readFileSync(
        `${__dirname}/templates/template-overview.html`,
        "utf-8"
    );
    ```
4.  Write Code/function for replacing content. Sample code is as follows:

    ```javascript
    module.exports = (temp, product) => {
        let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
        output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
        output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
        output = output.replace(/{%PRODUCT_ID%}/g, product.id);
        output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
        output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
        output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
        output = output.replace(
            /{%PRODUCT_DESCRIPTION%}/g,
            product.description
        );

        if (!product.organic) {
            output = output.replace(/{%PRODUCT_ORGANIC%}/g, "not-organic");
        }
        return output;
    };
    ```

    Example Use:

    ```javascript
    // OVERVIEW PAGE
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "content-type": "text/html",
        });
        const cardsHtml = productDataObj
            .map((currentProduct) => {
                return replaceTemplate(templateCard, currentProduct);
            })
            .join("");
        const output = templateOverview.replace(
            /{%PRODUCT_CARDS%}/g,
            cardsHtml
        );
        res.end(output);
    }
    ```

### Getting URL Parameters

1. Import the `url` module by the command:
    ```javascript
    const url = require("url");
    ```
2. Get the request pathname and queries via:
    ```javascript
    const { query, pathname } = url.parse(req.url, true);
    ```
    This will create two variables in one line.<br>
    `query` &rarr; `url.parse(req.url, true).query`<br>
    `pathname` &rarr; `url.parse(req.url, true).pathname`
3. Access parameters with `query` variable.
    ```javascript
    const product = productDataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
    ```

### Understanding Node Single-Event Loop

The Node.js event loop is a mechanism that allows Node.js to handle multiple operations concurrently, even though it runs on a single thread. It processes asynchronous callbacks and ensures non-blocking I/O, making Node.js highly efficient for scalable network applications. Understanding how the event loop works is crucial for writing performant and bug-free Node.js code.

Events occur in the single-threaded event loop in the following order of precedence:

1. Initialize program.
2. Execute top-level code.
3. Require modules.
4. Register event callbacks.
5. Enter (start) the event loop, which begins processing events and callbacks.

Cycle of event loop execution works as follows:

1. Expired Timer Callbacks.
2. I/O Callbacks.
3. setImmediate Callbacks.
4. Close Callbacks.
5. Any pending timers or I/O operations?
    - If yes, go back to step 1.
6. If no, exit the event loop.

`NEW CONCEPT:`

-   NEWTICKS.
-   MICROTASKS Queue.
-   Thread Pool.

### Event-Driven Architechture

1. `.on()` is a listener, similar to `.onClick()`, `onHover()`, etc.
2. `.emit()` is an event occuring, similar to a user actually cliking the button, performing the event.
3. Server can also be started via the snippet as:
    ```javascript
    const server = http.createServer();
    server.on("request", (req, res) => {
        console.log("Request Recieved.");
        res.end("Request Recieved.");
    });
    server.listen(8000, "127.0.0.1", () => {
        console.log("Server is Listening...");
    });
    ```

### Using Streams in Node.JS

1. Streams are objects that allow reading data from a source or writing data to a destination in a continuous manner.
2. Streams can be readable, writable, or both.
3. Types of Streams:
    - **Readable Streams**: Used for reading data.
    - **Writable Streams**: Used for writing data.
    - **Duplex Streams**: Can read and write data.
    - **Transform Streams**: Can modify or transform the data as it is read or written.
4. Piping Streams:

    - Piping is a way to connect the output of one stream to the input of another.
    - Example Use:

    ```javascript
    const readable = fs.createReadStream("./test-file.txt");
    readable.pipe(res);
    ```

### How Requiring Modules Really works in Node.JS?

When you require a module in Node.js, it goes through the following steps:

1. Resolving and Loading.
2. Wrapping in a Function.
3. Execution.
4. Returning Exports.
5. Caching the Module.

_Wrapper function can be checked by using the command `console.log(arguments)`._

-   We can export and import modules in Node.JS via different methods. Refer to the file `modules.js` for further on this.

### Using Promises to Avoid Callback Hell

1. Promises are objects in JS ES6 Syntax. They represent a value that will be returned later some time.
    - Example Use for Creating Promise:
    ```javascript
    const readFilePromise = (file) => {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    };
    ```
    - Example Use for Consuming Promise:
    ```
    GIVEN IN CODE SECTION BELOW
    ```
2. This _Value_ can be of two types: `resolve`, `reject`.
    - `resolve` represent the Promise successful message/value. It is accessed by the method `then()` onto the promise.
    - `reject` represent the Promise unsuccessful value which is accessed by the method `catch()` onto the promise object.
3. Both methods `then()` and `catch()` take a callback function as their argument.
4. Promises don't stop the HELL TRIANGLE from appearing unless they are used via their `chaining` mechanism.
    - Promises can be chained to one and other if the callback function for `then()` method of first promise `returns` another promise.
    - That way the `then()` method for the first promise can be used to chain other `then()` methods for more and more promise objects.
    - All return the one last `catch()` method.
    - Example Use:
    ```javascript
    // Promise 01: Reading File
    readFilePromise(`${__dirname}/dog.txt`)
        // Then 01
        .then((data) => {
            console.log(`${data}`);
            // Promise 02: Fetching Image
            return superagent.get(
                `https://dog.ceo/api/breed/${data}/images/random`
            );
        })
        // Then 02
        .then((res) => {
            // Promise 03: Storing Image URL
            return writeFilePromise("dog-image.txt", res.body.message);
        })
        // Then 03
        .then((result) => {
            console.log(`Random ${result} Image Saved!`);
        })
        .catch((err) => {
            console.log(err);
        });
    ```

### Understanding Aync/Await to further Improve Codebase

1.  Async functions can include one or more promises with `await` keyword.

    -   Example Creation:

    ```javascript
    const getDogPic = async () => {
        try {
        } catch (err) {}
    };
    ```

2.  Error handling inside the `async` function is done via the `try` and `catch` blocks.
3.  `await` works the same way as async codes/promises.

    -   Example Use:

    ```javascript
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(data);

    const res = await superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    ```

4.  `IMPORTANT`: An Async function will always return a successful Promise. It may be accessed using a `return` statement at the end of the `async` function. In order to handle the error from promises inside the `async` function, you may `throw` the error from the `catch` block, like shown in example below:

        - Example Use:

        ```javascript
        const getDogPic = async () => {
            try {
                //...
            } catch (err) {
                console.log(err);
                throw err;
            }
            return "2. Ready!"; // Like this
        };
        //...
        getDogPic()
            .then((result) => {
                console.log(result);
                console.log("2. Done Getting Dog Pics!");
            })
            .catch((err) => {
                console.log(err);
            });
        ```

    _But as obvious in the above given code snippets, this pattern of using async functions and the await keyword introduces promises in some parts. To avoid this follow through the next section._

### Making Codebase consistent with Async/Await and IIFE pattern

1. IIEF stands for `Immediately Invoked Function Expressions`.

    - Example Use:

    ```javascript
    (() => {
        //Some Code for function
    })(); //Instant Call for the function;
    ```

2. Make a new Async function using the IIFE pattern.
3. Use the `try` and `catch` block in this function.
4. Store return of original async function in a new variable, USING THE `AWAIT` KEYWORD.
    - Example Use:
    ```javascript
    (async () => {
        try {
            console.log("1. Getting Dog Pics");
            const x = await getDogPic();
            console.log(x);
            console.log("3. Done Getting Dog Pics!");
        } catch (err) {
            console.log(err);
        }
    })();
    ```

### Fullfilling Multiple Promises using `Promise.all()`

In a certain situation, where we want to handle multiple promises at the same time. We don't want the promises to wait for one and other. We can perform one call for all promises using the `Promise.all()` method.

1. Save each promsie call into variable as shown below:

    ```javascript
    const res1Pro = await superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    ```

2. Create another variable `all` that is resolving all promises at the same time.

    - This method takes an array of promises to resolve at once.
    - Example Use:

    ```javascript
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    ```

3. Now the variable `all` contains an array of all the resolved promises in the same order as they were passed in the array.

    - Example Use:

    ```javascript
    console.log(all[0].body.message); // First Promise Result
    console.log(all[1].body.message); // Second Promise Result
    console.log(all[2].body.message); // Third Promise Result
    ```

4. To get all the messages we would use the `maps()` method as shown below:

    ```javascript
    const images = all.map((res) => res.body.message);
    console.log(images);

    await writeFilePromise("dog-image.txt", images.join("\n"));
    ```

## Express.JS

Express is a minimal Node.JS framework which means it is built on top of Node.JS. It allows us to develop applications much faster as it comes out-of-box with great features like:

-   handling complex routing
-   easier handling of requests
-   adding middleware
-   server-side rendering, etc.

It also allows organizing the application into MVC architecture.
