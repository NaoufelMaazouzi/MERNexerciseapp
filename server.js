const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})



const exercicesRouter = require('./routes/exercices');
const usersRouter = require('./routes/users');

app.use('/api/exercises', exercicesRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(port, () => {
    console.log(`Server is runnig on port: ${port}`);
})