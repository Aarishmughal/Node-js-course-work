const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplates');
/////////////////////////////////////////////
// SERVER
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productDataObj = JSON.parse(productData);

// console.log(productDataObj);
const slugs = productDataObj.map((product) => slugify(product.productName, { lower: true }));
console.log(slugs);
// console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    // OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'content-type': 'text/html',
        });
        const cardsHtml = productDataObj
            .map((currentProduct) => {
                return replaceTemplate(templateCard, currentProduct);
            })
            .join('');
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    }
    // PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, {
            'content-type': 'text/html',
        });

        const product = productDataObj[query.id];
        const output = replaceTemplate(templateProduct, product);
        res.end(output);
    }
    // API
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(productData);
    }
    // 404 PAGE
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end("<h1 style='color:red'>Page was NOT Found!</h1>");
    }
});
server.listen('8000', '127.0.0.1', () => {
    console.log('Listening to requests on Port: 8000');
});

/////////////////////////////////////////////
// FILES
// Blocking, Synchronus Code
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the Avocado: ${textIn}.\nCreated On ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Outputted Successfully!");

// Non-Blocking, Asynchronus Code
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if (err) return console.log(err);
//     console.log("File 01 Read Successfully:\n", data1);
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log("File 02 Read Successfully:\n", data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log("File 03 Read Successfully:\n", data2);
//             console.log(data3);

// fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//     console.log("Your File has been written!");
// })
//         });
//         console.log(`Reading File: \'append.txt\'...`);
//     });
//     console.log(`Reading File: \'${data1}.txt\'...`);
// });
// console.log("Reading File: \'start.txt\'...");
