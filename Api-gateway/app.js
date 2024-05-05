const express = require('express')
const PORT = 8000
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

const routes ={
    // defines routes and their ports
    '/dish':'http://localhost:3001',
    '/cat':'http://localhost:3001',
    '/order':'http://localhost:3001',
    '/bill': 'http://localhost:3002',
    '/table': 'http://localhost:3002',
    '/area': 'http://localhost:3002',
    '/user': 'http://localhost:3003',
}

// create a proxy for each route

for(const route in routes){
    const target = routes[route]
    app.use(route, createProxyMiddleware({target}))
}

app.listen(PORT, () => {
    console.log(`API Gateway started on: ${PORT}`)
})
