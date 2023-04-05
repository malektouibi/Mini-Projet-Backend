const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: process.env.DB_TYPE,
    protocol: process.env.DB_TYPE,
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false,
        },
    },
    logging: false,
});

(async () => {
    await sequelize.sync();
})();

module.exports = sequelize;
