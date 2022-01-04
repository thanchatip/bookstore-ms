const express = require('express');
const app = express();

const User = require('./test_data/user.json');
const Book = require('./test_data/books.json');



const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;


app.get('/', (req, res) => res.status(200).send('OK'));
app.get('/users', (req, res) => {
    res.status(200).send({
        'data': User
    });
})

app.get('/books', (req, res) => {
    res.status(200).send({
        'books': Book
    });
})

app.post('/login', (req,res) =>{ 
    console.log(req.body);
    res.status(200).send('OK');
})

app.post('/users', (req,res) =>{ 
    console.log(req.body);
    res.status(200).send('OK');
})

app.patch('/users/order', (req,res) =>{ 
    console.log('order:' + req.body.orders);
    let orders = req.body.orders
    User.books = orders;
    console.log('User: ');
    console.log(User);
    let selectedBookPrice = []
    orders.forEach(order => {
        console.log('selected id: ' + order);
        Book.filter(x => {
            if(x.id === order){
            console.log('price: ' + x.price);
            selectedBookPrice.push(x.price);
        }
        });
    }
    );
    console.log('price array: ');
    console.log(selectedBookPrice);
    console.log('\n');
    let priceCalculation = (previousValue, currentValue) => previousValue + currentValue;
    let price = selectedBookPrice.reduce(priceCalculation);
    console.log('total price: ' + price.toFixed(2));
    res.status(200).send('OK');
})

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})

module.exports = app;