const { Sequelize } = require("sequelize");

const sq = new Sequelize('Dish_DB', 'postgres', 'Thong2003.',{
    host: "localhost",
    // Port: 5432,
    dialect: 'postgres',
    operatorAliases: false,
    logging: false,
})

//Test db 
sq.authenticate()
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('Error: ' + err))

module.exports = sq;

