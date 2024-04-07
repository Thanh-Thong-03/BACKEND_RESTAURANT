const app = require('./app')

require('dotenv').config()

const PORT = process.env.PORT;

const listener = app.listen(PORT, () => {
    console.log('Order Server is running on the port:' + listener.address().port);
})