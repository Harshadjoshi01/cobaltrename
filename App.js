const express = require('express');
const morgan = require('morgan');
const CreateError = require('http-errors');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors());



app.use('/api', require('./routes/auth.router'));
app.use('/api', require('./routes/template-envelope.router'));
// app.use('/api', require('./Routes/userprofile.router'));
// app.use('/api', require('./Routes/posts.router'));
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From Cobalt Tech'
    });
});

app.use((req, res, next) => {
    next(CreateError.NotFound( 'This route does not exist' ));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});