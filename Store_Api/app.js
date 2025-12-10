let express = require('express');
let app = express();
let port = 8000;
let fs = require('fs');

let readJsonFile = fs.readFileSync('../JSON/product.json', 'utf-8'); // returns a string 
let product = JSON.parse(readJsonFile); // converting dtring into JSON format

app.get('/api/products', (req, res) => {
    res.json(product);
});
app.listen(port, () => {
    console.log('...............Server Created........');
})