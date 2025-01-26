let mongoose=require('mongoose');
let express=require('express');
let app=express()
let Product=require('./models/product.js');
mongoose.Promise=global.Promise;


const mongoURL = 'mongodb://127.0.0.1:27017/myDatabase'; 
// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
       console.log('Connected to MongoDB successfully!');
    })
   .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
   });

// use the routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/v1/products/product',async function(req,res,next){
    try {
            const products = await Product.find();
            res.json(products);
    } catch (error) {
            return next(error);
    }
})
app.get('/api/v1/products/product/:id', async function (req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        return next(error);
    }
})
app.post('/api/v1/products/product', async function (req, res, next) { 
    
    try {
        const newProduct = new Product(req.body);
        newProduct.save().then((prod) => res.json(prod));
    } catch (error) {
        res.send('error')
        console.log("error occured")
        return next(error);
    }
})
app.put('/api/v1/products/product/:id',async function (req, res, next) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        return next(error);
    }
})

app.delete('/api/v1/products/product/:id', async function (req, res, next) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        return next(error);
    }
})
app.use('/api/v1/products',()=>{});
const PORT = 5000;
app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });