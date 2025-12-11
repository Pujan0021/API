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

app.delete('/api/products/:id', (req, res) => {
    let deleteId = parseInt(req.params.id);
    const productId = products.products.findIndex(item => item.id === deleteId);
    console.log(productId)
    if (productId === -1) {
        return res.status(400).json({
            status: "failed",
            message: "An Error Occured!, No product to show.."
        })
    }
    const deletedProduct = products.products.splice(productId, 1);// delete the product match with the param(:id);
    console.log(deletedProduct)
    fs.writeFile('../JSON/product.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            return res.status(400).json({
                status: "failed",
                message: "An Error Occured!, No product to show.."
            })
        }
        res.status(204).json({
            status: "success",
            products: products
        });
    })
})
// get element by id
app.get('/api/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let getElementById = products.products.find(item => item.id == id);
    if (!getElementById) {
        return res.status(400).json({
            status: "failed",
            message: "An Error Occured!, No product to show.."
        })
    }
    res.status(200).json({
        status: "success",
        products: getElementById
    });
});


app.listen(port, () => {
    console.log('...............Server Created........');
})