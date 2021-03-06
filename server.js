const express = require('express');
const api = require('./server/routes/api.js');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI || 'mongodb://localhost/ReactBankDB';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/', api);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000})
.then(function() {
    app.listen(PORT, function() {
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(function(err) {
    console.log(err.message);
});