let express = require('express');
let app = express();
let port = 8000;
let fs = require('fs');

let readJsonFile = fs.readFileSync('../JSON/product.json', 'utf-8'); // returns a string 
let products = JSON.parse(readJsonFile);
// console.log(products)

app.get('/api/products', (req, res) => {
    res.json(products);
});
app.use(express.json());
app.post('/api/products', (req, res) => {
    let newProduct = req.body;
    products.products.push(newProduct);
    // console.log(newProduct);
    fs.writeFileSync('../JSON/product.json', JSON.stringify(products, null, 2), 'utf-8');
    res.status(201).json({
        status: "success",
        products: products
    });
});







app.listen(port, () => {
    console.log('...............Server Created........');
})