let express = require('express');
let app = express();
let port = 8000;
let fs = require('fs');

let readJsonFile = fs.readFileSync('../JSON/product.json', 'utf-8'); // returns a string 
let products = JSON.parse(readJsonFile);
// console.log(products)


// get method
app.get('/api/products', (req, res) => {
    res.json(products);
});


// post method 
app.use(express.json());
app.post('/api/products', (req, res) => {
    let newId = products.products[products.products.length - 1].id + 1;
    console.log("newID: ", newId);


    let newProduct = Object.assign({ id: newId }, req.body);
    products.products.push(newProduct);
    // console.log(newProduct);
    fs.writeFile('../JSON/product.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            return res.status(400).json({
                status: "failed",
                message: "An Error Occured!, No product to show.."
            })
        }
        if (!newProduct.name) {
            return res.status(400).json({
                status: "failed",
                message: "An Error Occured!, No product to show.."
            })
        }
        res.status(201).json({
            status: "success",
            products: products
        });
    });
});


// delete method



app.listen(port, () => {
    console.log('...............Server Created........');
})