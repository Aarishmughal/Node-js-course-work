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
    ```html
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
1. 