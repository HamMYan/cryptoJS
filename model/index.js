const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    database: 'crypto_homework',
    username: 'user',
    password: 'Pass@1234',
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./User')(sequelize, Sequelize);

sequelize.sync();

module.exports = {
    sequelize,
    User
};
