const { Sequelize } = require("sequelize");

const sq = new Sequelize('Order_DB', 'postgres', 'Thong2003.',{
    host: 'localhost',
    Port: 5556,
    dialect: 'postgres',
    operatorAliases: false,
    logging: false,
})

//Test db 
sq.authenticate()
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('Error: ' + err))

module.exports = sq;

