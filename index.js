const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./src/config/sequelize');
const serviceUserRoutes = require('./src/routes/serviceUsers.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World updated!');
});

app.use('/api/users', serviceUserRoutes);

sequelize
    .authenticate()
    .then(() => {
        console.log(
            'Connection to the database has been established successfully.'
        );
        // Start the server after the database connection is established
        app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}.`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
