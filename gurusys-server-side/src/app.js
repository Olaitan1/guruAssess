const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/user')
const postRoute = require ('./routes/post')
const CategoryRoute = require ('./routes/category')
const Swagger  = require ('./utils/swagger')
const dotenv = require('dotenv')


dotenv.config()
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());

Swagger(app);


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log('Database connection successful'))
    .catch((err) =>
    {
        console.log(err)
    })
app.use('/blog', authRoute)
app.use('/blog', postRoute)
app.use('/blog', CategoryRoute)
app.get('/', (req, res) =>
{
    res.send("Welcome to GuruSys Blog")
})
app.listen(port, () =>
{
    console.log(`Server Running on Port ${port}`)
})


